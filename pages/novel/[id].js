import * as React from "react"; // ✅ safer import for Vercel/Next SSR
import novelQuery from "../../lib/novelQuery";
import Layout from "../../components/layout";
import Sidebar from "../../components/novel/sidebar";
import Overview from "../../components/novel/overview";
import NovelHeader from "../../components/novel/novelHeader";
import refactorNovelData from "../../lib/refactorNovelData";

// ✅ getServerSideProps should NOT have "use client"
export async function getServerSideProps({ query }) {
  const novelInfo = await novelQuery(query.id);
  const novelData = refactorNovelData(novelInfo);
  return {
    props: {
      ...novelData,
    },
  };
}

// ✅ main page component
export default function NovelInfoPage({ data, studios, producers }) {
  return (
    <Layout backgroundColor="#EDF1F5">
      <div className="novel">
        <NovelHeader data={data} />
        <div className="novel__content">
          <Sidebar
            title={data?.title}
            format={data.format}
            chapters={data.chapters}
            pages={data.pages}
            status={data.status}
            startDate={data.startDate}
            endDate={data.endDate}
            season={data.season}
            seasonYear={data.seasonYear}
            averageScore={data.averageScore}
            meanScore={data.meanScore}
            popularity={data.popularity}
            favourites={data.favourites}
            source={data.source}
            hashtag={data.hashtag}
            genres={data.genres}
            synonyms={data.synonyms}
            studios={studios}
            producers={producers}
            tags={data.tags}
            links={data.externalLinks}
          />
          <Overview
            relations={data.relations.edges}
            characters={data.characters}
            staff={data.staff.edges}
            stats={data.stats}
            streamingEpisodes={data.streamingEpisodes}
            recommendations={data.recommendations}
            trailer={data.trailer}
            reviews={data.reviews.edges}
          />
        </div>
      </div>

      <style jsx>{`
        .novel {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .novel__content {
          display: grid;
          grid-column-gap: 2.5rem;
          grid-template-columns: 13.8rem auto;
          margin: 2.8rem auto 0 auto;
          position: relative;
          width: 89rem;
          max-width: 87rem;
        }
        @media screen and (max-width: 1350px) {
          .novel__content {
            width: 70rem;
          }
        }
        @media screen and (max-width: 1150px) {
          .novel__content {
            width: 50rem;
            justify-content: center;
          }
        }
        @media screen and (max-width: 1000px) {
          .novel__content {
            width: 40rem;
          }
        }
        @media screen and (max-width: 750px) {
          .novel__content {
            width: 30rem;
            grid-template-columns: 1fr;
          }
        }
        @media screen and (max-width: 500px) {
          .novel__content {
            width: 20rem;
          }
        }
      `}</style>
    </Layout>
  );
    }
