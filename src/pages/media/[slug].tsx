import { ReactElement } from "react";
import LayoutWithNavigation from "@/components/layouts/LayoutWithNavigation";
import { useRouter } from "next/router";
import PlayIcon from "@/components/icons/PlayIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import Carousel from "@/components/emblaCarousel/Carousel";
import Link from "next/link";
import { LocalStorageKeys } from "@/utils/constant";
import { Tables } from "@/services/supabase";
import { WistiaPlayer } from "@wistia/wistia-player-react";
import { GetServerSidePropsContext } from "next";
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

  const onAddToFavorite = () => {
    const userEmail = localStorage.getItem(LocalStorageKeys.NNP_USER_EMAIL);
    if (!userEmail) {
      router.push("/register");
      return;
    }
  };

  if (!currentVideo) return <></>;
  return (
    <div>
      <div className="relative w-full">
        <div className="fixed inset-0 w-full h-screen">
          <WistiaPlayer
            audioDescriptionControl={false}
            playBarControl={false}
            playPauseControl={false}
            bigPlayButton={false}
            fullscreenControl={false}
            key={router.query.videoId as string}
            className="object-cover max-lg:h-fit"
            mediaId={currentVideo?.wistia_id}
          />
          <div className="absolute bottom-0 z-50 h-full w-full bg-gradient-to-t from-black via-black/90 max-lg:to-black/80" />
        </div>
        <div className="flex justify-center items-end w-full h-[70dvh] lg:h-[66dvh] relative ">
          <div className="flex flex-col relative text-white ml-auto w-full p-5 gap-5 md:w-1/2 lg:w-[45%]">
            <h3 className="text-2xl text-white font-bold">{currentVideo?.title}</h3>
            <div className="flex gap-2">
              {currentVideo?.categories
                .split(",")
                .map((category) => (
                  <div className="text-white w-fit bg-white/10 py-1 px-2 text-[10px] rounded-sm font-semibold uppercase">
                    {category}
                  </div>
                ))}
            </div>
            <p className="w-full lg:w-96 line-clamp-6">{currentVideo?.description}</p>
            <div className="flex gap-2">
              <Link
                href={`/watch/${router.query.slug}`}
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
      <div className="mx-auto w-full lg:w-fit mt-5">
        {/*<VideoCategory categoryName="Podcasts" videos={videos} />*/}
        {relatedVideos?.length > 0 && <Carousel videos={relatedVideos} />}
      </div>
    </div>
  );
}

VideoInfo.getLayout = function (page: ReactElement) {
  return <LayoutWithNavigation>{page}</LayoutWithNavigation>;
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const supabase = createPagesServerClient(ctx);
  const slug = ctx.query.slug as string;
  if (!slug) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const { data: currentVideo } = await supabase
    .from(Tables.VIDEOS)
    .select<any, SavedVideo>("*")
    .eq("id", slug)
    .single();

  if (!currentVideo) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const { data: relatedVideos } = await supabase
    .from(Tables.VIDEOS)
    .select<any, SavedVideo>("*")
    .neq("id", currentVideo?.id);

  return {
    props: {
      currentVideo,
      relatedVideos: !relatedVideos ? [] : relatedVideos,
    },
  };
}
