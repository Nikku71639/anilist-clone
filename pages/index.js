"use client";
import * as React from "react";
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

  return (
    <Layout>
      <Head>
        <title>Search Novel · Anilist</title>
        <link rel="icon" href="/images/AnilistIcon.png" />
      </Head>

      <Landing />
      <Filters />

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
