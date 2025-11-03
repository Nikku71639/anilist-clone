// lib/novelListQuery.js — Loads your JSON safely on server/client

const novelListQuery = async () => {
  try {
    // Fetch from public/ (works on Vercel server too)
    const res = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://anilist-clone-7a8864f5e-nikkus-projects-748b3821.vercel.app' : ''}/novels.json`);
    const allNovels = await res.json();

    return {
      topScore: { media: allNovels.slice(0, 10) },
      mostPopular: { media: allNovels.slice(0, 6) },
      trendingNow: { media: allNovels.slice(0, 6).reverse() }
    };
  } catch (error) {
    console.error('Failed to load novels:', error);
    // Fallback empty data
    return {
      topScore: { media: [] },
      mostPopular: { media: [] },
      trendingNow: { media: [] }
    };
  }
};

export default novelListQuery;
