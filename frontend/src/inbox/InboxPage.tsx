import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import NavigationRail from "./NavigationRail";
import ConversationListPanel from "./ConversationListPanel";
import ThreadPanel from "./ThreadPanel";
import InsightPanel from "./InsightPanel";
import { listBusinesses, takeoverConversation, returnToAI } from "./api";
import type { Business } from "./api";
import { useConversationsPoll } from "./useConversationsPoll";
import { useThreadPoll } from "./useThreadPoll";
import type { Conversation, ConversationFilter } from "./types";

export default function InboxPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
  const [filter, setFilter] = useState<ConversationFilter>("all");
  const [search, setSearch] = useState("");
  const [insightPanelOpen, setInsightPanelOpen] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    listBusinesses()
      .then((data) => {
        setBusinesses(data);
        if (data.length > 0) setSelectedBusinessId(data[0].id);
      })
      .catch((err) => {
        if (err instanceof Error && err.message === "Unauthorized") return;
        setLoadError(err instanceof Error ? err.message : "Failed to load businesses");
      });
  }, []);

  const { conversations } = useConversationsPoll(selectedBusinessId, filter, search);
  const { conversation, setConversation, refetch } = useThreadPoll(selectedBusinessId, selectedPhone);

  const handleSelectBusiness = (id: string) => {
    setSelectedBusinessId(id);
    setSelectedPhone(null);
  };

  const patchLocalConversation = (patch: Partial<Conversation>) => {
    setConversation((prev) => (prev ? { ...prev, ...patch } : prev));
  };

  const handleTakeOver = async () => {
    if (!selectedBusinessId || !selectedPhone) return;
    const previousMode = conversation?.mode;
    patchLocalConversation({ mode: "human" });
    try {
      await takeoverConversation(selectedBusinessId, selectedPhone);
      refetch();
    } catch (err) {
      patchLocalConversation({ mode: previousMode });
      alert(err instanceof Error ? err.message : "Failed to take over conversation");
    }
  };

  const handleReturnToAI = async () => {
    if (!selectedBusinessId || !selectedPhone) return;
    const previousMode = conversation?.mode;
    patchLocalConversation({ mode: "ai" });
    try {
      await returnToAI(selectedBusinessId, selectedPhone);
      refetch();
    } catch (err) {
      patchLocalConversation({ mode: previousMode });
      alert(err instanceof Error ? err.message : "Failed to return conversation to AI");
    }
  };

  const selectedBusiness = businesses.find((b) => b.id === selectedBusinessId);

  if (loadError) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#111111] text-[#8696A0]">
        {loadError}
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#111111] text-[#E9EDEF]">
      <NavigationRail />
      <ConversationListPanel
        businesses={businesses}
        selectedBusinessId={selectedBusinessId}
        onSelectBusiness={handleSelectBusiness}
        conversations={conversations}
        selectedPhone={selectedPhone}
        onSelectConversation={setSelectedPhone}
        filter={filter}
        onFilterChange={setFilter}
        search={search}
        onSearchChange={setSearch}
      />

      {conversation ? (
        <>
          <ThreadPanel
            conversation={conversation}
            businessId={selectedBusinessId!}
            businessName={selectedBusiness?.name || "your business"}
            insightPanelOpen={insightPanelOpen}
            onToggleInsightPanel={() => setInsightPanelOpen((v) => !v)}
            onTakeOver={handleTakeOver}
            onReturnToAI={handleReturnToAI}
            onRefetch={refetch}
          />
          {insightPanelOpen && (
            <InsightPanel
              conversation={conversation}
              businessId={selectedBusinessId!}
              onUpdated={patchLocalConversation}
              onTakeOver={handleTakeOver}
              onReturnToAI={handleReturnToAI}
            />
          )}
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-[#8696A0]">
          <MessageSquare size={40} />
          <p className="text-sm">Select a conversation to get started</p>
        </div>
      )}
    </div>
  );
}
