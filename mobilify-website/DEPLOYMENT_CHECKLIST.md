# Mobilify Website Deployment Checklist

## Pre-Deployment Setup

### 1. Environment Variables
- [ ] Set up Google Analytics 4 property
- [ ] Get GA4 Measurement ID (format: G-XXXXXXXXXX)
- [ ] Create Web3Forms account at https://web3forms.com
- [ ] Get Web3Forms access key
- [ ] Add environment variables to Vercel dashboard:
  - `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`
  - `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`

### 2. Content Updates
- [ ] Replace team photos in `src/components/TeamProfiles.tsx` with actual professional headshots
- [ ] Update company email in Contact component error message (currently: contact@mobilify.dev)
- [ ] Review and update pricing if needed in `src/components/PricingTable.tsx`
- [ ] Verify all content is accurate and up-to-date

### 3. Domain Setup (Optional)
- [ ] Purchase custom domain
- [ ] Configure DNS settings
- [ ] Add custom domain to Vercel project
- [ ] Set up SSL certificate (automatic with Vercel)

## Deployment Steps

### 1. GitHub Setup
- [ ] Create GitHub repository
- [ ] Push code to GitHub:
  ```bash
  git init
  git add .
  git commit -m "Initial commit: Mobilify website"
  git branch -M main
  git remote add origin <your-repo-url>
  git push -u origin main
  ```

### 2. Vercel Deployment
- [ ] Connect GitHub repository to Vercel
- [ ] Configure build settings (should auto-detect Next.js)
- [ ] Add environment variables in Vercel dashboard
- [ ] Deploy and test

### 3. Post-Deployment Testing
- [ ] Test all navigation links
- [ ] Test interactive demo functionality
- [ ] Test contact form submission
- [ ] Verify Google Analytics is tracking (check Real-time reports)
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Check page load speeds
- [ ] Verify SEO meta tags

## Performance Optimization

### 1. Image Optimization
- [ ] Replace placeholder team images with optimized versions
- [ ] Ensure all images are properly sized and compressed
- [ ] Consider using Next.js Image component for better performance

### 2. Analytics Verification
- [ ] Verify GA4 is receiving data
- [ ] Test custom events:
  - Demo interaction tracking
  - Form submission tracking
  - Services page view tracking

### 3. SEO Checklist
- [ ] Verify meta titles and descriptions
- [ ] Check structured data
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Search Console

## Maintenance

### 1. Regular Updates
- [ ] Monitor form submissions
- [ ] Review analytics data monthly
- [ ] Update content as needed
- [ ] Keep dependencies updated

### 2. Backup Strategy
- [ ] Ensure code is backed up in GitHub
- [ ] Document any custom configurations
- [ ] Keep environment variables documented securely

## Troubleshooting

### Common Issues
1. **Forms not working**: Check Web3Forms access key
2. **Analytics not tracking**: Verify GA4 Measurement ID
3. **Build failures**: Check TypeScript errors and dependencies
4. **Mobile issues**: Test responsive design on actual devices

### Support Resources
- Next.js Documentation: https://nextjs.org/docs
- Vercel Documentation: https://vercel.com/docs
- Web3Forms Documentation: https://web3forms.com/docs
- Google Analytics Help: https://support.google.com/analytics

## Launch Announcement

### 1. Pre-Launch
- [ ] Final content review
- [ ] Cross-browser testing
- [ ] Mobile responsiveness check
- [ ] Performance audit

### 2. Launch Day
- [ ] Deploy to production
- [ ] Monitor for any issues
- [ ] Test all functionality
- [ ] Announce launch

### 3. Post-Launch
- [ ] Monitor analytics
- [ ] Collect user feedback
- [ ] Plan future improvements
