import { ReactElement, useState, useEffect } from "react";
import LayoutWithNavigation from "@/components/layouts/LayoutWithNavigation";
import { WistiaPlayer } from "@wistia/wistia-player-react";
import { useRouter } from "next/router";
import SearchBar from "@/components/SearchBar";
import VideoFilter from "@/components/VideoFilter";
// @ts-ignore
import { WistiaPlayerCustomEvent } from "@wistia/wistia-player-react/dist/cjs/types/types/index";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import WatchVideoCard from "@/components/cards/WatchVideoCard";
import { GetStaticPaths, GetStaticProps } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { Tables } from "@/services/supabase";
import { SavedVideo } from "@/utils/type";
import useSearch from "@/hooks/useSearch";
import useFilter from "@/hooks/useFilter";
import Head from "next/head";
import { SITE_URL } from "@/utils/constant";

dayjs.extend(relativeTime);
dayjs.extend(duration);

// Define translations
const translations = {
  en: {
    views: "Views",
    view: "View",
    posted: "Posted",
    searchResult: "Search result",
  },
  fr: {
    views: "Vues",
    view: "Vue",
    posted: "Publié",
    searchResult: "Résultat de recherche",
  },
};

export default function WatchPage({
  currentVideo,
  relatedVideos,
  locale,
}: {
  currentVideo: SavedVideo;
  relatedVideos: SavedVideo[];
  locale: string;
}) {
  const router = useRouter();
  const [videoData, setVideoData] = useState<WistiaPlayerCustomEvent>(null);
  const { setSelectedFilter, filteredVideoResult, selectedFilter } = useFilter();
  const { refetch, searchedVideos, setSearchQuery, isLoading, searchQuery } = useSearch(selectedFilter === "all");
  const t = translations[locale as keyof typeof translations] || translations.en;

  const shouldShowSearchResult = !filteredVideoResult?.data || selectedFilter === "all";

  // Show loading state while page is being generated with fallback
  if (router.isFallback) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-nnp-highlight"></div>
      </div>
    );
  }

  // Handle case when video doesn't exist
  if (!currentVideo) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Video not found</h1>
        <button onClick={() => router.push("/")} className="bg-nnp-highlight px-5 py-2 rounded-md font-bold text-black">
          Go back home
        </button>
      </div>
    );
  }

  const videoTitle = videoData?.detail.mediaData?.name || currentVideo.title;
  const videoDescription = videoData?.detail.mediaData?.seoDescription || currentVideo.description;
  const pageTitle = `${videoTitle} | NNP stream`;
  const canonicalUrl = `${SITE_URL}/${locale}/watch/${currentVideo.id}`;
  const ogImageUrl = `${SITE_URL}${currentVideo.cover_url}`;
  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={videoDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={videoTitle} />
        <meta property="og:description" content={videoDescription} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:locale" content={locale} />
        <meta property="og:video" content={`${SITE_URL}/api/embed/${currentVideo.id}`} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={videoTitle} />
        <meta property="twitter:description" content={videoDescription} />
        <meta property="twitter:image" content={ogImageUrl} />

        {/* Video metadata */}
        {currentVideo.duration && <meta property="video:duration" content={currentVideo.duration.toString()} />}

        {/* Structured data for video */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: videoTitle,
            description: videoDescription,
            thumbnailUrl: ogImageUrl,
            uploadDate: currentVideo.created_at || new Date().toISOString(),
            embedUrl: `${SITE_URL}/api/embed/${currentVideo.id}`,
          })}
        </script>
      </Head>
      <SearchBar
        isLoading={isLoading}
        onSearch={refetch}
        onChange={(e) => setTimeout(() => setSearchQuery(e.target.value), 500)}
      />
      <div className="flex max-lg:flex-col gap-5 mt-20 lg:mt-32 mx-3 lg:mx-10">
        <div className="max-lg:w-full w-4/6">
          <WistiaPlayer
            swatch
            key={currentVideo.id}
            className="object-cover"
            qualityControl
            autoplay
            mediaId={currentVideo.wistia_id}
            onLoadedMediaData={(data) => {
              setVideoData(data);
            }}
          />
          <div className="mt-3">
            <div className="flex max-lg:flex-col max-lg:justify-start max-lg:items-start max-lg:gap-2 justify-between items-center">
              <h3 className="text-white font-bold text-sm lg:text-xl md:max-w-80">
                {videoData?.detail.mediaData?.name || currentVideo.title}
              </h3>
              <div className="flex items-center gap-5 max-lg:gap-3">
                <span className="text-white max-lg:text-xs font-medium">
                  {videoData && videoData?.detail.mediaData?.stats.uniquePlayCount > 1
                    ? `${videoData?.detail.mediaData?.stats.uniquePlayCount} ${t.views}`
                    : `${videoData?.detail.mediaData?.stats.uniquePlayCount || 0} ${t.view}`}
                </span>
                <p className="text-white m-0 max-lg:text-xs font-medium">
                  {t.posted} {videoData ? dayjs(videoData?.detail.mediaData.createdAt * 1000).fromNow() : ""}
                </p>
              </div>
            </div>
            <p className="flex items-center gap-4 bg-nnp-primary-dark text-white font-medium rounded-xl p-8 mt-3 max-lg:text-sm max-lg:p-4">
              {videoData?.detail.mediaData.seoDescription || currentVideo.description}
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-x-auto">
          <div className="mb-5 flex w-full overflow-x-auto max-w-full">
            <VideoFilter onSelectFilter={(value) => setSelectedFilter(value)} />
          </div>
          <div className="flex flex-col gap-2 w-full bg-nnp-background/75 p-8 max-lg:p-4 rounded-xl">
            {relatedVideos.map(({ title, cover_url, description, categories, id, duration }, index) => (
              <WatchVideoCard
                key={id}
                onClick={() => router.push(`/watch/${id}`)}
                categories={categories.split(",")}
                videoDescription={description}
                videoCoverUrl={cover_url}
                videoTitle={title}
                duration={duration}
              />
            ))}
          </div>
          {shouldShowSearchResult && !!searchQuery && searchedVideos?.data && searchedVideos.data.length > 0 && (
            <>
              <hr className="my-5" />
              <div className="flex flex-col gap-2">
                <h3 className="text-white font-bold text-xs mb-2">{t.searchResult}</h3>
                {searchedVideos.data.map(({ title, cover_url, description, categories, id, duration }, index) => (
                  <WatchVideoCard
                    key={id}
                    onClick={() => router.push(`/watch/${id}`)}
                    categories={categories.split(",")}
                    videoDescription={description}
                    videoCoverUrl={cover_url}
                    videoTitle={title}
                    duration={duration}
                  />
                ))}
              </div>
            </>
          )}
          {selectedFilter !== "all" && (
            <>
              <div className="flex flex-col gap-2 mt-5">
                <h3 className="text-white font-bold text-xs mb-2">{selectedFilter.toUpperCase()}</h3>
                {filteredVideoResult?.data?.map(({ title, cover_url, description, categories, id, duration }) => (
                  <WatchVideoCard
                    key={id}
                    onClick={() => router.push(`/watch/${id}`)}
                    categories={categories.split(",")}
                    videoDescription={description}
                    videoCoverUrl={cover_url}
                    videoTitle={title}
                    duration={duration}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

WatchPage.getLayout = function (page: ReactElement) {
  return <LayoutWithNavigation>{page}</LayoutWithNavigation>;
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  try {
    //@ts-expect-error
    const supabase = createPagesServerClient(ctx);
    const { data: videos, error } = await supabase.from(Tables.VIDEOS).select("id");

    if (error) {
      console.error("Error fetching video paths:", error);
      return { paths: [], fallback: true };
    }

    // Create paths for both English and French locales
    const paths = videos.flatMap((video) => [
      { params: { videoId: video.id }, locale: "en" },
      { params: { videoId: video.id }, locale: "fr" },
    ]);

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return { paths: [], fallback: true };
  }
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    //@ts-expect-error
    const supabase = createPagesServerClient(ctx);
    const videoId = ctx.params?.videoId as string;
    const locale = ctx.locale || "en";

    if (!videoId) {
      return {
        notFound: true,
      };
    }

    const { data: currentVideo, error: videoError } = await supabase
      .from(Tables.VIDEOS)
      .select("*")
      .eq("id", videoId)
      .single();

    if (videoError || !currentVideo) {
      console.error("Error fetching video:", videoError);
      return {
        notFound: true,
      };
    }

    const { data: relatedVideos, error: relatedError } = await supabase
      .from(Tables.VIDEOS)
      .select("*")
      .neq("id", currentVideo?.id)
      .limit(10);

    if (relatedError) {
      console.error("Error fetching related videos:", relatedError);
    }

    return {
      props: {
        currentVideo,
        relatedVideos: relatedVideos || [],
        locale, // Pass the locale to the component
      },
      revalidate: 1800, // Revalidate every 30 minutes (1800 seconds)
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      notFound: true,
    };
  }
};
