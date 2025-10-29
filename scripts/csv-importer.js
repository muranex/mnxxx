const fs = require('fs');
const readline = require('readline');

async function convertCsvToVideos(csvPath, outputPath, limit = 100) {
  const fileStream = fs.createReadStream(csvPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const videos = [];
  let lineCount = 0;
  let headers = [];

  for await (const line of rl) {
    if (lineCount === 0) {
      headers = line.split(',').map(h => h.replace(/"/g, ''));
      lineCount++;
      continue;
    }

    if (videos.length >= limit) break;

    const values = line.split(',').map(v => v.replace(/"/g, ''));
    const video = {};
    
    headers.forEach((header, index) => {
      video[header] = values[index] || '';
    });

    // Convert to your format
    if (video.viewkey) {
      videos.push({
        id: String(videos.length + 1),
        src: `https://www.pornhub.com/embed/${video.viewkey}`,
        title: video.title || 'Untitled',
        description: video.title || 'No description',
        category: video.category || 'uncategorized'
      });
    }

    lineCount++;
  }

  const output = `export default {\n  videos: ${JSON.stringify(videos, null, 2)}\n};`;
  fs.writeFileSync(outputPath, output);
  
  console.log(`Converted ${videos.length} videos to ${outputPath}`);
}

// Usage
convertCsvToVideos('./pornhub.com-db.csv', './app/data/videos-new.js', 200);