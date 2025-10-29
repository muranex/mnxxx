const fs = require('fs');

// Read original videos
const originalVideos = require('../app/data/videos.js').default.videos;

// Read large collection
const largeVideos = require('../app/data/videos-large.js').default.videos;

// Merge collections
const mergedVideos = [
  ...originalVideos,
  ...largeVideos.map(video => ({
    ...video,
    id: String(parseInt(video.id) + 100) // Offset IDs to avoid conflicts
  }))
];

// Create final collection
const finalCollection = {
  videos: mergedVideos
};

// Save merged collection
const output = `export default ${JSON.stringify(finalCollection, null, 2)};`;
fs.writeFileSync('./app/data/videos.js', output);

console.log(`✅ Merged collections: ${originalVideos.length} + ${largeVideos.length} = ${mergedVideos.length} total videos`);

const categories = [...new Set(mergedVideos.map(v => v.category))];
console.log(`📊 Total categories: ${categories.length}`);
console.log(`🎯 Categories: ${categories.sort().join(', ')}`);

// Show stats
const categoryStats = {};
mergedVideos.forEach(video => {
  categoryStats[video.category] = (categoryStats[video.category] || 0) + 1;
});

console.log('\n📈 Top categories by count:');
Object.entries(categoryStats)
  .sort(([,a], [,b]) => b - a)
  .slice(0, 10)
  .forEach(([cat, count]) => console.log(`   ${cat}: ${count} videos`));