import { getVideosByCategory } from "@/services/supabase";
import { useQuery } from "@tanstack/react-query";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { useState } from "react";
import { SavedVideo } from "@/utils/type";
import Link from "next/link";
import PlayIcon from "./icons/PlayIcon";
import HeartIcon from "./icons/HeartIcon";
import { WistiaPlayer } from "@wistia/wistia-player-react";

export default function HomeCarousel() {
  const [currentVideo, setCurrentVideo] = useState<SavedVideo | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ["getTrendingVideo"],
    queryFn: () => getVideosByCategory("podcast"),
    refetchOnWindowFocus: false,
    retry: false,
  });

  return (
    <div className="mb-10">
      <Carousel
        className="relative h-[700px] inset-0 flex flex-col justify-end items-end group"
        onChange={(index) => setCurrentVideo(data?.data?.[index] || data?.data?.[0])}
      >
        {data?.data?.map((video) => (
          <div key={video.id} className="relative group-hover:h-[unset] w-full flex flex-col">
            <WistiaPlayer
              audioDescriptionControl={false}
              playBarControl={false}
              playPauseControl={false}
              bigPlayButton={false}
              fullscreenControl={false}
              key={video.id as string}
              className="object-cover h-full"
              mediaId={video?.wistia_id}
            />
            <div className="bg-gradient-to-t via-nnp-primary from-nnp-primary to-transparent absolute left-0 right-0 bottom-0 w-full h-5/6 z-10" />
          </div>
        ))}
      </Carousel>
      {currentVideo && (
        <div className="flex justify-center items-end w-full max-w-screen-xl lg:mx-auto relative px-3 -mt-72">
          <div className="flex flex-col relative text-white mr-auto w-full max-md:px-3 gap-5 md:w-1/2 lg:w-[45%]">
            <h3 className="text-2xl md:text-4xl text-white font-bold">{currentVideo?.title}</h3>
            <div className="flex gap-2">
              {currentVideo?.categories
                .split(",")
                .map((category) => (
                  <div className="text-white w-fit bg-white/10 py-1 px-2 text-[10px] rounded-sm font-semibold uppercase">
                    {category}
                  </div>
                ))}
            </div>
            <p className="w-full lg:w-96 line-clamp-3">{currentVideo?.description}</p>
            <div className="flex gap-2">
              <Link
                href={`/watch/${currentVideo?.id}`}
                className="bg-nnp-highlight px-5 py-2 rounded-md font-bold text-black flex items-center gap-2"
              >
                <span>Watch now</span>
                <PlayIcon className="fill-black size-5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
