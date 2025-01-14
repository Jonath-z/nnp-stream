import { ReactElement, useState } from "react";
import dynamic from "next/dynamic";
import VideoCategory from "@/components/VideoCategory";
import SearchBar from "@/components/SearchBar";
import VideoFilter from "@/components/VideoFilter";
import { Category } from "@/utils/type";
import SearchResult from "@/components/SearchResult";
import useSearch from "@/hooks/useSearch";

const LayoutWithNavigation = dynamic(() => import("@/components/layouts/LayoutWithNavigation"), {
  ssr: false,
});

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const { refetch, searchedVideos, setSearchQuery, isLoading, searchQuery } = useSearch();

  return (
    <div suppressHydrationWarning>
      <div>
        <SearchBar
          isLoading={isLoading}
          onSearch={refetch}
          onChange={(e) => setTimeout(() => setSearchQuery(e.target.value), 500)}
        />
      </div>
      <div className="mt-5 w-full max-w-screen-xl lg:mx-auto space-y-5 lg:space-y-10 px-3">
        <div className="mt-20 lg:mt-32">
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
