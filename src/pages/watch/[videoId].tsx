import { ReactElement, useEffect } from "react";
import LayoutWithNavigation from "@/components/layouts/LayoutWithNavigation";
import { WistiaPlayer } from "@wistia/wistia-player-react";
import videos from "@/data/videos";
import VideoCard from "@/components/cards/VideoCard";
import { useRouter } from "next/router";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import VideoFilter from "@/components/VideoFilter";
import { useQuery } from "@tanstack/react-query";
import wistia from "@/services/wistia";

export default function WatchPage() {
  const router = useRouter();

  const { data, error } = useQuery({
    queryKey: ["GetMediadata"],
    queryFn: () => wistia.getMediaMediaData("w8ltk08dbs"),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

  useEffect(() => {
    console.log({ data, error });
  }, [data, error]);

  return (
    <div>
      <SearchBar />
      <div className="flex gap-5 mt-10 ml-10">
        <div className="w-4/6">
          <WistiaPlayer qualityControl mediaId="w8ltk08dbs" />
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
