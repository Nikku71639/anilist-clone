import React from "react";
import Head from "next/head";
import Layout from "../components/layout";
import Landing from "../components/rootRoute/landing";
import Filters from "../components/rootRoute/filters";
import MediaCardList from "../components/rootRoute/mediaCardList";
import novelListQuery from "../lib/novelListQuery";
import useWindowDimensions from "../lib/useWindowDimensions";

export async function getServerSideProps() {
  const { data } = await novelListQuery();
  const topScore = data.topScore;
  const mostPopular = data.mostPopular;
  const trendingNow = data.trendingNow;
  return {
    props: {
      topScore,
      mostPopular,
      trendingNow,
    },
  };
}

export default function Home({
  topScore,
  mostPopular,
  trendingNow,
}) {
  const { height, width } = useWindowDimensions();
  
console.log("✅ Page rendered successfully on server");
 
  return (
    <Layout>
      <Head>
        <title>Search Novel · Anilist</title>
        <link rel="icon" href="/images/AnilistIcon.png" />
      </Head>

      <Landing />
      <Filters />
{/* === ADD NEW NOVEL FORM === */}
<div style={{
  margin: '20px auto',
  maxWidth: 600,
  padding: 20,
  background: '#f0f0f0',
  borderRadius: 12,
  textAlign: 'center'
}}>
  <h3>Add Your Own Novel</h3>
  <input
    placeholder="Title (English)"
    id="title"
    style={{ padding: 10, margin: 5, width: '80%' }}
  />
  <br />
  <input
    placeholder="Romaji"
    id="romaji"
    style={{ padding: 10, margin: 5, width: '80%' }}
  />
  <br />
  <button
    onClick={() => {
      const title = document.getElementById('title').value;
      const romaji = document.getElementById('romaji').value;
      if (!title) return alert("Enter a title!");

      const newNovel = {
        id: Date.now(),
        title: { english: title, romaji: romaji || title },
        coverImage: { extraLarge: `https://picsum.photos/300/450?random=${Date.now()}`, color: "#ff6b6b" },
        genres: ["Custom"],
        meanScore: 90,
        popularity: 100,
        format: "MANGA",
        chapters: 1,
        volumes: 1,
        status: "RELEASING"
      };

      // Save to localStorage (browser memory)
      const saved = JSON.parse(localStorage.getItem('myNovels') || '[]');
      saved.push(newNovel);
      localStorage.setItem('myNovels', JSON.stringify(saved));

      alert("Added! Refresh to see it.");
    }}
    style={{
      background: '#007bff',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: 8,
      marginTop: 10
    }}
  >
    Add Novel
  </button>
</div>
      <MediaCardList
        infoTitle="TRENDING NOW"
        typeOfCard="picture"
        data={trendingNow.media}
      />

      <MediaCardList
        infoTitle="ALL TIME POPULAR"
        typeOfCard="picture"
        data={mostPopular.media}
      />

      <MediaCardList
        infoTitle="TOP 100 NOVELS"
        typeOfCard={width < 950 ? "picture" : "info"}
        data={topScore.media}
      />

      <style jsx>{`
        .title {
          margin: 0;
        }
      `}</style>
    </Layout>
  );
}
