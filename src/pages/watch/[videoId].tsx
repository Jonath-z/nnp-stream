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

dayjs.extend(relativeTime);
dayjs.extend(duration);

export default function WatchPage() {
  const router = useRouter();
  const [videoData, setVideoData] = useState<WistiaPlayerCustomEvent>(null);

  return (
    <div>
      <SearchBar />
      <div className="flex gap-5 mt-10 mx-10">
        <div className="w-4/6 sticky top-32">
          <WistiaPlayer
            swatch
            key={router.query.videoId as string}
            className="object-cover"
            qualityControl
            mediaId="w8ltk08dbs"
            onLoadedMediaData={(data) => {
              setVideoData(data);
            }}
          />
          <div className="mt-3">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-bold text-xl md:max-w-80">{videoData?.detail.mediaData?.name}</h3>
              <div className="flex items-center gap-5">
                <span className="text-white font-medium">
                  {videoData && videoData?.detail.mediaData?.stats.uniquePlayCount > 1
                    ? `${videoData?.detail.mediaData?.stats.uniquePlayCount} Views`
                    : `${videoData?.detail.mediaData?.stats.uniquePlayCount} View`}
                </span>
                <p className="text-white m-0 font-medium">
                  Posted {dayjs(videoData?.detail.mediaData.createdAt * 1000).fromNow()}
                </p>
              </div>
            </div>
            <p className="flex items-center gap-4 bg-nnp-primary-dark text-white font-medium rounded-xl p-8 mt-3">
              {videoData?.detail.mediaData.seoDescription}
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-x-auto">
          <div className="mb-5 flex overflow-x-auto max-w-full">
            <VideoFilter />
          </div>
          <div className="flex flex-col gap-2 w-full bg-nnp-background/75 p-8 rounded-xl">
            {[...videos].map(({ title, coverUrl, description, categories }, index) => (
              <WatchVideoCard
                key={`video-watch-${index}`}
                onClick={() => router.push(`/watch/${index}`)}
                categories={categories}
                videoDescription={description}
                videoCoverUrl={coverUrl}
                videoTitle={title}
              />
            ))}
          </div>
          <hr className="my-5" />
          <div className="flex flex-col gap-2">
            <h3 className="text-white font-bold text-xs mb-2">You might also like this</h3>
            {[...videos].map(({ title, coverUrl, description, categories }, index) => (
              <WatchVideoCard
                key={`video-watch-${index}`}
                onClick={() => router.push(`/watch/${index}`)}
                categories={categories}
                videoDescription={description}
                videoCoverUrl={coverUrl}
                videoTitle={title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

WatchPage.getLayout = function (page: ReactElement) {
  return <LayoutWithNavigation>{page}</LayoutWithNavigation>;
};
