import { ReactElement } from "react";
import LayoutWithNavigation from "@/components/layouts/LayoutWithNavigation";
import Image from "next/image";
import videos from "@/data/videos";
import { useRouter } from "next/router";
import VideoCategory from "@/components/VideoCategory";
import PlayIcon from "@/components/icons/PlayIcon";
import HeartIcon from "@/components/icons/HeartIcon";

export default function VideoInfo() {
  const router = useRouter();

  const currentVideo = videos[Number(router.query.slug as string)];
  if (!currentVideo) return <></>;
  return (
    <div>
      <div className="relative w-full">
        <div className="fixed inset-0 w-full h-screen">
          <Image
            src={videos[Number(router.query.slug as string)].coverUrl}
            alt=""
            fill
            className="object-cover animate-zoomIn"
          />
          <div className="absolute bottom-0 z-50 h-full w-full bg-gradient-to-t from-black" />
        </div>
        <div className="flex justify-center items-end w-full h-[80dvh] relative ">
          <div className="flex flex-col relative text-white ml-auto w-full p-5 gap-5 md:w-1/2 lg:w-[45%]">
            <h3 className="text-2xl text-white font-bold">{currentVideo.title}</h3>
            <div className="flex gap-2">
              {currentVideo.categories.map((category) => (
                <div className="text-white w-fit bg-white/10 py-1 px-2 text-[10px] rounded-sm font-semibold uppercase">
                  {category}
                </div>
              ))}
            </div>
            <p>{currentVideo.description}</p>
            <p className="w-96">
              One of the few remaining drone repairmen assigned to Earth, its surface devastated after decades of war
              with the alien Scavs,
            </p>
            <div className="flex gap-2">
              <button className="bg-nnp-highlight px-5 py-2 rounded-md font-bold text-black flex items-center gap-2">
                <span>Watch now</span>
                <PlayIcon className="fill-black size-5" />
              </button>
              <button className="bg-white/10 py-1 px-2 rounded-md">
                <HeartIcon className="fill-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-fit">
        <VideoCategory categoryName="Podcasts" videos={videos} />
      </div>
    </div>
  );
}

VideoInfo.getLayout = function (page: ReactElement) {
  return <LayoutWithNavigation>{page}</LayoutWithNavigation>;
};
