import { useState, useEffect, useCallback } from "react";

export interface UseCarouselResult {
  idx: number;
  next: () => void;
  prev: () => void;
  goTo: (i: number) => void;
}

export const useCarousel = (
  total: number,
  autoPlay: boolean,
  interval: number
): UseCarouselResult => {
  const [idx, setIdx] = useState(0);

  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total]);
  const goTo = useCallback((i: number) => setIdx(i), []);

  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [autoPlay, interval, next, total]);

  return { idx, next, prev, goTo };
};