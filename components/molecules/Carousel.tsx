"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CarouselSlide } from "@/utils/types";

interface CarouselProps {
  slides: CarouselSlide[];
  height?: string;
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  overlay?: boolean;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
}

const ROUNDED_MAP = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
};

const Carousel = ({
  slides = [],
  height = "h-[600px]",
  autoPlay = false,
  interval = 5000,
  showArrows = false,
  showDots = false,
  overlay = false,
  rounded = "2xl",
}: CarouselProps) => {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, next, total]);

  if (!slides.length) return null;

  return (
    <div className={`relative w-full overflow-hidden ${ROUNDED_MAP[rounded]} ${height}`}>
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {slide.image && (
            <Image
              src={slide.image}
              alt={slide.title || ""}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />
          )}
          {/* Overlay scuro opzionale */}
          {overlay && (
            <div className="absolute inset-0 bg-black/40 z-10" />
          )}
          {/* Contenuto testuale */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-6 text-center">
            {slide.badge && (
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {slide.badge}
              </span>
            )}
            {slide.title && (
              <h2 className="text-3xl sm:text-5xl font-bold mb-3 drop-shadow-lg">
                {slide.title}
              </h2>
            )}
            {slide.subtitle && (
              <p className="text-lg sm:text-xl max-w-xl mb-6 drop-shadow-md">
                {slide.subtitle}
              </p>
            )}
            {slide.cta && (
              <Link
                href={slide.cta.href}
                className="inline-block bg-white text-gray-900 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors"
              >
                {slide.cta.label}
              </Link>
            )}
          </div>
        </div>
      ))}

      {/* Frecce di navigazione */}
      {showArrows && total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white flex items-center justify-center transition-colors"
            aria-label="Slide precedente"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white flex items-center justify-center transition-colors"
            aria-label="Slide successiva"
          >
            ›
          </button>
        </>
      )}

      {/* Pallini indicatori */}
      {showDots && total > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === current
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Vai alla slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;