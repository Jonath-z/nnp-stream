import Image from "next/image";

type VideoCardProps = {
  videoCoverUrl: string;
  videoTitle: string;
  videoDescription: string;
  onClick?: () => void;
  showTitles?: boolean;
  showDescription?: boolean;
};

export default function VideoCard({
  videoDescription,
  videoTitle,
  videoCoverUrl,
  onClick,
  showDescription = false,
  showTitles = false,
}: VideoCardProps) {
  return (
    <div onClick={onClick} className="relative w-56 h-32 lg:w-80 lg:h-44.5 cursor-pointer shrink-0">
      <div className="absolute w-full h-full">
        <Image src={videoCoverUrl} alt="" fill className="object-cover" />
      </div>
      <div className="absolute inset-0 h-full w-full bg-black/30 flex flex-col justify-end items-start pl-4 pb-3 lg:pl-7 lg:pb-5">
        {showTitles && <b className="text-white whitespace-pre-wrap">{videoTitle}</b>}
        {showDescription && <p className="text-white font-medium text-xs line-clamp-1">{videoDescription}</p>}
      </div>
    </div>
  );
}
