import { ComponentProps } from "react";
import { cn } from "@/utils/index";
import SearchIcon from "@/components/icons/SearchIcon";

export default function SearchBar(props: ComponentProps<"input">) {
  const { className, ...rest } = props;
  return (
    <div className="fixed w-full top-0 z-20 backdrop-blur">
      <div className="flex items-center gap-2 md:w-1/2 mx-auto mt-10 mb-4">
        <div className="flex items-center md:w-full px-3 gap-2 border border-white rounded-md bg-nnp-primary/55">
          <SearchIcon className="stroke-white" />
          <input
            {...rest}
            className={cn(
              "w-full py-2 focus:ring-0 focus:outline-none text-white bg-transparent placeholder:text-white",
              className,
            )}
            placeholder="Search videos..."
          />
        </div>
        <button className="bg-nnp-highlight text-white py-2 px-5 rounded-md">Search</button>
      </div>
    </div>
  );
}
