// lib/novelListQuery.js
const MY_NOVELS = require('../data/novels.json');

const novelListQuery = async () => {
  const all = MY_NOVELS;

  return {
    topScore: { media: all.slice(0, 10) },
    mostPopular: { media: all.slice(0, 6) },
    trendingNow: { media: all.slice(0, 6).reverse() }
  };
};

export default novelListQuery;
