const fs = require('fs');
const path = require('path');
const matter = require('gray-matter'); // додаємо gray-matter для парсингу frontmatter

// Function to generate the manifest
function generateNewsManifest() {
  const rootDir = path.resolve(__dirname, '..');
  const newsDir = path.join(rootDir, 'public', 'news');
  const manifestPath = path.join(rootDir, 'src', 'utils', 'newsManifest.js');

  if (!fs.existsSync(newsDir)) {
    fs.mkdirSync(newsDir, { recursive: true });
    console.log('Created news directory at:', newsDir);
  }

  const files = fs.readdirSync(newsDir).filter(file => file.endsWith('.md'));

  const manifestData = files.map(file => {
    const filePath = path.join(newsDir, file);
    let pageLink;

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(content);
      // Якщо в header є page-link, беремо його, інакше робимо зі slug
      pageLink = data['page-link'] || file.replace(/\.md$/, '').replace(/-/g, '_');
    } catch (err) {
      console.warn(`Error reading ${file}, fallback to filename as pageLink`);
      pageLink = file.replace(/\.md$/, '').replace(/-/g, '_');
    }

    return {
      filename: file,
      pageLink
    };
  });

  const manifestContent = `// This file is auto-generated. Do not edit it manually.
export const newsManifest = ${JSON.stringify(manifestData, null, 2)};
`;

  const utilsDir = path.dirname(manifestPath);
  if (!fs.existsSync(utilsDir)) fs.mkdirSync(utilsDir, { recursive: true });

  fs.writeFileSync(manifestPath, manifestContent);
  console.log('News manifest updated successfully!');
  console.log('Found', files.length, 'news articles');
  console.log('Manifest written to:', manifestPath);
}

try {
  generateNewsManifest();
} catch (error) {
  console.error('Error generating news manifest:', error);
  process.exit(1);
}
