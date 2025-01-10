import { ReactElement, useState } from "react";
import LayoutWithNavigation from "@/components/layouts/LayoutWithNavigation";
import { WistiaPlayer } from "@wistia/wistia-player-react";
import videos from "@/data/videos";
import { useRouter } from "next/router";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import VideoFilter from "@/components/VideoFilter";
// @ts-ignore
import { WistiaPlayerCustomEvent } from "@wistia/wistia-player-react/dist/cjs/types/types/index";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import WatchVideoCard from "@/components/cards/WatchVideoCard";
import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { Tables } from "@/services/supabase";
import { SavedVideo } from "@/utils/type";

dayjs.extend(relativeTime);
dayjs.extend(duration);

export default function WatchPage({
  currentVideo,
  relatedVideos,
}: {
  currentVideo: SavedVideo;
  relatedVideos: SavedVideo[];
}) {
  const router = useRouter();
  const [videoData, setVideoData] = useState<WistiaPlayerCustomEvent>(null);

  return (
    <div>
      <SearchBar />
      <div className="flex max-lg:flex-col gap-5 mt-20 lg:mt-32 mx-3 lg:mx-10">
        <div className="max-lg:w-full w-4/6">
          <WistiaPlayer
            swatch
            key={currentVideo.id}
            className="object-cover"
            qualityControl
            mediaId={currentVideo.wistia_id}
            onLoadedMediaData={(data) => {
              setVideoData(data);
            }}
          />
          <div className="mt-3">
            <div className="flex max-lg:flex-col max-lg:justify-start max-lg:items-start max-lg:gap-2 justify-between items-center">
              <h3 className="text-white font-bold text-sm lg:text-xl md:max-w-80">
                {videoData?.detail.mediaData?.name}
              </h3>
              <div className="flex items-center gap-5 max-lg:gap-3">
                <span className="text-white max-lg:text-xs font-medium">
                  {videoData && videoData?.detail.mediaData?.stats.uniquePlayCount > 1
                    ? `${videoData?.detail.mediaData?.stats.uniquePlayCount} Views`
                    : `${videoData?.detail.mediaData?.stats.uniquePlayCount} View`}
                </span>
                <p className="text-white m-0 max-lg:text-xs font-medium">
                  Posted {dayjs(videoData?.detail.mediaData.createdAt * 1000).fromNow()}
                </p>
              </div>
            </div>
            <p className="flex items-center gap-4 bg-nnp-primary-dark text-white font-medium rounded-xl p-8 mt-3 max-lg:text-sm max-lg:p-4">
              {videoData?.detail.mediaData.seoDescription}
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-x-auto">
          <div className="mb-5 flex w-full overflow-x-auto max-w-full">
            <VideoFilter />
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
          {/*<hr className="my-5" />*/}
          {/*<div className="flex flex-col gap-2">*/}
          {/*  <h3 className="text-white font-bold text-xs mb-2">You might also like this</h3>*/}
          {/*  {[...videos].map(({ title, coverUrl, description, categories }, index) => (*/}
          {/*    <WatchVideoCard*/}
          {/*      key={`video-watch-${index}`}*/}
          {/*      onClick={() => router.push(`/watch/${index}`)}*/}
          {/*      categories={categories}*/}
          {/*      videoDescription={description}*/}
          {/*      videoCoverUrl={coverUrl}*/}
          {/*      videoTitle={title}*/}
          {/*    />*/}
          {/*  ))}*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
}

WatchPage.getLayout = function (page: ReactElement) {
  return <LayoutWithNavigation>{page}</LayoutWithNavigation>;
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const supabase = createPagesServerClient(ctx);
  const videoId = ctx.query.videoId as string;
  console.log({ query: ctx.query });
  if (!videoId) {
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
    .eq("id", videoId)
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
