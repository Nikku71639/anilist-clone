const novelQuery = async (id) => {
  const query = `
  {
    Media(id:${id}, type: MANGA) {
    reviews {
      edges {
        node{
          id
          summary
          rating
          user {
            id
            avatar {
              large
              medium
            }
          }
        }
      }
    }
    recommendations {
      edges {
        node {
          id
          mediaRecommendation {
            title {
              romaji
            }
            coverImage {
              extraLarge
              large
              medium
              color
            }
          }
        }
      }
    }
      stats{
        scoreDistribution {
          score
          amount
        }
        statusDistribution {
          status
          amount
        }
      }
      staff {
        edges{
          node {
            image {
              large
              medium
            }
            name {
              first
              last
              full
              native
            }
            id
          }
          role
          id
        }
      }
      characters(sort: ID){
        edges {
          role
          node {
            image {
              medium
            }
            name {
              first
              last
              full
              native
            }
            id
          }
          id
        }
      }
      id
      bannerImage
      description(asHtml: true)
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
      relations {
        edges {
          relationType
          node {
            coverImage {
              extraLarge
              large
              medium
              color
            }
            title {
              romaji
              english
              native
              userPreferred
            }
            id
          }
          id
        }
      }
      genres
      meanScore
      averageScore
      popularity
      format
      chapters
      volumes
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      status
      hashtag
      studios {
        edges {
          node {
            id
            name
            isAnimationStudio
          }
        }
      }
      source
      synonyms
      favourites
      tags {
        name
        isMediaSpoiler
        id
        rank
      }
      externalLinks {
        id
        site
        url
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

export default novelQuery;
