import { useState, useEffect, useRef } from "react";


export const useCountUp = (
  target: number,
  duration: number,
  animate: boolean
): { val: number; ref: React.RefObject<HTMLDivElement | null> } => {
  const [val, setVal] = useState<number>(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef<boolean>(false);

  useEffect(() => {
    if (!animate || typeof target !== "number") {
      // avoid synchronous setState inside effect (causes cascading renders)
      const id = window.setTimeout(() => setVal(target), 0);
      return () => window.clearTimeout(id);
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start: number | null = null;
          const step = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setVal(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration, animate]);

  return { val, ref };
}