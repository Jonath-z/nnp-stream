import VideoCard from "@/components/cards/VideoCard";
import dataVideos from "@/data/videos";
import { useRouter } from "next/router";

export default function VideoCategory({ categoryName, videos }: { categoryName: string; videos: typeof dataVideos }) {
  const router = useRouter();

  if (videos.length === 0) return <></>;
  return (
    <div className="flex flex-col">
      <h3 className="text-white font-bold pb-3 z-10">{categoryName}</h3>
      <div className="flex items-center gap-1">
        {videos.map((video, index) => {
          return (
            <VideoCard
              onClick={() => router.push(`/media/${index}`)}
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
