import { Bot, User, BookOpen } from "lucide-react";
import type { Conversation } from "./types";
import CustomerCard from "./CustomerCard";
import LeadCard from "./LeadCard";
import AIInsightCard from "./AIInsightCard";

interface InsightPanelProps {
  conversation: Conversation;
  businessId: string;
  onUpdated: (patch: Partial<Conversation>) => void;
  onTakeOver: () => void;
  onReturnToAI: () => void;
}

export default function InsightPanel({ conversation, businessId, onUpdated, onTakeOver, onReturnToAI }: InsightPanelProps) {
  return (
    <div className="flex h-full w-[320px] shrink-0 flex-col overflow-y-auto border-l border-[#2C2C2C] bg-[#1A1A1A]">
      <CustomerCard conversation={conversation} businessId={businessId} onUpdated={onUpdated} />
      <LeadCard lead={conversation.lead} />
      <AIInsightCard conversation={conversation} businessId={businessId} onUpdated={onUpdated} />

      <div className="border-b border-[#2C2C2C] p-4">
        <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#8696A0]">
          <BookOpen size={13} /> Knowledge Base
        </h3>
        <p className="text-sm text-[#E9EDEF]">{conversation.knowledgeBase.name}</p>
        {conversation.knowledgeBase.usedSections.length > 0 ? (
          <ul className="mt-1.5 space-y-1">
            {conversation.knowledgeBase.usedSections.map((snippet, i) => (
              <li key={i} className="truncate text-xs text-[#8696A0]" title={snippet}>
                • {snippet}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-1.5 text-xs text-[#8696A0]">No sources used yet.</p>
        )}
      </div>

      <div className="p-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8696A0]">Conversation Control</h3>
        <div className="mb-2 flex items-center gap-1.5 text-sm text-[#E9EDEF]">
          {conversation.mode === "human" ? (
            <>
              <User size={14} className="text-[#8FA6E8]" /> Human Active
            </>
          ) : (
            <>
              <Bot size={14} className="text-[#5FE0C4]" /> AI Active
            </>
          )}
        </div>
        {conversation.mode === "human" ? (
          <button
            onClick={onReturnToAI}
            className="w-full rounded-md border border-[#2C2C2C] py-1.5 text-xs font-medium text-[#E9EDEF] hover:bg-[#202020]"
          >
            Return to AI
          </button>
        ) : (
          <button
            onClick={onTakeOver}
            className="w-full rounded-md bg-[#00A884] py-1.5 text-xs font-medium text-black hover:bg-[#02c99b]"
          >
            Take Over
          </button>
        )}
      </div>
    </div>
  );
}
