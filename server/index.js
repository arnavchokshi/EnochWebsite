const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'ephfirm-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (err) {
      cb(err, uploadDir);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed'));
  }
});

// Helper function to read JSON file
async function readJsonFile(filename) {
  const filePath = path.join(__dirname, 'data', filename);
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

// Helper function to write JSON file
async function writeJsonFile(filename, data) {
  const filePath = path.join(__dirname, 'data', filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// ==================== AUTH ROUTES ====================

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const usersData = await readJsonFile('users.json');
    const user = usersData.users.find(u => u.email === email);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // For first login, set the password
    if (user.password.includes('placeholder')) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await writeJsonFile('users.json', usersData);
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ 
      token, 
      user: { id: user.id, email: user.email, name: user.name, role: user.role } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Verify token
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// ==================== PUBLIC ROUTES ====================

// Get all content (for public website)
app.get('/api/content', async (req, res) => {
  try {
    const [hero, practiceAreas, howItWorks, team, contact, blog, quote, siteSettings] = await Promise.all([
      readJsonFile('hero.json'),
      readJsonFile('practiceAreas.json'),
      readJsonFile('howItWorks.json'),
      readJsonFile('team.json'),
      readJsonFile('contact.json'),
      readJsonFile('blog.json'),
      readJsonFile('quote.json'),
      readJsonFile('siteSettings.json')
    ]);
    
    res.json({ hero, practiceAreas, howItWorks, team, contact, blog, quote, siteSettings });
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get individual content sections
app.get('/api/content/:section', async (req, res) => {
  try {
    const { section } = req.params;
    const validSections = ['hero', 'practiceAreas', 'howItWorks', 'team', 'contact', 'blog', 'quote', 'siteSettings'];
    
    if (!validSections.includes(section)) {
      return res.status(404).json({ error: 'Section not found' });
    }
    
    const data = await readJsonFile(`${section}.json`);
    res.json(data);
  } catch (error) {
    console.error('Error fetching section:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ==================== ADMIN ROUTES ====================

// Update content section
app.put('/api/admin/content/:section', authenticateToken, async (req, res) => {
  try {
    const { section } = req.params;
    const validSections = ['hero', 'practiceAreas', 'howItWorks', 'team', 'contact', 'blog', 'quote', 'siteSettings'];
    
    if (!validSections.includes(section)) {
      return res.status(404).json({ error: 'Section not found' });
    }
    
    await writeJsonFile(`${section}.json`, req.body);
    res.json({ success: true, message: 'Content updated successfully' });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Upload image
app.post('/api/admin/upload', authenticateToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ success: true, url: imageUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete image
app.delete('/api/admin/upload/:filename', authenticateToken, async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'uploads', filename);
    
    await fs.unlink(filePath);
    res.json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    if (error.code === 'ENOENT') {
      return res.status(404).json({ error: 'File not found' });
    }
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    // In production, you would send this to an email service
    // For now, we'll just log it and return success
    console.log('New contact form submission:', { name, email, phone, subject, message });
    
    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
