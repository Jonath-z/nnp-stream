import { ReactElement, useEffect, useState } from "react";
import LayoutWithNavigation from "@/components/layouts/LayoutWithNavigation";
import { useRouter } from "next/router";
import PlayIcon from "@/components/icons/PlayIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import Carousel from "@/components/emblaCarousel/Carousel";
import Link from "next/link";
import { LocalStorageKeys } from "@/utils/constant";
import { Tables } from "@/services/supabase";
import { WistiaPlayer } from "@wistia/wistia-player-react";
import { GetStaticPaths, GetStaticProps } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { SavedVideo } from "@/utils/type";

export default function VideoInfo({
  currentVideo,
  relatedVideos,
}: {
  currentVideo: SavedVideo;
  relatedVideos: SavedVideo[];
}) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in on the client side
    const userEmail = localStorage.getItem(LocalStorageKeys.NNP_USER_EMAIL);
    setIsLoggedIn(!!userEmail);
  }, []);

  const onAddToFavorite = () => {
    if (!isLoggedIn) {
      router.push("/register");
      return;
    }
  };

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
        <Link href="/" className="bg-nnp-highlight px-5 py-2 rounded-md font-bold text-black">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="md:ml-20">
      <div className="relative w-full ">
        <div className="fixed inset-0 w-full h-screen">
          <WistiaPlayer
            audioDescriptionControl={false}
            playBarControl={false}
            playPauseControl={false}
            bigPlayButton={false}
            fullscreenControl={false}
            key={currentVideo.wistia_id}
            className="object-cover max-lg:h-fit"
            mediaId={currentVideo.wistia_id}
          />
          <div className="absolute bottom-0 z-50 h-full w-full bg-gradient-to-t from-black via-black/90 max-lg:to-black/80" />
        </div>
        <div className="flex justify-center items-end w-full h-[70dvh] lg:h-[66dvh] relative md:ml-[6.7rem]">
          <div className="flex flex-col relative text-white mr-auto w-full p-5 gap-5 md:w-1/2 lg:w-[45%]">
            <h3 className="text-2xl md:text-4xl text-white font-bold">{currentVideo.title}</h3>
            <div className="flex gap-2 flex-wrap">
              {currentVideo.categories.split(",").map((category, index) => (
                <div
                  key={index}
                  className="text-white w-fit bg-white/10 py-1 px-2 text-[10px] rounded-sm font-semibold uppercase"
                >
                  {category.trim()}
                </div>
              ))}
            </div>
            <p className="w-full lg:w-96 line-clamp-3">{currentVideo.description}</p>
            <div className="flex gap-2">
              <Link
                href={`/watch/${currentVideo.id}`}
                className="bg-nnp-highlight px-5 py-2 rounded-md font-bold text-black flex items-center gap-2"
              >
                <span>Watch now</span>
                <PlayIcon className="fill-black size-5" />
              </Link>
              <button onClick={onAddToFavorite} className="bg-white/10 py-1 px-2 rounded-md">
                <HeartIcon className="stroke-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-full mt-5">{relatedVideos?.length > 0 && <Carousel videos={relatedVideos} />}</div>
    </div>
  );
}

VideoInfo.getLayout = function (page: ReactElement) {
  return <LayoutWithNavigation>{page}</LayoutWithNavigation>;
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  try {
    // @ts-expect-error
    const supabase = createPagesServerClient(ctx);
    const { data: videos, error } = await supabase.from(Tables.VIDEOS).select("id");

    if (error) {
      console.error("Error fetching video paths:", error);
      return { paths: [], fallback: true };
    }
    const paths = videos.flatMap((video) => [
      { params: { slug: video.id }, locale: "en" },
      { params: { slug: video.id }, locale: "fr" },
    ]);

    return {
      paths,
      fallback: true, // Changed to true for better user experience
    };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return { paths: [], fallback: true };
  }
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  try {
    // @ts-expect-error
    const supabase = createPagesServerClient(ctx);
    const slug = ctx.params?.slug as string;

    const { data: currentVideo, error: videoError } = await supabase
      .from(Tables.VIDEOS)
      .select("*")
      .eq("id", slug)
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
      .neq("id", currentVideo.id)
      .limit(10); // Limit to prevent too many related videos

    if (relatedError) {
      console.error("Error fetching related videos:", relatedError);
    }

    return {
      props: {
        currentVideo,
        relatedVideos: relatedVideos || [],
      },
      revalidate: 3600, // Revalidate every hour (3600 seconds)
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      notFound: true,
    };
  }
};
