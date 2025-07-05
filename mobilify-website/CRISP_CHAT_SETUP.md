# Crisp Live Chat Setup Guide

This guide explains how to set up Crisp live chat integration for the Mobilify website.

## Why Crisp?

- **Generous free tier**: Up to 2 operators and unlimited conversations
- **Modern interface**: Clean, professional design that matches our brand
- **Mobile-friendly**: Works perfectly on all devices
- **Rich features**: File sharing, screen sharing, automated messages
- **Analytics**: Built-in conversation analytics and reporting
- **Integrations**: Connects with popular tools and services

## Setup Steps

### 1. Create Crisp Account

1. Go to [Crisp.chat](https://crisp.chat) and create a free account
2. Choose your website name (e.g., "Mobilify")
3. Complete the onboarding process

### 2. Get Your Website ID

1. In your Crisp dashboard, go to **Settings** → **Website Settings**
2. Copy your **Website ID** (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
3. This is what you'll use in your environment variables

### 3. Configure Environment Variables

Add this to your `.env.local` file:

```env
# Crisp Chat Configuration
NEXT_PUBLIC_CRISP_WEBSITE_ID=your_website_id_here
```

**Important**: The `NEXT_PUBLIC_` prefix is required because this variable is used in client-side code.

### 4. Customize Chat Widget

In your Crisp dashboard, customize the chat widget:

#### Appearance Settings
- **Color**: Set to `#4f46e5` (electric-blue) to match Mobilify branding
- **Position**: Bottom right (default)
- **Welcome message**: "Hi! 👋 How can we help you with your mobile app project?"

#### Automated Messages
Set up these automated messages:

1. **Welcome Message** (triggers immediately):
   ```
   Welcome to Mobilify! 🚀
   
   We're here to help turn your ideas into amazing mobile apps. 
   What can we help you with today?
   ```

2. **Offline Message** (when no operators available):
   ```
   Thanks for reaching out! Our team is currently offline, but we'll get back to you within 24 hours.
   
   In the meantime, check out our FAQ: https://mobilify.com/faq
   ```

3. **Follow-up Message** (after 30 seconds of inactivity):
   ```
   Need help getting started? Here are some quick options:
   
   💬 Ask about our pricing
   🎯 Learn about our process  
   📱 See our demo
   📧 Schedule a consultation
   ```

#### Business Hours
Configure your business hours in **Settings** → **Availability**:
- Set your timezone
- Define working hours (e.g., 9 AM - 6 PM, Monday-Friday)
- Enable/disable weekend support

### 5. Team Setup

#### Add Team Members
1. Go to **Settings** → **Team**
2. Invite team members with appropriate roles:
   - **Owner**: Full access (you)
   - **Administrator**: Can manage settings and conversations
   - **Member**: Can handle conversations only

#### Create Departments (Optional)
For better organization, create departments:
- **Sales**: For pricing and general inquiries
- **Technical**: For development questions
- **Support**: For existing client support

### 6. Advanced Configuration

#### Custom Data Collection
The integration automatically sends:
- **Page context**: Which page the user was on when they started chatting
- **Trigger context**: How they initiated the chat (header, contact, floating button, etc.)
- **Timestamp**: When the conversation started

#### Conversation Routing
Set up routing rules in **Settings** → **Routing**:
- Route technical questions to developers
- Route pricing questions to sales team
- Set up round-robin assignment for general inquiries

#### Integrations
Connect Crisp with your other tools:
- **Email**: Forward conversations to your email
- **Slack**: Get notifications in your Slack workspace
- **Google Analytics**: Track chat interactions (already implemented in our code)
- **CRM**: Sync conversations with your customer database

## Features Implemented

### Chat Triggers
The implementation includes several strategic chat triggers:

1. **Header Chat**: Subtle "Live Chat" link in the navigation
2. **Contact Chat**: Prominent button in the contact section
3. **Floating Chat**: Always-visible floating action button
4. **Context-Aware**: Each trigger sends context about where the user initiated chat

### Analytics Integration
All chat interactions are tracked with Google Analytics:
- `chat_opened`: When a user opens the chat widget
- `chat_message_sent`: When a user sends a message
- `chat_message_received`: When they receive a response
- `chat_trigger_clicked`: When they click any chat trigger button

### Programmatic Control
The `crispUtils` object provides functions to:
- Open/close the chat widget
- Set user information
- Send messages programmatically
- Update session data
- Control widget visibility

## Best Practices

### Response Time
- **Immediate**: Acknowledge within 1-2 minutes during business hours
- **Quick**: Provide helpful responses within 5 minutes
- **Follow-up**: If complex, let them know you're researching and will follow up

### Conversation Flow
1. **Greet warmly**: Use the visitor's name if available
2. **Understand needs**: Ask clarifying questions about their project
3. **Provide value**: Share relevant resources, pricing, or next steps
4. **Capture leads**: Get contact information for follow-up
5. **Close professionally**: Summarize next steps and thank them

### Common Responses
Prepare templates for common questions:

**Pricing Inquiry**:
```
Great question! Our pricing depends on your specific needs:

🚀 Starter App: $5,000+ (website conversion)
💡 Custom App: $15,000+ (new app development)
🏢 Enterprise: Custom pricing (complex projects)

Would you like to tell me more about your project so I can give you a more specific estimate?
```

**Timeline Question**:
```
Timeline varies by project complexity:

📱 Simple app: 4-6 weeks
🎨 Custom design: 6-10 weeks  
🔧 Complex features: 10-16 weeks

What type of app are you thinking about? I can give you a more accurate timeline.
```

### Mobile Optimization
The chat widget is fully responsive and works great on mobile devices. Test it on:
- iPhone (Safari)
- Android (Chrome)
- iPad (Safari)
- Various screen sizes

## Troubleshooting

### Common Issues

1. **Chat widget not appearing**
   - Check that `NEXT_PUBLIC_CRISP_WEBSITE_ID` is set correctly
   - Verify the Website ID in your Crisp dashboard
   - Clear browser cache and reload

2. **Analytics not tracking**
   - Ensure Google Analytics is properly configured
   - Check browser console for JavaScript errors
   - Verify gtag is loaded before chat interactions

3. **Styling conflicts**
   - Crisp widget uses its own CSS and shouldn't conflict
   - If issues occur, check for CSS specificity problems
   - Contact Crisp support for widget customization

### Testing Checklist

- [ ] Chat widget appears on all pages
- [ ] Welcome message displays correctly
- [ ] All chat triggers work (header, contact, floating)
- [ ] Analytics events fire correctly
- [ ] Mobile experience is smooth
- [ ] Offline messages work when team is unavailable
- [ ] Business hours settings are respected

## Monitoring & Analytics

### Crisp Dashboard
Monitor these metrics in your Crisp dashboard:
- **Conversation volume**: Daily/weekly chat volume
- **Response time**: How quickly you respond to messages
- **Resolution time**: How long conversations take to resolve
- **Satisfaction**: Customer satisfaction ratings
- **Popular pages**: Which pages generate the most chats

### Google Analytics
Track chat performance in GA4:
- **Chat engagement**: How many visitors use chat
- **Conversion rate**: Chat users who become leads/customers
- **Page correlation**: Which pages drive the most chat interactions

## Next Steps

1. **Content Strategy**: Develop FAQ responses and conversation templates
2. **Team Training**: Train team members on chat best practices
3. **Automation**: Set up more sophisticated chatbots for common questions
4. **Integration**: Connect with your CRM and email marketing tools
5. **Optimization**: A/B test different chat triggers and messages

## Support Resources

- [Crisp Documentation](https://docs.crisp.chat/)
- [Crisp Community](https://community.crisp.chat/)
- [API Documentation](https://docs.crisp.chat/api/)
- [Widget Customization](https://docs.crisp.chat/guides/chatbox-sdks/web-sdk/)
