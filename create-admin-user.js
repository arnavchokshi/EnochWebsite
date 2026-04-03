// Script to create admin user in Supabase
// Usage: node create-admin-user.js
// Make sure @supabase/supabase-js is installed: npm install @supabase/supabase-js

const { createClient } = require('@supabase/supabase-js');
const readline = require('readline');
const { join } = require('path');
const { readFileSync, existsSync } = require('fs');

// Load environment variables from .env.local if it exists
let supabaseUrl;

// Try to read from .env.local in client directory
const envPath = join(__dirname, 'client', '.env.local');
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf-8');
  const urlMatch = envContent.match(/VITE_SUPABASE_URL=(.+)/);
  if (urlMatch) supabaseUrl = urlMatch[1].trim();
}

// For creating users, we need the service role key (not anon key)
// You'll need to provide this when prompted
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function createAdminUser() {
  console.log('\n=== Create Supabase Admin User ===\n');
  
  // Check for environment variables first
  supabaseUrl = supabaseUrl || process.env.SUPABASE_URL;
  let supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  // Get Supabase URL
  if (!supabaseUrl) {
    supabaseUrl = await question('Enter your Supabase URL: ');
  } else {
    console.log(`Using Supabase URL: ${supabaseUrl}`);
  }
  
  // Get Service Role Key (required for admin operations)
  if (!supabaseServiceKey) {
    console.log('\n⚠️  You need the Supabase Service Role Key to create users.');
    console.log('   Find it in: Supabase Dashboard → Settings → API → service_role key');
    console.log('   Or set SUPABASE_SERVICE_ROLE_KEY environment variable\n');
    supabaseServiceKey = await question('Enter your Supabase Service Role Key: ');
  } else {
    console.log('✅ Using Service Role Key from environment variable');
  }
  
  if (!supabaseServiceKey) {
    console.error('❌ Service Role Key is required!');
    rl.close();
    process.exit(1);
  }
  
  // Create admin client with service role key
  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
  
  const email = 'chokshi.arnav@gmail.com';
  const password = 'Trishla54321!';
  
  console.log(`\n📧 Creating user: ${email}`);
  
  try {
    // Create the user
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true, // Auto-confirm email so user can login immediately
    });
    
    if (error) {
      // Check if user already exists
      if (error.message.includes('already registered') || error.message.includes('already exists')) {
        console.log('✅ User already exists! Updating password...');
        
        // Get user by email to update password
        const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers();
        if (listError) throw listError;
        
        const user = users.users.find(u => u.email === email);
        if (!user) {
          throw new Error('User exists but could not be found');
        }
        
        // Update user password
        const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
          user.id,
          { password: password }
        );
        
        if (updateError) throw updateError;
        console.log('✅ Password updated successfully!');
      } else {
        throw error;
      }
    } else {
      console.log('✅ User created successfully!');
    }
    
    console.log('\n✅ Admin user setup complete!');
    console.log(`\nYou can now login with:`);
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`\n🔗 Login at: http://localhost:5173/admin/login\n`);
    
  } catch (error) {
    console.error('\n❌ Error creating user:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

createAdminUser();
