import { useState } from "react";

export const useAccordion = (
  defaultOpen: number,
  allowMultiple: boolean
): [Set<number>, (i: number) => void] => {
  const [openSet, setOpenSet] = useState<Set<number>>(
    new Set(defaultOpen >= 0 ? [defaultOpen] : [])
  );

  const toggle = (i: number) => {
    setOpenSet((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  };

  return [openSet, toggle];
};