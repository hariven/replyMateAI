import { Bot, User, Star, Flame } from "lucide-react";
import type { Conversation } from "./types";
import { initialsFor, colorFor } from "./avatar";

function formatTimestamp(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "now";
  if (diffMin < 60) return `${diffMin}m`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d`;
}

const MODE_BADGE: Record<Conversation["mode"], { label: string; icon: typeof Bot; className: string }> = {
  ai: { label: "AI", icon: Bot, className: "text-[#5FE0C4]" },
  human: { label: "Human", icon: User, className: "text-[#8FA6E8]" },
  waiting: { label: "Needs Attention", icon: Bot, className: "text-[#E0A030]" },
  closed: { label: "Closed", icon: Bot, className: "text-[#8696A0]" },
};

export default function ConversationListItem({
  conversation,
  active,
  onClick,
}: {
  conversation: Conversation;
  active: boolean;
  onClick: () => void;
}) {
  const { customer } = conversation;
  const badge = MODE_BADGE[conversation.mode];
  const BadgeIcon = badge.icon;

  return (
    <button
      onClick={onClick}
      className={`flex w-full items-start gap-3 border-b border-[#2C2C2C]/60 px-3 py-3 text-left transition-colors ${
        active ? "bg-[#202020]" : "hover:bg-[#1F1F1F]"
      }`}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-black"
        style={{ backgroundColor: colorFor(customer.name || customer.phone) }}
      >
        {initialsFor(customer.name, customer.phone)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-medium text-[#E9EDEF]">{customer.name}</span>
          <span className="shrink-0 text-[11px] text-[#8696A0]">{formatTimestamp(conversation.lastMessageAt)}</span>
        </div>
        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p className="truncate text-xs text-[#8696A0]">{conversation.lastMessagePreview || "No messages yet"}</p>
          {conversation.unreadCount > 0 && (
            <span className="flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-[#00A884] px-1 text-[10px] font-semibold text-black">
              {conversation.unreadCount}
            </span>
          )}
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className={`flex items-center gap-1 text-[11px] ${badge.className}`}>
            <BadgeIcon size={11} />
            {badge.label}
          </span>
          {conversation.isStarred && <Star size={11} className="fill-[#E0A030] text-[#E0A030]" />}
          {conversation.isLead && (
            <span className="flex items-center gap-0.5 text-[11px] text-[#E0703A]">
              <Flame size={11} /> Lead
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
