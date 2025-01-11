import { ReactElement, useState } from "react";
import dynamic from "next/dynamic";
import videos from "@/data/videos";
import VideoCategory from "@/components/VideoCategory";
import SearchBar from "@/components/SearchBar";
import VideoFilter from "@/components/VideoFilter";
import NnpMinifiedLogo from "@/components/icons/NnpMinifiedLogo";
import { useQuery } from "@tanstack/react-query";
import { filterVideos } from "@/services/supabase";
import { Category } from "@/utils/type";

const LayoutWithNavigation = dynamic(() => import("@/components/layouts/LayoutWithNavigation"), {
  ssr: false,
});

export default function Home() {
  // const [filteredVideos, setFilteredVideos] = useState(() => videos);
  const [selectedFilter, setSelectedFilter] = useState("");

  const onSearchQuery = (query: string) => {
    // if (query) {
    //   setFilteredVideos(
    //     videos.filter(
    //       (video) =>
    //         video.title.toLowerCase().includes(query.toLowerCase()) ||
    //         video.description.toLowerCase().includes(query.toLowerCase()),
    //     ),
    //   );
    // } else {
    //   setFilteredVideos(videos);
    // }
  };

  // const { data: filteredVideos } = useQuery({
  //   queryKey: ["filterAndSearch", selectedFilter],
  //   queryFn: () => filterVideos(selectedFilter),
  //   enabled: !!selectedFilter && selectedFilter !== "all",
  // });

  return (
    <div suppressHydrationWarning>
      <div>
        <SearchBar onChange={(e) => setTimeout(() => onSearchQuery(e.target.value), 500)} />
      </div>
      <div className="mt-5 w-full max-w-screen-xl lg:mx-auto space-y-5 lg:space-y-10 px-3">
        <div className="mt-20 lg:mt-32">
          <VideoFilter onSelectFilter={(value) => setSelectedFilter(value)} />
        </div>
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
