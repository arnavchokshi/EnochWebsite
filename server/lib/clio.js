/**
 * Clio API Integration
 * 
 * This module handles integration with Clio Grow Lead Inbox API.
 * 
 * Environment variables required:
 * - CLIO_INBOX_LEAD_TOKEN: Your Clio Grow inbox lead token
 * - CLIO_REGION: Region for Clio (defaults to 'us')
 *   Options: 'us', 'eu', 'au', 'ca'
 * 
 * Documentation: https://docs.developers.clio.com/guides/clio-grow/lead-inbox-api/
 */

const axios = require('axios');

// Get Clio configuration from environment variables
const CLIO_INBOX_LEAD_TOKEN = process.env.CLIO_INBOX_LEAD_TOKEN;
const CLIO_REGION = (process.env.CLIO_REGION || 'us').toLowerCase();

// Clio Grow API endpoints by region
const CLIO_REGION_ENDPOINTS = {
  us: 'https://grow.clio.com/inbox_leads',
  eu: 'https://eu.grow.clio.com/inbox_leads',
  au: 'https://au.grow.clio.com/inbox_leads',
  ca: 'https://ca.grow.clio.com/inbox_leads',
};

/**
 * Helper function to split full name into first and last name
 * @param {string} fullName - Full name string
 * @returns {Object} Object with firstName and lastName
 */
function splitName(fullName) {
  if (!fullName || typeof fullName !== 'string') {
    return { firstName: '', lastName: '' };
  }

  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '' };
  }

  const lastName = parts.pop();
  const firstName = parts.join(' ');
  
  return { firstName, lastName };
}

/**
 * Submit a lead to Clio Grow Lead Inbox
 * 
 * @param {Object} leadData - Lead information
 * @param {string} leadData.name - Full name (will be split into first/last)
 * @param {string} leadData.email - Email address
 * @param {string} leadData.phone - Phone number
 * @param {string} leadData.subject - Subject/practice area
 * @param {string} leadData.message - Message/description
 * @param {string} [leadData.referringUrl] - Referring URL (optional)
 * @param {string} [leadData.source] - Source identifier (defaults to 'Website Consultation Form')
 * @returns {Promise<Object>} Response from Clio API
 * @throws {Error} If API call fails or required fields are missing
 */
async function submitLeadToClio(leadData) {
  // Validate required environment variables
  if (!CLIO_INBOX_LEAD_TOKEN) {
    throw new Error('CLIO_INBOX_LEAD_TOKEN environment variable is not set');
  }

  // Validate endpoint exists for region
  const endpoint = CLIO_REGION_ENDPOINTS[CLIO_REGION];
  if (!endpoint) {
    throw new Error(`Invalid CLIO_REGION: ${CLIO_REGION}. Must be one of: ${Object.keys(CLIO_REGION_ENDPOINTS).join(', ')}`);
  }

  // Validate required fields
  if (!leadData.name || !leadData.message) {
    throw new Error('Name and message are required fields');
  }

  // Split name into first and last
  const { firstName, lastName } = splitName(leadData.name);

  // Build the payload according to Clio API specification
  const payload = {
    inbox_lead_token: CLIO_INBOX_LEAD_TOKEN,
    inbox_lead: {
      from_first: firstName,
      from_last: lastName || firstName, // Use firstName as last name if not provided
      from_email: leadData.email || '',
      from_phone: leadData.phone || '',
      from_message: `${leadData.subject ? `Subject: ${leadData.subject}\n\n` : ''}${leadData.message}`,
      referring_url: leadData.referringUrl || leadData.sourceUrl || '',
      from_source: leadData.source || 'Website Consultation Form',
    },
  };

  try {
    // Make API request to Clio
    const response = await axios.post(endpoint, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 10000, // 10 second timeout
    });

    // Clio returns 201 Created on success
    if (response.status === 201) {
      return {
        success: true,
        data: response.data,
        clioResponse: response.data,
      };
    }

    // Unexpected status code
    return {
      success: false,
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Clio API returned an error response
      throw new Error(
        `Clio API error: ${error.response.status} - ${JSON.stringify(error.response.data || error.message)}`
      );
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('No response from Clio API. Please check your network connection.');
    } else {
      // Error setting up the request
      throw new Error(`Error submitting to Clio: ${error.message}`);
    }
  }
}

module.exports = {
  submitLeadToClio,
  splitName,
};
