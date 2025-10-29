const fs = require('fs');
const readline = require('readline');

async function parsePornhubCsv(limit = 100) {
  const fileStream = fs.createReadStream('./pornhub.com-db.csv');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const videos = [];
  let count = 0;

  for await (const line of rl) {
    if (count >= limit) break;
    
    const parts = line.split('|');
    if (parts.length < 5) continue;

    // Extract embed ID from iframe
    const iframeMatch = parts[0].match(/embed\/([a-f0-9]+)/);
    if (!iframeMatch) continue;

    const embedId = iframeMatch[1];
    const title = parts[3] || 'Untitled';
    const tags = parts[4] ? parts[4].split(';') : [];
    const categories = parts[5] ? parts[5].split(';') : [];
    const performer = parts[6] || '';
    
    // Use first category or tag as main category
    const category = categories[0] || tags[0] || 'uncategorized';

    videos.push({
      id: String(count + 23), // Start after existing videos
      src: `https://www.pornhub.com/embed/${embedId}`,
      title: title.substring(0, 100), // Limit title length
      description: title,
      category: category.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim()
    });

    count++;
  }

  const output = `export default {\n  videos: ${JSON.stringify(videos, null, 2)}\n};`;
  fs.writeFileSync('./app/data/videos-expanded.js', output);
  
  console.log(`✅ Converted ${videos.length} videos to videos-expanded.js`);
  console.log(`📊 Categories found: ${[...new Set(videos.map(v => v.category))].join(', ')}`);
}

parsePornhubCsv(200);