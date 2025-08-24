# News System

The website includes a news system that automatically generates pages from Markdown files. Here's how it works:

## Adding News Articles

1. Create a new `.md` file in the `/public/news/` directory
2. Include the required frontmatter at the top of the file:

```markdown
---
author: Your Name
author-img: /path/to/author/image.png
date: YYYY-MM-DD
edited: YYYY-MM-DD
preview: /path/to/preview/image.png
title: Your Article Title
description: A brief description of your article
---

Your article content here...
```

## How It Works

- The manifest is automatically generated when you run `npm start` or `npm run build`
- You can manually regenerate the manifest by running `npm run generate-manifest`
- Articles are sorted by date (newest first)
- Each article is accessible at `/news/[filename-without-md]`

## File Structure

- `/public/news/` - Contains all news articles in Markdown format
- `/src/utils/newsManifest.js` - Auto-generated manifest of available articles
- `/scripts/generateNewsManifest.js` - Script that generates the manifest

## Important Notes

- All image paths should be relative to the `/public` directory
- The filename will be used as the URL slug if `page-link` is not specified in frontmatter
- Make sure to include all required frontmatter fields
