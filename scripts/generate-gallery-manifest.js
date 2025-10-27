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
    const allFiles = fs.readdirSync(folderPath)
      .filter(file => file.toLowerCase().match(/\.(png|jpg|jpeg|webp)$/));
    
    // Separate thumbnails from full images
    const thumbnails = new Set();
    const fullImages = [];
    
    // First pass: identify thumbnails
    allFiles.forEach(file => {
      // Check various thumbnail patterns
      if (file.match(/_thumb\.|_thumbnail\.|-thumb\.|\s\(Custom\)\./i)) {
        thumbnails.add(file);
      }
    });
    
    // Second pass: create image entries
    const imageEntries = [];
    
    allFiles.forEach(file => {
      // Skip if this is a thumbnail
      if (thumbnails.has(file)) {
        return;
      }
      
      // Check if this image has a corresponding thumbnail
      const nameWithoutExt = file.substring(0, file.lastIndexOf('.'));
      const extension = file.substring(file.lastIndexOf('.'));
      
      // Try different thumbnail naming patterns
      const possibleThumbnails = [
        `${nameWithoutExt}_thumb${extension}`,
        `${nameWithoutExt}_thumbnail${extension}`,
        `${nameWithoutExt}-thumb${extension}`,
        `${nameWithoutExt} (Custom)${extension}`, // New pattern support
        `thumb_${file}`,
        `thumbnail_${file}`
      ];
      
      let thumbnailFile = null;
      for (const thumbName of possibleThumbnails) {
        if (thumbnails.has(thumbName)) {
          thumbnailFile = thumbName;
          break;
        }
      }
      
      // Create entry with both full image and optional thumbnail
      const entry = {
        filename: file,
        thumbnail: thumbnailFile || null
      };
      
      imageEntries.push(entry);
    });
    
    manifest[folder] = imageEntries;
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('✅ Successfully generated gallery manifest at src/galleryManifest.json');
  
  // Log summary with more details
  console.log(`Summary: ${Object.entries(manifest).reduce((acc, [folder, images]) => acc + images.length, 0)} images (${Object.entries(manifest).reduce((acc, [folder, images]) => acc + images.filter(img => img.thumbnail).length, 0)} with thumbnails)`);

} catch (error) {
  console.error('❌ Error generating gallery manifest:', error);
  // Create an empty manifest on error to prevent build from failing
  fs.writeFileSync(manifestPath, JSON.stringify({}, null, 2));
}