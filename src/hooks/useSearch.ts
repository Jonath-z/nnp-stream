import { useQuery } from "@tanstack/react-query";
import { searchVideos } from "@/services/supabase";
import { useState } from "react";

export default function useSearch(enabled = true) {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: searchedVideos, ...rest } = useQuery({
    queryKey: ["filterAndSearch", searchQuery],
    queryFn: () => searchVideos(searchQuery),
    enabled: !!searchQuery && enabled,
    _optimisticResults: "optimistic",
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    staleTime: Infinity,
  });

  return {
    searchQuery,
    searchedVideos,
    setSearchQuery,
    ...rest,
  };
}
