import { useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import type { Conversation } from "./types";
import { regenerateSummary } from "./api";

export default function AIInsightCard({
  conversation,
  businessId,
  onUpdated,
}: {
  conversation: Conversation;
  businessId: string;
  onUpdated: (patch: Partial<Conversation>) => void;
}) {
  const [regenerating, setRegenerating] = useState(false);
  const { aiIntent, aiSummary, insightSource } = conversation;

  const handleRegenerate = async () => {
    setRegenerating(true);
    try {
      const result = await regenerateSummary(businessId, conversation.customer.phone);
      onUpdated({
        aiSummary: result.aiSummary,
        aiIntent: result.aiIntent,
        insightSource: "regenerate",
        lead: { ...conversation.lead, status: result.lead.status as Conversation["lead"]["status"], score: result.lead.score, potentialValue: result.lead.potentialValue },
        isLead: result.lead.status === "hot" || result.lead.status === "warm",
      });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to regenerate summary");
    } finally {
      setRegenerating(false);
    }
  };

  return (
    <div className="border-b border-[#2C2C2C] p-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-[#8696A0]">AI Summary</h3>
        {insightSource === "marker" && (
          <span className="rounded-full bg-[#202020] px-1.5 py-0.5 text-[10px] text-[#8696A0]">estimated</span>
        )}
      </div>
      <p className="text-sm leading-snug text-[#E9EDEF]">
        {aiSummary || "No summary yet — send a message or regenerate to get one."}
      </p>
      <button
        onClick={handleRegenerate}
        disabled={regenerating}
        className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#00A884] hover:underline disabled:opacity-50"
      >
        <RefreshCw size={12} className={regenerating ? "animate-spin" : ""} />
        {regenerating ? "Regenerating..." : "Regenerate summary"}
      </button>

      <h3 className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide text-[#8696A0]">AI Detected Intent</h3>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm text-[#E9EDEF]">
          <Sparkles size={13} className="text-[#8FA6E8]" />
          {aiIntent.primary || "Not detected yet"}
        </span>
        <span className="text-xs text-[#8696A0]">{aiIntent.confidence}%</span>
      </div>
      {aiIntent.alternatives.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-1">
          {aiIntent.alternatives.map((alt) => (
            <span key={alt} className="rounded-full bg-[#202020] px-2 py-0.5 text-[11px] text-[#8696A0]">
              {alt}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
