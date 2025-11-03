// lib/novelListQuery.js — Hardcoded data (no files, no fetch, no 500 errors)

const novelListQuery = async () => {
  // Starter novels (add more here if you want)
  const allNovels = [
    {
      id: 1,
      title: { english: "My First Novel", romaji: "マイノベル" },
      coverImage: { extraLarge: "https://picsum.photos/300/450?random=1", color: "#ff6b6b" },
      genres: ["Fantasy", "Romance"],
      meanScore: 95,
      popularity: 5000,
      format: "MANGA",
      chapters: 50,
      volumes: 5,
      status: "RELEASING"
    },
    {
      id: 2,
      title: { english: "Space Adventure", romaji: "宇宙冒険" },
      coverImage: { extraLarge: "https://picsum.photos/300/450?random=2", color: "#4ecdc4" },
      genres: ["Sci-Fi", "Action"],
      meanScore: 88,
      popularity: 8000,
      format: "MANGA",
      chapters: 120,
      volumes: 12,
      status: "FINISHED"
    }
  ];

  return {
    topScore: { media: allNovels.slice(0, 10) },  // Top 10
    mostPopular: { media: allNovels.slice(0, 6) },  // Popular 6
    trendingNow: { media: allNovels.slice(0, 6).reverse() }  // Trending 6 (reversed for variety)
  };
};

export default novelListQuery;
