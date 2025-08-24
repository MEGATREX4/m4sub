const { create } = require('xmlbuilder2');
const fs = require('fs');
const path = require('path');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;

// Base URL of your website
const BASE_URL = 'https://www.m4sub.click';

// Function to extract routes from App.js
const extractRoutesFromAppJs = () => {
  try {
    const appJsPath = path.join(__dirname, '..', 'src', 'App.js');
    const content = fs.readFileSync(appJsPath, 'utf8');
    
    // Parse the JavaScript code
    const ast = parse(content, {
      sourceType: 'module',
      plugins: ['jsx']
    });

    const routes = [];

    // Traverse the AST to find Route components
    traverse(ast, {
      JSXElement(path) {
        if (path.node.openingElement.name.name === 'Route') {
          const pathProp = path.node.openingElement.attributes.find(
            attr => attr.name.name === 'path'
          );

          if (pathProp && pathProp.value.value) {
            const routePath = pathProp.value.value;
            
            // Skip catch-all route and dynamic routes
            if (routePath === '*' || routePath.includes(':')) {
              return;
            }

            // Determine priority and changefreq based on the route
            let priority = 0.5;
            let changefreq = 'weekly';

            if (routePath === '/') {
              priority = 1.0;
              changefreq = 'daily';
            } else if (routePath.includes('news')) {
              priority = 0.9;
              changefreq = 'daily';
            } else if (routePath.includes('rules')) {
              priority = 0.8;
              changefreq = 'weekly';
            } else if (routePath.includes('map')) {
              priority = 0.7;
              changefreq = 'daily';
            }

            routes.push({
              url: routePath,
              priority,
              changefreq
            });
          }
        }
      }
    });

    return routes;
  } catch (error) {
    console.error('Error extracting routes:', error);
    return [];
  }
};

// Function to get news article URLs from the manifest
const getNewsUrls = () => {
  try {
    const newsDir = path.join(__dirname, '..', 'public', 'news');
    const files = fs.readdirSync(newsDir).filter(file => file.endsWith('.md'));
    
    return files.map(file => {
      // Read the frontmatter to get the page-link
      const content = fs.readFileSync(path.join(newsDir, file), 'utf8');
      const pageLink = content.match(/page-link: (.+)/)?.[1]?.trim();
      return {
        url: `/news/${pageLink || file.replace('.md', '')}`,
        priority: 0.7,
        changefreq: 'monthly'
      };
    });
  } catch (error) {
    console.error('Error reading news files:', error);
    return [];
  }
};

// Generate the sitemap
const generateSitemap = () => {
  // Get routes from App.js
  const staticRoutes = extractRoutesFromAppJs();
  console.log('Found', staticRoutes.length, 'routes in App.js');
  
  // Get news article routes
  const newsRoutes = getNewsUrls();
  console.log('Found', newsRoutes.length, 'news articles');

  // Combine all routes
  const routes = [...staticRoutes, ...newsRoutes];
  
  const root = create({ version: '1.0', encoding: 'UTF-8' })
    .ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });

  routes.forEach(route => {
    const url = root.ele('url');
    url.ele('loc').txt(BASE_URL + route.url);
    url.ele('changefreq').txt(route.changefreq);
    url.ele('priority').txt(route.priority.toString());
    url.ele('lastmod').txt(new Date().toISOString().split('T')[0]);
  });

  const xml = root.end({ prettyPrint: true });

  // Write the sitemap
  const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml);
  console.log('Sitemap generated successfully at:', outputPath);
};

// Run the generator
try {
  generateSitemap();
} catch (error) {
  console.error('Error generating sitemap:', error);
  process.exit(1);
}
