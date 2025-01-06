import VideoCard from "@/components/cards/VideoCard";
import dataVideos from "@/data/videos";

export default function VideoCategory({ categoryName, videos }: { categoryName: string; videos: typeof dataVideos }) {
  if (videos.length === 0) return <></>;
  return (
    <div>
      <h3 className="text-white font-bold mt-10 pb-3">{categoryName}</h3>
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
