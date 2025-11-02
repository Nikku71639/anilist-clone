const novelListQuery = async (numOfResults, queryInfo) => {
  const query = `
  {
    topScore: Page(page: 1, perPage: 10) {
      media(type: MANGA, sort: SCORE_DESC) {
        id
        coverImage {
          extraLarge
          large
          medium
          color
        }
        title {
          english
          romaji
          native
        }
        genres
        meanScore
        popularity
        format
        chapters
        volumes
        status
      }
    }
    mostPopular: Page(page: 1, perPage: 6) {
      media(type: MANGA, sort: POPULARITY_DESC) {
        id
        coverImage {
          extraLarge
          large
          medium
          color
        }
        title {
          english
          romaji
          native
        }
        genres
        meanScore
        popularity
        format
        chapters
        volumes
        status
      }
    }
  trendingNow: Page(page: 1, perPage: 6) {
      media(type: MANGA, sort: TRENDING_DESC) {
        id
        coverImage {
          extraLarge
          large
          medium
          color
        }
        title {
          english
          romaji
          native
        }
        genres
        meanScore
        popularity
        format
        chapters
        volumes
        status
      }
    }
  }
    `;

  const url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    };

  return fetch(url, options)
    .then((res) => res.json())
    .then((data) => data);
};

export default novelListQuery;
