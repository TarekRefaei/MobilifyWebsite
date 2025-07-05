# Newsletter Setup Guide

This guide explains how to set up the Mailchimp newsletter integration for the Mobilify website.

## Prerequisites

1. A Mailchimp account (free tier supports up to 2,000 contacts)
2. A Mailchimp audience (mailing list) created
3. A Mailchimp API key

## Setup Steps

### 1. Create Mailchimp Account and Audience

1. Go to [Mailchimp](https://mailchimp.com) and create an account
2. Create a new audience:
   - Go to **Audience** → **All contacts** → **Create Audience**
   - Fill in your business details
   - Note down the **Audience ID** (you'll need this later)

### 2. Generate API Key

1. Go to **Account** → **Extras** → **API keys**
2. Click **Create A Key**
3. Copy the generated API key (format: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us1`)
4. The part after the dash (`us1`, `us2`, etc.) is your datacenter

### 3. Configure Environment Variables

Add these variables to your `.env.local` file:

```env
# Mailchimp Configuration
MAILCHIMP_API_KEY=your_api_key_here
MAILCHIMP_LIST_ID=your_audience_id_here
```

**Important**: 
- The API key should include the datacenter suffix (e.g., `-us1`)
- The List ID is your Audience ID from step 1
- Never commit these values to version control

### 4. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the homepage
3. Try subscribing with a test email address
4. Check your Mailchimp audience to confirm the subscription

## Features Implemented

### Newsletter Signup Component

The `NewsletterSignup` component supports two variants:

1. **Footer variant**: Compact form in the website footer
2. **Section variant**: Prominent section on the homepage with gradient background

### API Endpoint

- **Endpoint**: `/api/newsletter`
- **Method**: POST
- **Body**: `{ "email": "user@example.com" }`
- **Response**: Success/error messages with appropriate HTTP status codes

### Error Handling

The implementation handles various scenarios:

- Invalid email addresses
- Already subscribed emails
- Network errors
- Mailchimp API errors
- Missing configuration

### Analytics Integration

Newsletter signups are tracked with Google Analytics:

- Event: `newsletter_signup`
- Category: `engagement`
- Label: `footer` or `section` (depending on signup location)

## Customization

### Styling

The component uses Tailwind CSS with semantic color classes:
- `electric-blue`: Primary brand color
- `dark-charcoal`: Text color
- Responsive design with mobile-first approach

### Content

You can customize the newsletter content by editing:
- Headlines and descriptions in `NewsletterSignup.tsx`
- Success/error messages in the API route
- Footer links and company description

### Mailchimp Settings

In your Mailchimp account, you can:
- Customize confirmation emails
- Set up automation sequences
- Create segments based on signup source
- Design custom signup forms (optional)

## Troubleshooting

### Common Issues

1. **"Newsletter service is not configured"**
   - Check that `MAILCHIMP_API_KEY` and `MAILCHIMP_LIST_ID` are set
   - Restart your development server after adding environment variables

2. **"Invalid Resource" error**
   - Verify the List ID is correct
   - Check that the API key includes the datacenter suffix

3. **Network errors**
   - Verify your internet connection
   - Check Mailchimp service status

### Debug Mode

To enable detailed error logging, check the browser console and server logs when testing subscriptions.

## Production Deployment

When deploying to Vercel:

1. Add environment variables in your Vercel dashboard:
   - Go to **Settings** → **Environment Variables**
   - Add `MAILCHIMP_API_KEY` and `MAILCHIMP_LIST_ID`
   - Deploy your changes

2. Test the production deployment with a real email address

## Security Notes

- API keys are server-side only and not exposed to the client
- Email addresses are validated before processing
- Rate limiting should be considered for production use
- Consider adding CAPTCHA for additional spam protection

## Next Steps

Consider these enhancements for the future:
- Double opt-in confirmation emails
- Welcome email automation
- Subscriber segmentation
- A/B testing different signup forms
- Integration with other marketing tools
