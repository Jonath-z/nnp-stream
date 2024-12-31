import { ReactElement } from "react";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import videos from "@/data/videos";
import VideoCard from "@/components/cards/VideoCard";

const LayoutWithNavigation = dynamic(() => import("@/components/layouts/LayoutWithNavigation"), {
  ssr: false,
});

export default function Home() {
  const { t } = useTranslation();

  return (
    <div suppressHydrationWarning>
      <div className="flex items-center gap-1">
        {videos.map((video, index) => {
          return (
            <VideoCard
              key={`${index}-video`}
              videoCoverUrl={video.coverUrl}
              videoTitle={video.title}
              videoDescription={video.description}
            />
          );
        })}
      </div>

      <h3 className="text-white font-bold mt-10 pb-3">Coming Soon</h3>
      <div className="flex items-center gap-1">
        {videos.map((video, index) => {
          return (
            <VideoCard
              key={`${index}-video`}
              videoCoverUrl={video.coverUrl}
              videoTitle={video.title}
              videoDescription={video.description}
            />
          );
        })}
      </div>

      <h3 className="text-white font-bold mt-10 pb-3">Podcasts</h3>
      <div className="flex items-center gap-1">
        {videos.map((video, index) => {
          return (
            <VideoCard
              key={`${index}-video`}
              videoCoverUrl={video.coverUrl}
              videoTitle={video.title}
              videoDescription={video.description}
            />
          );
        })}
      </div>

      <h3 className="text-white font-bold mt-10 pb-3">Film</h3>
      <div className="flex items-center gap-1">
        {videos.map((video, index) => {
          return (
            <VideoCard
              key={`${index}-video`}
              videoCoverUrl={video.coverUrl}
              videoTitle={video.title}
              videoDescription={video.description}
            />
          );
        })}
      </div>
    </div>
  );
}

Home.getLayout = function (page: ReactElement) {
  return <LayoutWithNavigation>{page}</LayoutWithNavigation>;
};


