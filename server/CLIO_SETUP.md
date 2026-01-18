# Clio API Integration Setup

This server integrates with Clio Grow's Lead Inbox API to automatically create leads when consultation requests are submitted through the website contact form.

## Environment Variables

To enable Clio integration, set the following environment variables in your Render dashboard (or wherever you deploy):

### Required Variables

1. **CLIO_INBOX_LEAD_TOKEN**
   - **Description**: Your Clio Grow inbox lead token
   - **How to get it**: 
     - Log into your Clio Grow account
     - Navigate to Settings > Integrations > Lead Inbox
     - Copy the "Lead Inbox Token" or generate a new one
   - **Example**: `abc123xyz456def789`

### Optional Variables

2. **CLIO_REGION** (defaults to `us`)
   - **Description**: The region where your Clio account is hosted
   - **Valid values**: `us`, `eu`, `au`, `ca`
   - **Default**: `us`
   - **Example**: `us`

3. **PORT** (defaults to `3001`)
   - **Description**: Port number for the server to listen on
   - **Default**: `3001`
   - **Example**: `3001`

## Setting Up in Render

1. Go to your Render dashboard
2. Select your service (or create a new Web Service)
3. Go to **Environment** tab
4. Add the following environment variables:
   - `CLIO_INBOX_LEAD_TOKEN`: (your token from Clio)
   - `CLIO_REGION`: `us` (or your region)
   - `PORT`: `3001` (or your preferred port)

## How It Works

When a user submits the consultation form on your website:

1. The form data (name, email, phone, subject, message) is sent to `/api/contact`
2. The server validates the required fields (name and message)
3. The server formats the data for Clio's API:
   - Splits the full name into first and last name
   - Combines subject and message into the lead message
   - Includes referring URL and source information
4. The server submits the lead to Clio Grow using the Lead Inbox API
5. Clio creates a new lead in your Grow inbox
6. The user receives a success confirmation

## Error Handling

- If the Clio API is unavailable or returns an error, the server will:
  - Log the error for debugging
  - Still return a success response to the user (so the form submission appears successful)
  - This ensures the form works even if Clio is temporarily down

## Testing

To test the integration:

1. Make sure environment variables are set
2. Start the server: `npm start`
3. Submit a test consultation form from your website
4. Check your Clio Grow inbox for the new lead

## API Endpoints

- `POST /api/contact` - Submit consultation form (creates Clio lead)
- `GET /health` - Health check endpoint

## Documentation

- Clio Grow Lead Inbox API: https://docs.developers.clio.com/guides/clio-grow/lead-inbox-api/
- Clio Developer Portal: https://docs.developers.clio.com/
