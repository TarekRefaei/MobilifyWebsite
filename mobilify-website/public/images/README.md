# Images Directory Structure

This directory contains static UI images for the Mobilify website.

## Directory Structure

```
public/images/
├── logos/          # Company logos, brand assets
├── icons/          # Custom SVG icons, favicons
├── placeholders/   # Static placeholder images
└── README.md       # This file
```

## Usage Guidelines

### `/logos/`
- Company logos in various formats (SVG preferred)
- Brand assets and variations
- Partner logos if applicable

### `/icons/`
- Custom SVG icons not available in Lucide React
- Favicons and app icons
- Social media icons

### `/placeholders/`
- Static placeholder images for development
- Default avatars
- Fallback images

## Content Images

**Note:** Content images (team photos, case studies, blog images) should be uploaded to Sanity CMS, not stored here. This directory is only for static UI assets that are part of the application design.

## Image Optimization

- Use SVG for icons and logos when possible
- Optimize PNG/JPG images before adding
- Consider using Next.js Image component for better performance
- Use descriptive filenames (e.g., `mobilify-logo-dark.svg`)

## File Naming Convention

- Use kebab-case: `company-logo.svg`
- Include variant in name: `logo-dark.svg`, `logo-light.svg`
- Be descriptive: `placeholder-team-photo.jpg`
