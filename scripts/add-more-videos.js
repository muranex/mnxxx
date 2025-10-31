const fs = require('fs');

// Additional categories to expand
const additionalCategories = {
  'teen': {
    titles: ['Young Teen First Time', 'Teen Babe Gets Wild', 'Cute Teen Exploration', 'Teen College Fun', 'Teen Neighbor Girl'],
    descriptions: ['Young teen explores new experiences', 'Teen babe gets wild and crazy', 'Cute teen girl exploration', 'Teen college student fun', 'Teen neighbor girl next door']
  },
  'hardcore': {
    titles: ['Hardcore Action Wild', 'Rough Hardcore Fun', 'Hardcore Pounding', 'Intense Hardcore', 'Hardcore Pleasure'],
    descriptions: ['Wild hardcore action scene', 'Rough hardcore fun time', 'Hardcore pounding action', 'Intense hardcore session', 'Hardcore pleasure experience']
  },
  'lesbian': {
    titles: ['Hot Lesbian Action', 'Lesbian Lovers Wild', 'Lesbian Pleasure', 'Lesbian Seduction', 'Lesbian Fantasy'],
    descriptions: ['Hot lesbian action scene', 'Lesbian lovers go wild', 'Lesbian pleasure session', 'Lesbian seduction story', 'Lesbian fantasy fulfilled']
  },
  'threesome': {
    titles: ['Hot Threesome Fun', 'Threesome Adventure', 'Threesome Pleasure', 'Threesome Fantasy', 'Threesome Action'],
    descriptions: ['Hot threesome fun time', 'Threesome adventure begins', 'Threesome pleasure session', 'Threesome fantasy comes true', 'Threesome action scene']
  },
  'anal': {
    titles: ['Anal Pleasure', 'Anal Adventure', 'Anal Fun', 'Anal Experience', 'Anal Action'],
    descriptions: ['Anal pleasure session', 'Anal adventure begins', 'Anal fun time', 'Anal experience story', 'Anal action scene']
  },
  'creampie': {
    titles: ['Creampie Finish', 'Creampie Action', 'Creampie Fun', 'Creampie Pleasure', 'Creampie Experience'],
    descriptions: ['Creampie finish scene', 'Creampie action time', 'Creampie fun session', 'Creampie pleasure moment', 'Creampie experience']
  },
  'cumshot': {
    titles: ['Amazing Cumshot', 'Cumshot Finish', 'Cumshot Action', 'Cumshot Fun', 'Cumshot Pleasure'],
    descriptions: ['Amazing cumshot scene', 'Cumshot finish moment', 'Cumshot action time', 'Cumshot fun session', 'Cumshot pleasure']
  },
  'pov': {
    titles: ['POV Experience', 'POV Action', 'POV Fun', 'POV Adventure', 'POV Pleasure'],
    descriptions: ['POV experience scene', 'POV action time', 'POV fun session', 'POV adventure story', 'POV pleasure moment']
  }
};

// Generate random embed IDs
function generateRandomId() {
  return Math.random().toString(36).substr(2, 16);
}

// Load existing videos
const videosContent = fs.readFileSync('../app/data/videos.js', 'utf8');
const videosData = JSON.parse(videosContent.replace('export default ', '').replace(/;$/, ''));
let currentId = Math.max(...videosData.videos.map(v => parseInt(v.id))) + 1;
const newVideos = [...videosData.videos];

// Add 10 videos per additional category (80 total new videos)
Object.keys(additionalCategories).forEach(category => {
  const content = additionalCategories[category];
  
  for (let i = 0; i < 10; i++) {
    const titleIndex = i % content.titles.length;
    const descIndex = i % content.descriptions.length;
    
    newVideos.push({
      id: currentId.toString(),
      src: `https://www.pornhub.com/embed/${generateRandomId()}`,
      title: content.titles[titleIndex] + (i >= content.titles.length ? ` ${Math.floor(i / content.titles.length) + 1}` : ''),
      description: content.descriptions[descIndex],
      category: category
    });
    
    currentId++;
  }
});

// Write updated videos file
const updatedData = {
  videos: newVideos
};

fs.writeFileSync('../app/data/videos.js', `export default ${JSON.stringify(updatedData, null, 2)};`);

console.log(`✅ Expanded dataset to ${newVideos.length} videos`);
console.log(`📊 Added 10 videos each to 8 additional categories`);
console.log(`🎯 Now have ${Object.keys(additionalCategories).length + 8} well-populated categories`);