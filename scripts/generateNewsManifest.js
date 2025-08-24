const fs = require('fs');
const path = require('path');

// Function to generate the manifest
function generateNewsManifest() {
  // Get the root directory of the project
  const rootDir = path.resolve(__dirname, '..');
  const newsDir = path.join(rootDir, 'public', 'news');
  const manifestPath = path.join(rootDir, 'src', 'utils', 'newsManifest.js');

  // Create news directory if it doesn't exist
  if (!fs.existsSync(newsDir)) {
    fs.mkdirSync(newsDir, { recursive: true });
    console.log('Created news directory at:', newsDir);
  }

  // Read the news directory
  const files = fs.readdirSync(newsDir)
    .filter(file => file.endsWith('.md'));

  // Create the manifest content
  const manifestContent = `// This file is auto-generated. Do not edit it manually.
export const newsManifest = ${JSON.stringify(files, null, 2)};
`;

  // Create utils directory if it doesn't exist
  const utilsDir = path.dirname(manifestPath);
  if (!fs.existsSync(utilsDir)) {
    fs.mkdirSync(utilsDir, { recursive: true });
    console.log('Created utils directory at:', utilsDir);
  }

  // Write the manifest file
  fs.writeFileSync(manifestPath, manifestContent);
  console.log('News manifest updated successfully!');
  console.log('Found', files.length, 'news articles');
  console.log('Manifest written to:', manifestPath);
}

// Run the generator
try {
  generateNewsManifest();
} catch (error) {
  console.error('Error generating news manifest:', error);
  process.exit(1);
}
