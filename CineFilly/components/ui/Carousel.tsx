"use client";

import { ReactNode, useId } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import { CARD_CAROUSEL_BREAKPOINTS } from "@/lib/card-layout";
import "swiper/css";
import "swiper/css/navigation";

interface CarouselProps {
  children: ReactNode[];
  ariaLabel: string;
  className?: string;
}

export default function Carousel({
  children,
  ariaLabel,
  className = "",
}: CarouselProps) {
  const id = useId().replace(/:/g, "");
  const prevClass = `swiper-prev-${id}`;
  const nextClass = `swiper-next-${id}`;

  if (children.length === 0) {
    return null;
  }

  const navButtonClass =
    "absolute top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-black/80 px-2.5 py-2 text-sm text-white shadow-md transition hover:bg-red-600 sm:flex";

  return (
    <div className={`relative ${className}`}>
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={16}
        slidesPerView={2}
        navigation={{
          prevEl: `.${prevClass}`,
          nextEl: `.${nextClass}`,
        }}
        breakpoints={CARD_CAROUSEL_BREAKPOINTS}
        a11y={{ enabled: true, containerMessage: ariaLabel }}
      >
        {children.map((child, index) => (
          <SwiperSlide key={index} className="!h-auto">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        type="button"
        aria-label="Previous slide"
        className={`${prevClass} ${navButtonClass} left-0 sm:-left-3`}
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Next slide"
        className={`${nextClass} ${navButtonClass} right-0 sm:-right-3`}
      >
        →
      </button>
    </div>
  );
}
