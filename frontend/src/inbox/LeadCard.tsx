import { Flame, Thermometer, Snowflake } from "lucide-react";
import type { LeadInfo } from "./types";

const STATUS_STYLE: Record<LeadInfo["status"], { label: string; icon: typeof Flame; className: string }> = {
  hot: { label: "Hot Lead", icon: Flame, className: "text-[#E0703A] bg-[#E0703A]/10" },
  warm: { label: "Warm Lead", icon: Thermometer, className: "text-[#E0A030] bg-[#E0A030]/10" },
  cold: { label: "Cold Lead", icon: Snowflake, className: "text-[#5B8DEF] bg-[#5B8DEF]/10" },
  none: { label: "Not a lead yet", icon: Snowflake, className: "text-[#8696A0] bg-[#202020]" },
};

export default function LeadCard({ lead }: { lead: LeadInfo }) {
  const style = STATUS_STYLE[lead.status];
  const Icon = style.icon;

  return (
    <div className="border-b border-[#2C2C2C] p-4">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8696A0]">Lead Information</h3>
      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${style.className}`}>
        <Icon size={13} />
        {style.label}
      </span>

      <div className="mt-3">
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="text-[#8696A0]">Lead score</span>
          <span className="font-medium text-[#E9EDEF]">{lead.score} / 100</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#202020]">
          <div
            className="h-full rounded-full bg-[#00A884]"
            style={{ width: `${Math.min(100, Math.max(0, lead.score))}%` }}
          />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
        <span className="text-[#8696A0]">Intent</span>
        <span className="text-[#E9EDEF]">{lead.intent || "—"}</span>
        <span className="text-[#8696A0]">Potential value</span>
        <span className="text-[#E9EDEF]">{lead.potentialValue}</span>
      </div>
    </div>
  );
}
