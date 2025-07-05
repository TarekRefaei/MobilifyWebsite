# Sanity CMS Setup Guide

This guide explains how to set up Sanity CMS for the Mobilify blog and FAQ system.

## Prerequisites

1. A Sanity account (free tier available)
2. Node.js installed on your system
3. The Sanity CLI installed globally: `npm install -g @sanity/cli`

## Setup Steps

### 1. Create Sanity Project

1. Go to [Sanity.io](https://sanity.io) and create an account
2. Create a new project:
   - Choose a project name (e.g., "Mobilify CMS")
   - Select "Blog" template or start from scratch
   - Note down your **Project ID**

### 2. Initialize Sanity Studio

Run these commands in a separate directory (not in your Next.js project):

```bash
# Create a new Sanity project
sanity init

# Follow the prompts:
# - Select your existing project
# - Choose dataset name (use "production")
# - Select project template (choose "Blog" or "Clean project")
```

### 3. Configure Schemas

Replace the default schemas with our custom ones. Create these files in your Sanity project's `schemas` directory:

#### `schemas/post.js`
```javascript
export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      })
    },
  },
}
```

#### `schemas/category.js`
```javascript
export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
}
```

#### `schemas/faqItem.js`
```javascript
export default {
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'blockContent',
      validation: Rule => Rule.required()
    },
    {
      name: 'topic',
      title: 'Topic',
      type: 'reference',
      to: {type: 'faqTopic'},
      validation: Rule => Rule.required()
    },
    {
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [{type: 'reference', to: {type: 'post'}}],
    },
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'topic.title',
    },
  },
}
```

#### `schemas/faqTopic.js`
```javascript
export default {
  name: 'faqTopic',
  title: 'FAQ Topic',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
}
```

#### `schemas/blockContent.js`
```javascript
export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    },
  ],
}
```

#### Update `schemas/schema.js`
```javascript
import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import blockContent from './blockContent'
import category from './category'
import post from './post'
import faqItem from './faqItem'
import faqTopic from './faqTopic'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    post,
    category,
    faqItem,
    faqTopic,
    blockContent,
  ]),
})
```

### 4. Deploy Sanity Studio

```bash
# In your Sanity project directory
sanity deploy

# Choose a studio hostname (e.g., mobilify-cms)
# Your studio will be available at: https://mobilify-cms.sanity.studio
```

### 5. Configure Environment Variables

Add these to your Next.js project's `.env.local`:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
```

To get your API token:
1. Go to your Sanity project dashboard
2. Navigate to **Settings** → **API**
3. Create a new token with **Editor** permissions
4. Copy the token to your environment variables

### 6. Create Sample Content

Use the Sanity Studio to create:

#### Categories:
1. **Mobile Development** - Tips and tutorials for mobile app development
2. **Industry News** - Latest trends and news in the mobile industry
3. **Startup Tips** - Advice for entrepreneurs building mobile apps

#### Blog Posts:
1. **"5 Essential Features Every Mobile App Needs"** (Mobile Development)
2. **"The Future of Mobile App Development in 2024"** (Industry News)
3. **"From Idea to App Store: A Startup's Journey"** (Startup Tips)

#### FAQ Topics:
1. **Pricing** - Questions about costs and packages
2. **Process** - How we work and timelines
3. **Technical** - Technical questions about development

#### FAQ Items:
1. **"How much does it cost to build a mobile app?"** (Pricing)
2. **"How long does it take to develop an app?"** (Process)
3. **"Do you develop for both iOS and Android?"** (Technical)
4. **"Can you convert my existing website into an app?"** (Technical)
5. **"What's included in the Starter package?"** (Pricing)

## Next Steps

1. **Content Strategy**: Plan your content calendar and assign authors
2. **SEO Optimization**: Use the built-in SEO features for better search rankings
3. **Workflow**: Set up content approval workflows if needed
4. **Backup**: Configure automated backups for your content
5. **Analytics**: Track content performance and user engagement

## Troubleshooting

### Common Issues

1. **"Project not found"**
   - Verify your Project ID in environment variables
   - Check that the project exists in your Sanity dashboard

2. **"Dataset not found"**
   - Ensure the dataset name matches in your environment variables
   - Create the dataset if it doesn't exist

3. **"Unauthorized"**
   - Check that your API token has the correct permissions
   - Regenerate the token if needed

### Support

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Community](https://www.sanity.io/community)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs)
