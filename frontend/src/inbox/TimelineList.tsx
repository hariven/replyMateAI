import { useEffect, useRef } from "react";
import type { TimelineEntry } from "./types";
import MessageBubble from "./MessageBubble";
import SystemEventCard from "./SystemEventCard";

function dateLabel(iso: string): string {
  const date = new Date(iso);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  if (sameDay(date, today)) return "TODAY";
  if (sameDay(date, yesterday)) return "Yesterday";
  return date.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" });
}

function withDateSeparators(entries: TimelineEntry[]): TimelineEntry[] {
  const result: TimelineEntry[] = [];
  let lastLabel: string | null = null;

  for (const entry of entries) {
    const timestamp = entry.type === "message" ? entry.data.timestamp : entry.type === "system-event" ? entry.data.timestamp : null;
    if (timestamp) {
      const label = dateLabel(timestamp);
      if (label !== lastLabel) {
        result.push({ type: "date-separator", id: `sep-${entry.id}`, label });
        lastLabel = label;
      }
    }
    result.push(entry);
  }

  return result;
}

export default function TimelineList({ entries }: { entries: TimelineEntry[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const grouped = withDateSeparators(entries);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [entries.length]);

  return (
    <div className="flex flex-col gap-2 px-4 py-4">
      {grouped.map((entry) => {
        if (entry.type === "date-separator") {
          return (
            <div key={entry.id} className="my-2 flex justify-center">
              <span className="rounded-full bg-[#202020] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-[#8696A0]">
                {entry.label}
              </span>
            </div>
          );
        }
        if (entry.type === "system-event") {
          return <SystemEventCard key={entry.id} event={entry.data} />;
        }
        return <MessageBubble key={entry.id} message={entry.data} />;
      })}
      <div ref={bottomRef} />
    </div>
  );
}
