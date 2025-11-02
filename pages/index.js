import React from "react";
import Head from "next/head";
import Layout from "../components/layout";
import Landing from "../components/rootRoute/landing";
import Filters from "../components/rootRoute/filters";
import MediaCardList from "../components/rootRoute/mediaCardList";
import novelListQuery from "../lib/novelListQuery";
import useWindowDimensions from "../lib/useWindowDimensions";

// ———————— STEP 5: Read your saved novels ————————
const getMyNovels = () => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("myNovels");
  return saved ? JSON.parse(saved) : [];
};

// ———————— Get data from your file + your novels ————————
export async function getServerSideProps() {
  const starter = await novelListQuery();

  return {
    props: {
      topScore: starter.topScore,
      mostPopular: starter.mostPopular,
      trendingNow: starter.trendingNow,
    },
  };
}

// ———————— Main Page ————————
export default function Home({ topScore, mostPopular, trendingNow }) {
  const { width } = useWindowDimensions();
  const [allTopNovels, setAllTopNovels] = React.useState(topScore.media);

  // ———————— STEP 5: Show your novels after page loads ————————
  React.useEffect(() => {
    const myNovels = getMyNovels();
    setAllTopNovels([...topScore.media, ...myNovels]);
  }, [topScore.media]);

  return (
    <Layout>
      <Head>
        <title>My Personal Anilist</title>
        <link rel="icon" href="/images/AnilistIcon.png" />
      </Head>

      <Landing />
      <Filters />

      {/* ———————— ADD NOVEL FORM ———————— */}
      <div style={{ margin: "20px auto", maxWidth: 600, padding: 20, background: "#f9f9f9", borderRadius: 12, textAlign: "center" }}>
        <h3>Add Your Own Novel</h3>
        <input placeholder="Title" id="title" style={{ padding: 10, margin: 5, width: "80%" }} />
        <br />
        <input placeholder="Romaji (optional)" id="romaji" style={{ padding: 10, margin: 5, width: "80%" }} />
        <br />
        <button
          onClick={() => {
            const title = document.getElementById("title").value.trim();
            if (!title) return alert("Please enter a title!");

            const newNovel = {
              id: Date.now(),
              title: { english: title, romaji: document.getElementById("romaji").value || title },
              coverImage: { extraLarge: `https://picsum.photos/300/450?random=${Date.now()}`, color: "#ff6b6b" },
              genres: ["Custom"],
              meanScore: 90,
              popularity: 100,
              format: "MANGA",
              chapters: 1,
              volumes: 1,
              status: "RELEASING",
            };

            const saved = JSON.parse(localStorage.getItem("myNovels") || "[]");
            saved.push(newNovel);
            localStorage.setItem("myNovels", JSON.stringify(saved));

            // Instantly show it
            setAllTopNovels(prev => [...prev, newNovel]);
          }}
          style={{ background: "#007bff", color: "white", padding: "12px 24px", border: "none", borderRadius: 8, marginTop: 10 }}
        >
          Add Novel
        </button>
      </div>

      {/* ———————— LISTS ———————— */}
      <MediaCardList infoTitle="TRENDING NOW" typeOfCard="picture" data={trendingNow.media} />
      <MediaCardList infoTitle="ALL TIME POPULAR" typeOfCard="picture" data={mostPopular.media} />
      <MediaCardList
        infoTitle="TOP 100 NOVELS"
        typeOfCard={width < 950 ? "picture" : "info"}
        data={allTopNovels}   {/* ← Your novels appear here! */}
      />
    </Layout>
  );
    }
