import { ReactElement, useState } from "react";
import dynamic from "next/dynamic";
import VideoCategory from "@/components/VideoCategory";
import SearchBar from "@/components/SearchBar";
import VideoFilter from "@/components/VideoFilter";
import { Category } from "@/utils/type";
import SearchResult from "@/components/SearchResult";
import useSearch from "@/hooks/useSearch";
import videos from "@/data/videos";
import HomeCarousel from "@/components/HomeCarousel";

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
      <HomeCarousel />
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
        {(selectedFilter === "all" || !selectedFilter) && <VideoCategory categoryName="All Videos" type="all" />}
      </div>
    </div>
  );
}

Home.getLayout = function (page: ReactElement) {
  return <LayoutWithNavigation>{page}</LayoutWithNavigation>;
};
