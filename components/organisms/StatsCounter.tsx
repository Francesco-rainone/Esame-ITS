"use client";
import { useCountUp } from "@/utils/hooks/useCountUp";
import type { StatItem } from "@/utils/types";
import Icon from "@/components/atoms/Icon";


interface StatItemProps {
  stat: StatItem;
  duration: number;
  animate: boolean;
  textDark: boolean;
}

const StatItem = ({ stat, duration, animate, textDark }: StatItemProps) => {
  const numericTarget = typeof stat.value === "number" ? stat.value : 0;
  const { val, ref } = useCountUp(numericTarget, duration, animate);

  const displayVal =
    typeof stat.value === "number"
      ? `${stat.prefix ?? ""}${val.toLocaleString("it-IT")}${stat.suffix ?? ""}`
      : stat.value;

  const numColor = stat.color ?? (textDark ? "text-blue-700" : "text-white");
  const labelColor = textDark ? "text-gray-600" : "text-white/70";

  return (
    <div ref={ref} className="flex flex-col items-center text-center px-6 py-8">
      {stat.icon && (
        <div className="text-4xl mb-3">
          <Icon name={stat.icon} size="2x" />
        </div>
      )}
      <span className={`text-4xl lg:text-5xl font-black tracking-tight tabular-nums ${numColor}`}>
        {displayVal}
      </span>
      <span className={`mt-2 text-sm font-medium leading-snug max-w-[120px] ${labelColor}`}>
        {stat.label}
      </span>
    </div>
  );
}

interface StatsCounterProps {
  stats: StatItem[];
  cols?: 2 | 3 | 4 | null;
  bg?: string;
  textDark?: boolean;
  animate?: boolean;
  duration?: number;
}

const COLS_MAP: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

export default function StatsCounter({
  stats = [],
  cols = null,
  bg = "bg-blue-900",
  textDark = false,
  animate = true,
  duration = 1800,
}: StatsCounterProps) {
  const autoCol = stats.length <= 2 ? 2 : stats.length === 3 ? 3 : 4;
  const colKey = cols ?? autoCol;
  const gridClass = COLS_MAP[colKey] ?? COLS_MAP[4];
  const dividerColor = textDark ? "divide-gray-200" : "divide-white/10";

  return (
    <section className={`w-full ${bg} py-10`}>
      <div className={`max-w-5xl mx-auto grid ${gridClass} divide-x ${dividerColor}`}>
        {stats.map((s, i) => (
          <StatItem key={i} stat={s} duration={duration} animate={animate} textDark={textDark} />
        ))}
      </div>
    </section>
  );
}