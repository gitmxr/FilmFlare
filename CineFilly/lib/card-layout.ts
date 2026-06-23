/** Shared layout tokens so carousel slides match grid card widths. */
export const CARD_GRID_CLASS =
  "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4";

export const CARD_SECTION_TITLE_CLASS =
  "border-l-4 border-red-600 pl-4 text-xl font-bold text-white sm:text-2xl lg:text-3xl";

export const CARD_CAROUSEL_BREAKPOINTS = {
  640: { slidesPerView: 3, spaceBetween: 16 },
  768: { slidesPerView: 4, spaceBetween: 16 },
} as const;
