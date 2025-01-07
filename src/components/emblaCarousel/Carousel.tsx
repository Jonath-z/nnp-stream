import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import { PrevButton, NextButton, usePrevNextButtons } from "./CarouselButtons";
import useEmblaCarousel from "embla-carousel-react";
import Videos from "@/data/videos";
import VideoCard from "@/components/cards/VideoCard";
import { useRouter } from "next/router";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

type PropType = {
  videos: typeof Videos;
  options?: EmblaOptionsType;
};

export default function Carousel(props: PropType) {
  const { videos, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [WheelGesturesPlugin()]);
  const router = useRouter();

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla w-full md:max-w-[40rem] xl:max-w-[80rem] lg:max-w-[50rem] h-full relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {videos.map((video, index) => {
            return (
              <div key={`${index}-video`} className="embla__slide">
                <VideoCard
                  onClick={() => router.push(`/media/${index}`)}
                  videoCoverUrl={video.coverUrl}
                  videoTitle={video.title}
                  videoDescription={video.description}
                />
              </div>
            );
          })}
        </div>
      </div>

      <PrevButton
        className="absolute size-8 text-white -left-0 disabled:opacity-10 bg-black/70 top-1/2 border-t border-r border-b border-white/60 flex items-center justify-center rounded-r-md"
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
      />
      <NextButton
        className="absolute text-white disabled:opacity-10 bg-black/70 right-0 size-7 top-1/2 border-t border-l border-b border-white/60 flex items-center justify-center rounded-l-md"
        onClick={onNextButtonClick}
        disabled={nextBtnDisabled}
      />
    </section>
  );
}
