import { ReactElement, useState } from "react";
import dynamic from "next/dynamic";
import VideoCategory from "@/components/VideoCategory";
import SearchBar from "@/components/SearchBar";
import VideoFilter from "@/components/VideoFilter";
import { Category } from "@/utils/type";
import SearchResult from "@/components/SearchResult";
import useSearch from "@/hooks/useSearch";
import Image from "next/image";
import videos from "@/data/videos";
import Link from "next/link";
import PlayIcon from "@/components/icons/PlayIcon";
import HeartIcon from "@/components/icons/HeartIcon";

const LayoutWithNavigation = dynamic(() => import("@/components/layouts/LayoutWithNavigation"), {
  ssr: false,
});

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const { refetch, searchedVideos, setSearchQuery, isLoading, searchQuery } = useSearch();

  const currentVideo = videos[0];
  return (
    <div suppressHydrationWarning className="relative">
      <div>
        <SearchBar
          isLoading={isLoading}
          onSearch={refetch}
          onChange={(e) => setTimeout(() => setSearchQuery(e.target.value), 500)}
        />
      </div>

      <div className="relative h-[700px] inset-0 flex flex-col justify-end items-end">
        <Image src="/images/ilda-amani-podcast.jpg" fill alt="" className="object-cover" />
        <div className="flex justify-center items-end w-full max-w-screen-xl lg:mx-auto relative mb-16 px-3 z-20">
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
                href={`/watch/${currentVideo.coverUrl}`}
                className="bg-nnp-highlight px-5 py-2 rounded-md font-bold text-black flex items-center gap-2"
              >
                <span>Watch now</span>
                <PlayIcon className="fill-black size-5" />
              </Link>
              <button onClick={() => null} className="bg-white/10 py-1 px-2 rounded-md">
                <HeartIcon className="stroke-white" />
              </button>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-t via-nnp-primary/90 from-nnp-primary to-transparent absolute left-0 right-0 bottom-0 w-full h-5/6 z-10" />
      </div>
      <div className="relative w-full flex flex-col max-w-screen-xl lg:mx-auto space-y-5 lg:space-y-10 px-3 ">
        <div className="">
          <VideoFilter onSelectFilter={(value) => setSelectedFilter(value)} />
        </div>
        {searchQuery && searchedVideos?.data && searchedVideos.data.length > 0 && (
          <SearchResult videos={searchedVideos.data} isLoading={isLoading} />
        )}
        {!!selectedFilter && selectedFilter !== "all" && (
          <VideoCategory type={selectedFilter as Category} key={selectedFilter} categoryName="Results" />
        )}
        {(selectedFilter === "all" || !selectedFilter) && <VideoCategory categoryName="Podcasts" type="podcast" />}
      </div>
    </div>
  );
}

Home.getLayout = function (page: ReactElement) {
  return <LayoutWithNavigation>{page}</LayoutWithNavigation>;
};
