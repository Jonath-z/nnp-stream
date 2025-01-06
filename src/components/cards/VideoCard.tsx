import Image from "next/image";

type VideoCardProps = {
  videoCoverUrl: string;
  videoTitle: string;
  videoDescription: string;
  onClick?: () => void;
};

export default function VideoCard({ videoDescription, videoTitle, videoCoverUrl, onClick }: VideoCardProps) {
  return (
    <div onClick={onClick} className="relative w-80 h-44.5 cursor-pointer">
      <div className="absolute w-full h-full">
        <Image src={videoCoverUrl} alt="" fill className="object-cover" />
      </div>
      <div className="absolute inset-0 h-full w-full bg-black/30 flex flex-col justify-end items-start pl-7 pb-5">
        <b className="text-white whitespace-pre-wrap">{videoTitle}</b>
        <p className="text-white font-medium text-xs">{videoDescription}</p>
      </div>
    </div>
  );
}
