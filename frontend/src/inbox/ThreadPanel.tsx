import { useState } from "react";
import { Bot, User, AlertTriangle, MoreVertical, PanelRightClose, PanelRightOpen } from "lucide-react";
import type { Conversation } from "./types";
import { initialsFor, colorFor } from "./avatar";
import TimelineList from "./TimelineList";
import Composer from "./Composer";
import { sendReply } from "./api";

const MODE_INFO: Record<Conversation["mode"], { label: string; icon: typeof Bot; className: string }> = {
  ai: { label: "AI is handling this conversation", icon: Bot, className: "text-[#5FE0C4]" },
  human: { label: "You are handling this conversation", icon: User, className: "text-[#8FA6E8]" },
  waiting: { label: "Needs Attention", icon: AlertTriangle, className: "text-[#E0A030]" },
  closed: { label: "Conversation closed", icon: Bot, className: "text-[#8696A0]" },
};

interface ThreadPanelProps {
  conversation: Conversation;
  businessId: string;
  businessName: string;
  insightPanelOpen: boolean;
  onToggleInsightPanel: () => void;
  onTakeOver: () => void;
  onReturnToAI: () => void;
  onRefetch: () => void;
}

export default function ThreadPanel({
  conversation,
  businessId,
  businessName,
  insightPanelOpen,
  onToggleInsightPanel,
  onTakeOver,
  onReturnToAI,
  onRefetch,
}: ThreadPanelProps) {
  const [sending, setSending] = useState(false);
  const { customer } = conversation;
  const modeInfo = MODE_INFO[conversation.mode];
  const ModeIcon = modeInfo.icon;

  const handleSend = async (text: string) => {
    setSending(true);
    try {
      await sendReply(businessId, customer.phone, text);
      onRefetch();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex h-full min-w-0 flex-1 flex-col bg-[#111111]">
      <div className="flex items-center justify-between gap-3 border-b border-[#2C2C2C] px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-black"
            style={{ backgroundColor: colorFor(customer.name || customer.phone) }}
          >
            {initialsFor(customer.name, customer.phone)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#E9EDEF]">{customer.name}</p>
            <p className="truncate text-xs text-[#8696A0]">{customer.phone}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className={`hidden items-center gap-1.5 text-xs font-medium sm:flex ${modeInfo.className}`}>
            <ModeIcon size={13} />
            {modeInfo.label}
          </span>
          {conversation.mode === "human" ? (
            <button
              onClick={onReturnToAI}
              className="rounded-md border border-[#2C2C2C] px-2.5 py-1 text-xs font-medium text-[#E9EDEF] hover:bg-[#202020]"
            >
              Return to AI
            </button>
          ) : (
            <button
              onClick={onTakeOver}
              className="rounded-md bg-[#00A884] px-2.5 py-1 text-xs font-medium text-black hover:bg-[#02c99b]"
            >
              Take over manually
            </button>
          )}
          <button title="More" className="cursor-not-allowed rounded-md p-1.5 text-[#8696A0]/50">
            <MoreVertical size={16} />
          </button>
          <button
            title={insightPanelOpen ? "Collapse insights" : "Expand insights"}
            onClick={onToggleInsightPanel}
            className="rounded-md p-1.5 text-[#8696A0] hover:bg-[#202020]"
          >
            {insightPanelOpen ? <PanelRightClose size={16} /> : <PanelRightOpen size={16} />}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#0E0E0E]">
        <TimelineList entries={conversation.timeline || []} />
      </div>

      <Composer
        mode={conversation.mode}
        businessName={businessName}
        sending={sending}
        onSend={handleSend}
        onTakeOver={onTakeOver}
      />
    </div>
  );
}
