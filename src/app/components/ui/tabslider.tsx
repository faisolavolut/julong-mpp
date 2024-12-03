"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

const TabSlider: React.FC<any> = ({ children, className }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    containScroll: "trimSnaps",
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const conItem = useRef<HTMLDivElement>(null);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollNext(emblaApi.canScrollNext());
    setCanScrollPrev(emblaApi.canScrollPrev());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect(); // Initialize state
  }, [emblaApi, onSelect]);
  useEffect(() => {
    if (containerRef.current && conItem.current) {
      const isOverflow =
        conItem.current.scrollWidth > containerRef.current.clientWidth;
      setIsOverflowing(isOverflow);
    }
  }, [conItem, containerRef]);

  return (
    <div className="flex flex-grow flex-row w-full" >
      <div
        className={cx(
          "relative flex flex-row items-center w-full",
          className
        )}ref={containerRef}
      >
        {isOverflowing ? (
          <button
            className="top-0 left-0 px-2 flex flex-row items-center justify-center w-8 h-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            onClick={() => emblaApi && emblaApi.scrollPrev()}
            disabled={!canScrollPrev}
          >
            ❮
          </button>
        ) : (
          <></>
        )}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex flex-row space-x-2" ref={conItem}>
            {children}
          </div>
        </div>
        {isOverflowing ? (
          <button
            className="px-2  top-0 right-0 flex  flex-row items-center justify-center w-8 h-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            onClick={() => emblaApi && emblaApi.scrollNext()}
            disabled={!canScrollNext}
          >
            ❯
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default TabSlider;
