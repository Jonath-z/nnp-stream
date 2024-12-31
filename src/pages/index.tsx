import { ReactElement, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import videos from "@/data/videos";
import VideoCard from "@/components/cards/VideoCard";
import { useSearchStore } from "@/stores/useSearchStore";

const LayoutWithNavigation = dynamic(() => import("@/components/layouts/LayoutWithNavigation"), {
  ssr: false,
});

export default function Home() {
  const { t } = useTranslation();

  const { searchQuery } = useSearchStore();
  const [filteredVideos, setFilteredVideos] = useState(videos);

  useEffect(() => {
    if (searchQuery) {
      setFilteredVideos(
        videos.filter((video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.description.toLowerCase().includes(searchQuery.toLowerCase()
        )
      )
    );
    } else {
      setFilteredVideos(videos);
    }
  }, [searchQuery]);

  return (
    <div suppressHydrationWarning>
      <div className="flex items-center gap-1">
        {filteredVideos.map((video, index) => {
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
        {filteredVideos.map((video, index) => {
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
        {filteredVideos.map((video, index) => {
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
        {filteredVideos.map((video, index) => {
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

