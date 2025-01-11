import { videoCategory } from "@/data/videoCategories";
import { useState } from "react";
import { cn } from "@/utils/index";

export default function VideoFilter({ onSelectFilter }: { onSelectFilter?: (value: string) => void }) {
  const [selectedFilter, setSelectedFilter] = useState("");

  const onFilter = (value: string) => {
    setSelectedFilter(value);
    onSelectFilter?.(value);
  };

  return (
    <div>
      <div className="flex gap-2 items-center w-full overflow-x-auto">
        {videoCategory.map((category) => (
          <button
            onClick={(e) => {
              e.preventDefault();
              onFilter(category);
            }}
            className={cn(
              "text-white bg-white/10 py-1 px-2 text-[10px] rounded-sm font-semibold uppercase shrink-0",
              selectedFilter.includes(category) ? "bg-nnp-highlight" : "",
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
