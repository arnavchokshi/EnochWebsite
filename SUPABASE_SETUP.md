# Supabase Setup Guide

This guide will help you complete the Supabase integration setup.

## What Was Changed

✅ **Supabase Client** - Added `@supabase/supabase-js` and created Supabase client configuration
✅ **Authentication** - Migrated from Express JWT to Supabase Auth
✅ **Content API** - Replaced Express API calls with direct Supabase queries
✅ **Server Removed** - Deleted entire `server/` directory
✅ **Database Schema** - Created migration and seed scripts

## Setup Steps

### 1. Install Dependencies

```bash
cd client
npm install
```

This will install `@supabase/supabase-js`.

### 2. Set Up Environment Variables

Create a `.env.local` file in the `client/` directory:

```bash
cd client
touch .env.local
```

Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://xnleiajjfamuwkywyjez.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_7KDvTZs7OQomd4QAB0MkiQ_UXuNGEwK
```

**Note:** The `.env.local` file is gitignored and won't be committed to version control.

### 3. Run Database Migration

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **SQL Editor**
4. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
5. Click **Run** to create all tables and RLS policies

### 4. Seed Initial Data

1. In the Supabase **SQL Editor**, copy and paste the contents of `supabase/seed.sql`
2. Click **Run** to populate tables with initial data from your JSON files

### 5. Set Up Authentication

You need to create an admin user in Supabase:

1. Go to **Authentication** → **Users** in Supabase dashboard
2. Click **Add User** → **Create new user**
3. Enter:
   - Email: `admin@ephfirm.com` (or your preferred admin email)
   - Password: Choose a secure password
   - Email confirmation: You can disable this or confirm the email

Alternatively, you can enable email/password authentication and let the user sign up on first login.

**Note:** Make sure email/password authentication is enabled:
- Go to **Authentication** → **Providers**
- Ensure **Email** provider is enabled

### 6. Test the Application

```bash
cd client
npm run dev
```

Visit:
- `http://localhost:5173` - Public website
- `http://localhost:5173/admin/login` - Admin login

Log in with your Supabase admin credentials and test editing content.

## Features

### ✅ Working
- **Content Fetching** - All content loads from Supabase
- **Admin Authentication** - Login via Supabase Auth
- **Content Editing** - All text content can be edited via admin panel
- **Blog Post Management** - Add, edit, and delete blog posts

### ⚠️ Not Yet Implemented
- **Image Upload** - Image uploads need Supabase Storage integration
  - For now, use image URLs directly when editing content
- **Contact Form Submission** - Form submissions are logged but not stored/sent
  - Can be implemented with Supabase table or email service later

## Database Structure

### Single-Row Tables
- `hero` - Hero section content
- `blog` - Blog section metadata
- `quote` - Quote section
- `contact` - Contact information
- `site_settings` - Site configuration
- `practice_areas` - Practice areas metadata
- `how_it_works` - How it works metadata
- `team` - Team section metadata

### Collection Tables
- `blog_posts` - Blog posts/cases
- `practice_area_items` - Practice area items
- `how_it_works_steps` - Process steps
- `team_members` - Team members

## Row Level Security (RLS)

All tables have RLS enabled with:
- **Public Read** - Anyone can read content (for the public website)
- **Authenticated Write** - Only authenticated users can create/update/delete (admin)

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` exists in the `client/` directory
- Restart the dev server after creating/updating `.env.local`

### "Failed to fetch content"
- Check that migration script was run successfully
- Verify RLS policies are created correctly
- Check browser console for specific error messages

### "Login failed"
- Ensure email/password authentication is enabled in Supabase
- Verify user exists in Supabase Authentication → Users
- Check that password is correct

### "Failed to update [section]"
- Verify you're logged in (check for session in Supabase client)
- Check that RLS policies allow authenticated writes
- Verify table structure matches the migration script

## Deployment

After setup, this is a pure static site:

1. Build the client:
   ```bash
   cd client
   npm run build
   ```

2. Deploy the `client/dist/` directory to:
   - Vercel
   - Netlify
   - Any static hosting service

3. Set environment variables in your deployment platform:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

The site will work entirely client-side - no server needed!
