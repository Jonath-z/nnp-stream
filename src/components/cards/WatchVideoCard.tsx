import Image from "next/image";

type WatchVideoCardProps = {
  videoCoverUrl: string;
  videoTitle: string;
  videoDescription: string;
  onClick?: () => void;
  categories: string[];
  duration: string;
};

export default function WatchVideoCard(props: WatchVideoCardProps) {
  const { videoCoverUrl, duration, videoTitle, onClick, categories } = props;
  return (
    <div className="flex w-full gap-3" onClick={onClick}>
      <div className="relative w-32 h-20 rounded-md cursor-pointer">
        <div className="absolute w-full h-full">
          <Image src={videoCoverUrl} alt="" fill className="object-cover rounded-md" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-start gap-0.5">
        <b className="text-white text-xs whitespace-pre-wrap">{videoTitle}</b>
        <small className="text-nnp-muted text-[10px]">{categories.join(" & ")}</small>
        <small className="text-nnp-light-gray font-medium text-xs">{duration}</small>
      </div>
    </div>
  );
}
