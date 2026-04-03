# Render Deployment Settings

## Frontend (Static Site) - Client

### Service Type: Static Site

**Build Settings:**
- **Build Command:** `cd client && npm install && npm run build`
- **Publish Directory:** `client/dist`

**Environment Variables (if needed):**
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key

**Branch:** `main` (or your default branch)

**Root Directory:** Leave blank (or set to `/`)

---

## Backend (Web Service) - Server (Optional)

If you want to use the Clio API integration, deploy the server separately:

### Service Type: Web Service

**Build Settings:**
- **Build Command:** `cd server && npm install`
- **Start Command:** `cd server && npm start`

**Environment Variables:**
- `PORT` - Automatically set by Render (default: 10000)
- `CLIO_CLIENT_ID` - Your Clio API client ID
- `CLIO_CLIENT_SECRET` - Your Clio API client secret
- `CLIO_REDIRECT_URI` - Your Clio redirect URI
- Any other environment variables your server needs

**Branch:** `main` (or your default branch)

**Instance Type:** Free tier is fine for development

**Auto-Deploy:** Yes

---

## Recommended Setup

### Option 1: Frontend Only (Supabase handles backend)
If you're using Supabase for all your backend needs:
- Deploy **only the Static Site** (client)
- Set environment variables for Supabase in Render's dashboard

### Option 2: Frontend + Backend (Clio API integration)
If you need the Clio API integration:
- Deploy **Static Site** for the frontend
- Deploy **Web Service** for the Express server
- Update your frontend API calls to point to the backend service URL

---

## Render Dashboard Configuration

### For Static Site (Frontend):

1. **New > Static Site**
2. **Connect your repository**
3. **Settings:**
   - **Name:** `enoch-website-frontend` (or your preference)
   - **Branch:** `main`
   - **Root Directory:** (leave blank)
   - **Build Command:** `cd client && npm install && npm run build`
   - **Publish Directory:** `client/dist`
   - **Environment Variables:**
     ```
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```
4. **Click "Create Static Site"**

### For Web Service (Backend - if needed):

1. **New > Web Service**
2. **Connect your repository**
3. **Settings:**
   - **Name:** `enoch-website-backend` (or your preference)
   - **Environment:** `Node`
   - **Branch:** `main`
   - **Root Directory:** (leave blank)
   - **Build Command:** `cd server && npm install`
   - **Start Command:** `cd server && npm start`
   - **Instance Type:** Free (or upgrade as needed)
   - **Environment Variables:**
     ```
     PORT=10000
     CLIO_CLIENT_ID=your-clio-client-id
     CLIO_CLIENT_SECRET=your-clio-client-secret
     CLIO_REDIRECT_URI=https://your-backend-url.onrender.com/api/clio/callback
     ```
4. **Click "Create Web Service"**

---

## Notes

- The build command installs dependencies and builds the project
- The publish directory is where Vite outputs the built files (default: `client/dist`)
- Environment variables prefixed with `VITE_` are exposed to your frontend code
- Backend environment variables are kept secure and not exposed to the client
- Update your frontend API calls to use the Render backend URL if you deploy the backend

### Client-Side Routing Configuration

Since this is a React Router SPA (Single Page Application), you need to configure Render to handle client-side routing. 

**Important**: The `_redirects` file in `client/public/` will be automatically copied to `client/dist/` during build. However, Render Static Sites might need additional configuration:

1. In your Render dashboard, go to your Static Site settings
2. Look for "Redirects and Rewrites" or "Headers" section
3. Add a catch-all redirect rule:
   - **From:** `/*`
   - **To:** `/index.html`
   - **Status:** `200` (not 301/302)

If Render doesn't have a redirects configuration option in the dashboard, the `_redirects` file should work, but you may need to contact Render support or check their documentation for SPA routing support.

**Alternative**: If direct access to routes like `/admin/login` still gives 404 errors, you may need to configure a custom 404 handler or use Render's rewrite rules to point all routes to `index.html`.
