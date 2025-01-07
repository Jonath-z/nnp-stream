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

dayjs.extend(relativeTime);
dayjs.extend(duration);

export default function WatchPage() {
  const router = useRouter();
  const [videoData, setVideoData] = useState<WistiaPlayerCustomEvent>(null);

  return (
    <div>
      <SearchBar />
      <div className="flex gap-5 mt-10 ml-10">
        <div className="w-4/6">
          <WistiaPlayer
            className="object-cover"
            qualityControl
            mediaId="w8ltk08dbs"
            onLoadedMediaData={(data) => {
              setVideoData(data);
            }}
          />
          <div className="mt-3">
            <h3 className="text-white font-bold text-xl">{videoData?.detail.mediaData?.name}</h3>
            <div className="flex items-center gap-4 bg-nnp-primary rounded-sm p-2 mt-2">
              <p className="flex items-center gap-1">
                <span className="text-white text-xs font-semibold">
                  {videoData?.detail.mediaData?.stats.uniqueLoadCount}{" "}
                </span>
                <span className="text-white text-xs font-semibold">
                  {videoData && videoData?.detail.mediaData?.stats.uniqueLoadCount > 1 ? "Views" : "View"}
                </span>
              </p>
              <p className="text-white m-0 text-xs font-semibold">
                Posted {dayjs(videoData?.detail.mediaData.createdAt * 1000).fromNow()}
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-5">
            <VideoFilter />
          </div>
          <div className="flex-1 flex flex-col gap-2 w-full">
            {[...videos, ...videos].map(({ title, coverUrl, description, categories }, index) => (
              <div className="flex w-full gap-3">
                <div key={`related-video-watch-${index}`} className="relative w-48 h-28 rounded-md cursor-pointer">
                  <div className="absolute w-full h-full">
                    <Image src={coverUrl} alt="" fill className="object-cover rounded-md" />
                  </div>
                </div>
                <div className="flex flex-col justify-end items-start">
                  <b className="text-white whitespace-pre-wrap">{title}</b>
                  <p className="text-white font-medium text-xs">{description}</p>
                </div>
              </div>
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
