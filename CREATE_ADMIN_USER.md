# Create Admin User

To create the admin user `chokshi.arnav@gmail.com` with password `Trishla54321!`, you have two options:

## Option 1: Using Supabase Dashboard (Easiest)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **Authentication** → **Users**
4. Click **Add User** → **Create new user**
5. Enter:
   - Email: `chokshi.arnav@gmail.com`
   - Password: `Trishla54321!`
   - Auto Confirm User: ✅ (check this so you can login immediately)
6. Click **Create User**

That's it! You can now login at http://localhost:5173/admin/login

## Option 2: Using the Script (Requires Service Role Key)

1. Get your Supabase Service Role Key:
   - Go to Supabase Dashboard → Settings → API
   - Copy the `service_role` key (keep this secret!)

2. Run the script:
   ```bash
   # Method 1: Set environment variable
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here node create-admin-user.js

   # Method 2: Enter when prompted
   node create-admin-user.js
   ```

The script will:
- Create the user if it doesn't exist
- Update the password if the user already exists
- Auto-confirm the email so you can login immediately

---

**Note:** The Supabase URL should be automatically detected from `client/.env.local` if it exists.
