const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, '..', 'public', 'news', 'images');
const manifestPath = path.join(__dirname, '..', 'src', 'galleryManifest.json');

const manifest = {};

try {
  // Read all the gallery folders (e.g., 'photography_2025')
  const galleryFolders = fs.readdirSync(galleryDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const folder of galleryFolders) {
    const folderPath = path.join(galleryDir, folder);
    // Read all image files in the specific gallery folder
    const imageFiles = fs.readdirSync(folderPath)
      .filter(file => file.toLowerCase().endsWith('.png')); // You can add more extensions like .jpg if needed
    
    manifest[folder] = imageFiles;
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('✅ Successfully generated gallery manifest at src/galleryManifest.json');

} catch (error) {
  console.error('❌ Error generating gallery manifest:', error);
  // Create an empty manifest on error to prevent build from failing
  fs.writeFileSync(manifestPath, JSON.stringify({}, null, 2));
}