import { ReactElement } from "react";
import LayoutWithNavigation from "@/components/layouts/LayoutWithNavigation";
import SearchBar from "@/components/SearchBar";
import useSearch from "@/hooks/useSearch";

export default function FavoritePage() {
  const { refetch, searchedVideos, setSearchQuery, isLoading, searchQuery } = useSearch();

  return (
    <div>
      <SearchBar
        isLoading={isLoading}
        onSearch={refetch}
        onChange={(e) => setTimeout(() => setSearchQuery(e.target.value), 500)}
      />
      <div className="mt-32">
        <p className="text-center text-white">No Favorites available</p>
      </div>
    </div>
  );
}

FavoritePage.getLayout = function (page: ReactElement) {
  return <LayoutWithNavigation>{page}</LayoutWithNavigation>;
};
