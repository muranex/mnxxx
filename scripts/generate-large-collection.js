const fs = require('fs');
const readline = require('readline');

async function generateLargeCollection(limit = 500) {
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
    
    // Clean and categorize
    let category = 'uncategorized';
    if (categories.length > 0) {
      category = categories[0].toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
    } else if (tags.length > 0) {
      category = tags[0].toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
    }

    // Map common categories
    const categoryMap = {
      'big tits': 'big-tits',
      'big ass': 'big-ass',
      'big dick': 'big-dick',
      'big cock': 'big-cock',
      'black cock': 'black-cock',
      'gang bang': 'gangbang',
      'gang banged': 'gangbang',
      'step mom': 'stepmom',
      'step daughter': 'stepdaughter',
      'step son': 'stepson'
    };

    category = categoryMap[category] || category;

    videos.push({
      id: String(count + 1),
      src: `https://www.pornhub.com/embed/${embedId}`,
      title: title.substring(0, 120),
      description: title.substring(0, 200),
      category: category
    });

    count++;
  }

  return videos;
}

// Generate and save
generateLargeCollection(500).then(videos => {
  const output = `export default {\n  videos: ${JSON.stringify(videos, null, 2)}\n};`;
  fs.writeFileSync('./app/data/videos-large.js', output);
  
  const categories = [...new Set(videos.map(v => v.category))];
  console.log(`✅ Generated ${videos.length} videos`);
  console.log(`📊 ${categories.length} unique categories`);
  console.log(`🎯 Top categories: ${categories.slice(0, 10).join(', ')}`);
});