const fs = require('fs');
const readline = require('readline');

// 25 target categories with keywords for classification
const categoryKeywords = {
  'milf': ['milf', 'mature', 'mom', 'stepmom', 'cougar', 'older'],
  'teen': ['teen', 'young', '18', '19', 'college', 'student'],
  'big-tits': ['big tits', 'huge tits', 'big boobs', 'busty', 'massive tits'],
  'anal': ['anal', 'ass fuck', 'butthole', 'asshole', 'backdoor'],
  'blonde': ['blonde', 'blond', 'platinum'],
  'brunette': ['brunette', 'brown hair', 'dark hair'],
  'asian': ['asian', 'japanese', 'chinese', 'korean', 'oriental'],
  'latina': ['latina', 'latin', 'hispanic', 'mexican', 'spanish'],
  'ebony': ['ebony', 'black', 'african', 'bbc'],
  'redhead': ['redhead', 'red hair', 'ginger'],
  'blowjob': ['blowjob', 'bj', 'oral', 'suck', 'deepthroat'],
  'hardcore': ['hardcore', 'rough', 'hard fuck', 'pounding'],
  'lesbian': ['lesbian', 'girl on girl', 'pussy licking', 'tribbing'],
  'threesome': ['threesome', '3some', 'mmf', 'ffm', 'group'],
  'creampie': ['creampie', 'cum inside', 'internal', 'breeding'],
  'cumshot': ['cumshot', 'facial', 'cum on', 'jizz'],
  'pov': ['pov', 'point of view', 'first person'],
  'amateur': ['amateur', 'homemade', 'real couple', 'girlfriend'],
  'babe': ['babe', 'beauty', 'gorgeous', 'stunning'],
  'slut': ['slut', 'whore', 'dirty', 'naughty'],
  'gangbang': ['gangbang', 'gang bang', 'multiple guys', 'train'],
  'interracial': ['interracial', 'mixed', 'bbc', 'black cock'],
  'masturbation': ['masturbation', 'solo', 'fingering', 'dildo'],
  'squirt': ['squirt', 'squirting', 'gush', 'wet'],
  'fetish': ['fetish', 'kinky', 'bdsm', 'domination']
};

// Function to categorize based on title and tags
function categorizeVideo(title, tags) {
  const text = (title + ' ' + tags).toLowerCase();
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return category;
    }
  }
  
  return 'amateur'; // default category
}

// Function to extract embed ID from iframe
function extractEmbedId(iframe) {
  const match = iframe.match(/embed\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

// Function to clean title
function cleanTitle(title) {
  return title.replace(/[^\w\s-]/g, '').trim().substring(0, 100);
}

async function processCSV() {
  console.log('🚀 Starting CSV processing...');
  
  const fileStream = fs.createReadStream('../pornhub.com-db.csv');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const videos = [];
  const categoryCount = {};
  let lineCount = 0;
  let processedCount = 0;
  
  // Initialize category counters
  Object.keys(categoryKeywords).forEach(cat => categoryCount[cat] = 0);
  
  const targetPerCategory = 200; // 200 videos per category = 5000 total
  
  for await (const line of rl) {
    lineCount++;
    
    if (lineCount % 50000 === 0) {
      console.log(`📊 Processed ${lineCount} lines, collected ${videos.length} videos`);
    }
    
    // Skip if we have enough videos
    if (videos.length >= 5000) break;
    
    try {
      const parts = line.split('|');
      if (parts.length < 4) continue;
      
      const iframe = parts[0];
      const title = parts[3];
      const tags = parts[4] || '';
      
      const embedId = extractEmbedId(iframe);
      if (!embedId || !title) continue;
      
      const category = categorizeVideo(title, tags);
      
      // Skip if category is full
      if (categoryCount[category] >= targetPerCategory) continue;
      
      const cleanedTitle = cleanTitle(title);
      if (cleanedTitle.length < 10) continue; // Skip very short titles
      
      videos.push({
        id: (videos.length + 1).toString(),
        src: `https://www.pornhub.com/embed/${embedId}`,
        title: cleanedTitle,
        description: cleanedTitle, // Use title as description
        category: category
      });
      
      categoryCount[category]++;
      processedCount++;
      
    } catch (error) {
      // Skip malformed lines
      continue;
    }
  }
  
  console.log(`✅ Processing complete!`);
  console.log(`📊 Total videos collected: ${videos.length}`);
  console.log(`📈 Lines processed: ${lineCount}`);
  
  // Show category distribution
  console.log('\n🎯 Category Distribution:');
  Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`  ${cat}: ${count} videos`);
    });
  
  // Write to file
  const videoData = { videos };
  fs.writeFileSync('../app/data/videos.js', `export default ${JSON.stringify(videoData, null, 2)};`);
  
  console.log('\n🎉 Dataset created successfully!');
  console.log(`📁 File size: ${(fs.statSync('../app/data/videos.js').size / 1024 / 1024).toFixed(2)}MB`);
}

processCSV().catch(console.error);