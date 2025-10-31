const fs = require('fs');

// Top 8 categories to expand
const topCategories = ['milf', 'big-tits', 'blonde', 'brunette', 'asian', 'blowjob', 'amateur', 'babe'];

// Sample titles and descriptions for each category
const categoryContent = {
  milf: {
    titles: [
      'Hot MILF Seduces Young Stud',
      'Busty MILF Gets What She Wants',
      'Mature MILF Shows Her Experience',
      'MILF Teacher After Class',
      'Horny MILF Neighbor',
      'MILF Boss Takes Control',
      'Experienced MILF Knows Best',
      'MILF Stepmom Teaches Lesson',
      'Lonely MILF Needs Attention',
      'MILF Housewife Secret Desires'
    ],
    descriptions: [
      'Experienced MILF shows younger man what real pleasure is',
      'Busty mature woman takes charge in the bedroom',
      'Hot MILF demonstrates her years of experience',
      'Sexy teacher MILF gives private lessons',
      'Horny neighbor MILF gets exactly what she needs',
      'Dominant MILF boss shows who\'s in charge',
      'Mature woman knows exactly how to please',
      'Stepmom MILF teaches important life lessons',
      'Lonely housewife MILF finds satisfaction',
      'Secret desires of a horny MILF revealed'
    ]
  },
  'big-tits': {
    titles: [
      'Massive Tits Bouncing Wild',
      'Big Boobs Beauty Gets Pounded',
      'Huge Tits MILF Goes Crazy',
      'Big Breasted Babe Loves It',
      'Enormous Tits Goddess',
      'Big Tit Blonde Bombshell',
      'Massive Boobs Brunette',
      'Big Tits Asian Beauty',
      'Huge Breasts Latina',
      'Big Boobs Redhead Fire'
    ],
    descriptions: [
      'Amazing big tits bouncing in every position',
      'Beautiful woman with massive boobs gets wild',
      'MILF with huge tits shows her skills',
      'Babe with big breasts loves every moment',
      'Goddess with enormous tits in action',
      'Blonde bombshell with massive tits',
      'Brunette beauty with huge boobs',
      'Asian girl with perfect big tits',
      'Latina with incredible big breasts',
      'Redhead with amazing big boobs'
    ]
  },
  blonde: {
    titles: [
      'Blonde Bombshell Goes Wild',
      'Hot Blonde Babe Gets Naughty',
      'Sexy Blonde MILF Action',
      'Blonde Beauty Loves It Hard',
      'Platinum Blonde Goddess',
      'Blonde Teen First Time',
      'Blonde Cougar Hunting',
      'Blonde Secretary After Hours',
      'Blonde Cheerleader Fantasy',
      'Blonde Neighbor Next Door'
    ],
    descriptions: [
      'Stunning blonde bombshell in wild action',
      'Hot blonde babe gets very naughty',
      'Sexy blonde MILF shows her skills',
      'Beautiful blonde loves it rough and hard',
      'Platinum blonde goddess in paradise',
      'Young blonde teen explores new pleasures',
      'Blonde cougar on the hunt for satisfaction',
      'Blonde secretary works overtime',
      'Blonde cheerleader fulfills fantasies',
      'Girl next door blonde gets wild'
    ]
  },
  brunette: {
    titles: [
      'Brunette Beauty Gets Wild',
      'Hot Brunette Babe Action',
      'Sexy Brunette MILF Fun',
      'Brunette Goddess Pleasure',
      'Dark Haired Beauty',
      'Brunette Teen Exploration',
      'Brunette Wife Secret',
      'Brunette Student Lesson',
      'Brunette Latina Fire',
      'Brunette Office Fantasy'
    ],
    descriptions: [
      'Beautiful brunette gets wild and crazy',
      'Hot brunette babe in amazing action',
      'Sexy brunette MILF having fun',
      'Brunette goddess seeks pure pleasure',
      'Dark haired beauty shows her skills',
      'Young brunette teen explores desires',
      'Brunette wife\'s secret revealed',
      'Brunette student learns new lessons',
      'Latina brunette brings the fire',
      'Brunette office worker fantasy'
    ]
  },
  asian: {
    titles: [
      'Asian Beauty Traditional Style',
      'Hot Asian Babe Gets Wild',
      'Sexy Asian MILF Action',
      'Asian Goddess Pleasure',
      'Oriental Beauty Secrets',
      'Asian Teen First Experience',
      'Asian Wife Hidden Desires',
      'Asian Student After Class',
      'Asian Massage Happy Ending',
      'Asian Neighbor Fantasy'
    ],
    descriptions: [
      'Beautiful Asian woman in traditional pleasure',
      'Hot Asian babe gets incredibly wild',
      'Sexy Asian MILF in amazing action',
      'Asian goddess seeks ultimate pleasure',
      'Oriental beauty reveals ancient secrets',
      'Young Asian teen first experience',
      'Asian wife explores hidden desires',
      'Asian student stays after class',
      'Asian massage with happy ending',
      'Asian neighbor fulfills fantasies'
    ]
  },
  blowjob: {
    titles: [
      'Amazing Blowjob Skills',
      'Perfect Oral Technique',
      'Blowjob Queen in Action',
      'Incredible Mouth Work',
      'Blowjob Goddess Shows Skills',
      'Perfect Lips Service',
      'Blowjob Expert Demonstration',
      'Oral Pleasure Perfection',
      'Blowjob Artist at Work',
      'Ultimate Oral Experience'
    ],
    descriptions: [
      'Amazing blowjob skills on full display',
      'Perfect oral technique demonstration',
      'Blowjob queen shows her expertise',
      'Incredible mouth work and technique',
      'Blowjob goddess demonstrates skills',
      'Perfect lips provide amazing service',
      'Blowjob expert gives demonstration',
      'Oral pleasure reaches perfection',
      'True blowjob artist at work',
      'Ultimate oral experience delivered'
    ]
  },
  amateur: {
    titles: [
      'Amateur Couple First Time',
      'Real Amateur Home Video',
      'Amateur Girl Next Door',
      'Amateur College Fun',
      'Amateur Wife Experiment',
      'Amateur Teen Exploration',
      'Amateur Homemade Action',
      'Amateur Real Passion',
      'Amateur Couple Adventure',
      'Amateur First Experience'
    ],
    descriptions: [
      'Amateur couple tries something new',
      'Real amateur home video footage',
      'Amateur girl next door gets wild',
      'Amateur college students having fun',
      'Amateur wife tries new experiment',
      'Amateur teen explores new territory',
      'Amateur homemade action video',
      'Amateur couple shows real passion',
      'Amateur couple on new adventure',
      'Amateur first time experience'
    ]
  },
  babe: {
    titles: [
      'Hot Babe Gets Naughty',
      'Sexy Babe Wild Action',
      'Beautiful Babe Pleasure',
      'Gorgeous Babe Fantasy',
      'Perfect Babe Experience',
      'Stunning Babe Adventure',
      'Hot Babe Seduction',
      'Sexy Babe Temptation',
      'Beautiful Babe Desire',
      'Amazing Babe Action'
    ],
    descriptions: [
      'Hot babe gets incredibly naughty',
      'Sexy babe in wild action scene',
      'Beautiful babe seeks pure pleasure',
      'Gorgeous babe fulfills fantasy',
      'Perfect babe delivers experience',
      'Stunning babe on adventure',
      'Hot babe masters seduction',
      'Sexy babe creates temptation',
      'Beautiful babe shows desire',
      'Amazing babe in action'
    ]
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

// Add 50 videos per top category (400 total new videos)
topCategories.forEach(category => {
  const content = categoryContent[category];
  
  for (let i = 0; i < 50; i++) {
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
console.log(`📊 Added 50 videos each to top 8 categories`);
console.log(`🎯 Categories now have better distribution for filtering`);