import { Bot, AlertTriangle, ArrowLeftRight, Sparkles } from "lucide-react";
import type { SystemEvent } from "./types";

const ICONS: Record<SystemEvent["kind"], typeof Bot> = {
  "intent-detected": Bot,
  "ai-generated": Sparkles,
  "attention-requested": AlertTriangle,
  handoff: ArrowLeftRight,
};

export default function SystemEventCard({ event }: { event: SystemEvent }) {
  const Icon = ICONS[event.kind] || Bot;
  const isAttention = event.kind === "attention-requested";

  return (
    <div className="flex justify-center py-1">
      <div
        className={`flex max-w-[80%] flex-col items-center gap-0.5 rounded-full border px-3 py-1.5 text-center text-xs ${
          isAttention
            ? "border-[#3A2A1A] bg-[#241A10] text-[#E0A030]"
            : "border-[#2C2C2C] bg-[#1A1A1A] text-[#8696A0]"
        }`}
      >
        <span className="flex items-center gap-1.5 font-medium">
          <Icon size={13} />
          {event.title}
        </span>
        {event.detail && <span className="text-[11px] opacity-80">{event.detail}</span>}
        {typeof event.leadScore === "number" && (
          <span className="text-[11px] font-semibold text-[#5FE0C4]">Lead Score: {event.leadScore}/100</span>
        )}
      </div>
    </div>
  );
}
