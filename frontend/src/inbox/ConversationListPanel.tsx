import { Search, ChevronDown, Plus, Settings, UserCircle } from "lucide-react";
import type { Conversation, ConversationFilter } from "./types";
import type { Business } from "./api";
import ConversationListItem from "./ConversationListItem";

const FILTERS: { key: ConversationFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "leads", label: "Leads" },
  { key: "ai", label: "AI" },
  { key: "human", label: "Human" },
  { key: "starred", label: "Starred" },
];

interface ConversationListPanelProps {
  businesses: Business[];
  selectedBusinessId: string | null;
  onSelectBusiness: (id: string) => void;
  conversations: Conversation[];
  selectedPhone: string | null;
  onSelectConversation: (phone: string) => void;
  filter: ConversationFilter;
  onFilterChange: (filter: ConversationFilter) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export default function ConversationListPanel({
  businesses,
  selectedBusinessId,
  onSelectBusiness,
  conversations,
  selectedPhone,
  onSelectConversation,
  filter,
  onFilterChange,
  search,
  onSearchChange,
}: ConversationListPanelProps) {
  const selectedBusiness = businesses.find((b) => b.id === selectedBusinessId);

  return (
    <div className="flex h-full w-[360px] shrink-0 flex-col border-r border-[#2C2C2C] bg-[#1A1A1A]">
      <div className="flex items-center justify-between gap-2 border-b border-[#2C2C2C] px-4 py-3">
        <div className="min-w-0">
          <h1 className="text-[15px] font-semibold text-[#E9EDEF]">ReplyMate AI</h1>
          <div className="relative mt-0.5">
            <select
              value={selectedBusinessId || ""}
              onChange={(e) => onSelectBusiness(e.target.value)}
              className="appearance-none truncate bg-transparent pr-4 text-xs text-[#8696A0] focus:outline-none"
            >
              {businesses.map((b) => (
                <option key={b.id} value={b.id} className="bg-[#1A1A1A]">
                  {b.name}
                </option>
              ))}
            </select>
            <ChevronDown size={12} className="pointer-events-none absolute right-0 top-0.5 text-[#8696A0]" />
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            title="New conversation (coming soon)"
            className="cursor-not-allowed rounded-md p-1.5 text-[#8696A0]/50"
          >
            <Plus size={16} />
          </button>
          <button title="Settings (coming soon)" className="cursor-not-allowed rounded-md p-1.5 text-[#8696A0]/50">
            <Settings size={16} />
          </button>
          <button title="Profile (coming soon)" className="cursor-not-allowed rounded-md p-1.5 text-[#8696A0]/50">
            <UserCircle size={16} />
          </button>
        </div>
      </div>

      <div className="border-b border-[#2C2C2C] px-3 py-2">
        <div className="flex items-center gap-2 rounded-md border border-[#2C2C2C] bg-[#111111] px-2.5 py-1.5">
          <Search size={14} className="text-[#8696A0]" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search conversations"
            className="w-full bg-transparent text-sm text-[#E9EDEF] placeholder:text-[#8696A0] focus:outline-none"
          />
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto border-b border-[#2C2C2C] px-3 py-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
              filter === f.key ? "bg-[#00A884]/15 text-[#00A884]" : "text-[#8696A0] hover:bg-[#202020]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <p className="px-4 py-6 text-center text-sm text-[#8696A0]">No conversations found.</p>
        ) : (
          conversations.map((c) => (
            <ConversationListItem
              key={c.id}
              conversation={c}
              active={c.customer.phone === selectedPhone}
              onClick={() => onSelectConversation(c.customer.phone)}
            />
          ))
        )}
      </div>

      {selectedBusiness && (
        <div className="border-t border-[#2C2C2C] px-4 py-2 text-[11px] text-[#8696A0]">
          Connected: {selectedBusiness.whatsapp_number}
        </div>
      )}
    </div>
  );
}
