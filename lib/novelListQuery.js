// lib/novelListQuery.js  ← YOUR PERSONAL DATABASE

// Load your own data
const MY_NOVELS = require('../data/novels.json');

// Return fake sections (you can customize)
const novelListQuery = async () => {
  const all = MY_NOVELS;

  return {
    topScore: { media: all.slice(0, 10) },
    mostPopular: { media: all.slice(0, 6) },
    trendingNow: { media: all.slice(0, 6).reverse() }
  };
};

export default novelListQuery;
