// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Clio API integration
const { submitLeadToClio } = require('./lib/clio');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Contact form submission - integrates with Clio API
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        details: 'Name and message are required' 
      });
    }

    // Prepare lead data for Clio
    const leadData = {
      name,
      email: email || '',
      phone: phone || '',
      subject: subject || '',
      message: message || '',
      referringUrl: req.headers.referer || req.headers.origin || '',
      source: 'Website Consultation Form',
    };

    // Submit to Clio API
    try {
      const clioResult = await submitLeadToClio(leadData);
      
      // Log success
      console.log('Contact form submission successful - Clio lead created:', {
        name,
        email,
        clioSuccess: clioResult.success,
      });

      // Return success response
      res.json({ 
        success: true, 
        message: 'Message sent successfully. Your consultation request has been received.' 
      });
    } catch (clioError) {
      // Log Clio error but don't fail the request completely
      // This allows the form to work even if Clio API is down
      console.error('Error submitting to Clio API:', clioError.message);
      console.log('Contact form submission (Clio failed):', { name, email, phone, subject });

      // Still return success to user, but log the Clio error
      // In production, you might want to queue this for retry or send email notification
      res.json({ 
        success: true, 
        message: 'Message received. We will contact you shortly.',
        warning: 'Note: Integration with scheduling system temporarily unavailable'
      });
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: 'Failed to process your request. Please try again later.' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Clio integration: ${process.env.CLIO_INBOX_LEAD_TOKEN ? 'Configured' : 'Not configured - set CLIO_INBOX_LEAD_TOKEN env var'}`);
});
