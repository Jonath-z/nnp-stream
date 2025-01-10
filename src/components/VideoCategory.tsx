import VideoCard from "@/components/cards/VideoCard";
import { useRouter } from "next/router";
import { Category } from "@/utils/type";
import { useQuery } from "@tanstack/react-query";
import { getVideosByCategory } from "@/services/supabase";

export default function VideoCategory({
  categoryName,
  type,
  showTitles = false,
  showDescription = false,
}: {
  type: Category;
  categoryName: string;
  showTitles?: boolean;
  showDescription?: boolean;
}) {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["getVideoByCategory", categoryName],
    queryFn: () => getVideosByCategory(type),
    _optimisticResults: "optimistic",
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <h3 className="text-white font-bold pb-3 z-10">{categoryName}</h3>
        <div className="flex overflow-x-scroll w-full scrollbar-hide items-center gap-1">
          {Array.from({ length: 4 }).map((_, index) => {
            return (
              <VideoCard onClick={() => null} key={index} videoCoverUrl={""} videoTitle={""} videoDescription={""} />
            );
          })}
        </div>
      </div>
    );
  }

  if (data?.data && data?.data.length === 0) return <></>;
  return (
    <div className="flex flex-col">
      <h3 className="text-white font-bold pb-3 z-10">{categoryName}</h3>
      <div className="flex overflow-x-scroll w-full scrollbar-hide items-center gap-1">
        {data?.data?.map((video, index) => {
          return (
            <VideoCard
              onClick={() => router.push(`/media/${video.id}`)}
              key={video.id}
              showDescription={showDescription}
              showTitles={showTitles}
              videoCoverUrl={video.cover_url}
              videoTitle={video.title}
              videoDescription={video.description}
            />
          );
        })}
      </div>
    </div>
  );
}
