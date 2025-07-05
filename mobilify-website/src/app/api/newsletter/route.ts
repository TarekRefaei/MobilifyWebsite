import { NextRequest, NextResponse } from 'next/server';

// Type definitions for Mailchimp API
interface MailchimpError {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}

interface MailchimpMember {
  email_address: string;
  status: 'subscribed' | 'unsubscribed' | 'cleaned' | 'pending';
  merge_fields?: {
    [key: string]: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check for required environment variables
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const listId = process.env.MAILCHIMP_LIST_ID;

    if (!apiKey || !listId) {
      console.error('Missing Mailchimp configuration');
      return NextResponse.json(
        { error: 'Newsletter service is not configured. Please try again later.' },
        { status: 500 }
      );
    }

    // Extract datacenter from API key (e.g., us1, us2, etc.)
    const datacenter = apiKey.split('-')[1];
    
    if (!datacenter) {
      console.error('Invalid Mailchimp API key format');
      return NextResponse.json(
        { error: 'Newsletter service configuration error. Please try again later.' },
        { status: 500 }
      );
    }

    // Prepare member data
    const memberData: MailchimpMember = {
      email_address: email.toLowerCase(),
      status: 'subscribed',
      merge_fields: {
        SOURCE: 'Mobilify Website'
      }
    };

    // Make request to Mailchimp API
    const url = `https://${datacenter}.api.mailchimp.com/3.0/lists/${listId}/members`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memberData),
    });

    const data = await response.json();

    if (response.ok) {
      // Success
      return NextResponse.json(
        { 
          message: 'Successfully subscribed to newsletter',
          email: email.toLowerCase()
        },
        { status: 200 }
      );
    } else {
      // Handle Mailchimp errors
      const error = data as MailchimpError;
      
      if (error.title === 'Member Exists') {
        return NextResponse.json(
          { error: 'This email is already subscribed to our newsletter.' },
          { status: 400 }
        );
      }
      
      if (error.title === 'Invalid Resource') {
        return NextResponse.json(
          { error: 'Please provide a valid email address.' },
          { status: 400 }
        );
      }

      // Log the error for debugging
      console.error('Mailchimp API error:', error);
      
      return NextResponse.json(
        { error: 'Unable to subscribe at this time. Please try again later.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
