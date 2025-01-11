import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getVideosByCategory } from "@/services/supabase";
import { Category } from "@/utils/type";

export default function useFilter() {
  const [selectedFilter, setSelectedFilter] = useState<Category>("all");

  const { data: filteredVideoResult, ...rest } = useQuery({
    queryKey: ["queryByFilter", selectedFilter],
    queryFn: () => getVideosByCategory(selectedFilter),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: selectedFilter !== "all",
  });

  return {
    filteredVideoResult,
    setSelectedFilter,
    selectedFilter,
    ...rest,
  };
}
