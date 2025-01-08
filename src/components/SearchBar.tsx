import { ComponentProps } from "react";
import { cn } from "@/utils/index";
import SearchIcon from "@/components/icons/SearchIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import Image from "next/image";
import Link from "next/link";

export default function SearchBar(props: ComponentProps<"input">) {
  const { className, ...rest } = props;
  return (
    <div className="fixed w-full top-0 z-20 backdrop-blur flex gap-3 px-3 lg:px-0 justify-between items-center">
      <Link href="/" className="max-lg:block hidden size-10  relative">
        <Image src="/images/nnp-minified.png" alt="nnp logo" fill />
      </Link>
      <div className="flex items-center gap-2 w-full md:w-1/2 mx-auto mt-5 lg:mt-10 mb-4">
        <div className="flex items-center w-full md:w-full px-3 gap-2 border border-white rounded-md bg-nnp-primary/55">
          <SearchIcon className="stroke-white" />
          <input
            {...rest}
            className={cn(
              "w-full py-1 lg:py-2 focus:ring-0 focus:outline-none text-white bg-transparent placeholder:text-white",
              className,
            )}
            placeholder="Search videos..."
          />
        </div>
        <button className="bg-nnp-highlight text-white py-2 px-5 rounded-md hidden lg:block">Search</button>
      </div>
      <button>
        <HeartIcon className="size-7 stroke-white max-lg:block hidden" />
      </button>
    </div>
  );
}
