import { useState } from "react";
import { Tag, Star, Flame, Ban, XCircle } from "lucide-react";
import type { Conversation } from "./types";
import { patchConversation } from "./api";

export default function CustomerCard({
  conversation,
  businessId,
  onUpdated,
}: {
  conversation: Conversation;
  businessId: string;
  onUpdated: (patch: Partial<Conversation>) => void;
}) {
  const { customer } = conversation;
  const [tagInput, setTagInput] = useState("");

  const addTag = async () => {
    const tag = tagInput.trim();
    if (!tag) return;
    const tags = [...customer.tags, tag];
    setTagInput("");
    onUpdated({ customer: { ...customer, tags } });
    try {
      await patchConversation(businessId, customer.phone, { tags });
    } catch {
      onUpdated({ customer });
    }
  };

  const toggleStar = async () => {
    const isStarred = !conversation.isStarred;
    onUpdated({ isStarred });
    try {
      await patchConversation(businessId, customer.phone, { isStarred });
    } catch {
      onUpdated({ isStarred: conversation.isStarred });
    }
  };

  const closeConversation = async () => {
    try {
      const updated = await patchConversation(businessId, customer.phone, { mode: "closed" });
      onUpdated(updated);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to close conversation");
    }
  };

  const markAsLead = async () => {
    try {
      const updated = await patchConversation(businessId, customer.phone, { leadStatus: "hot" });
      onUpdated(updated);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to mark as lead");
    }
  };

  const blockCustomer = async () => {
    onUpdated({ isBlocked: true });
    try {
      await patchConversation(businessId, customer.phone, { isBlocked: true });
    } catch (err) {
      onUpdated({ isBlocked: false });
      alert(err instanceof Error ? err.message : "Failed to block customer");
    }
  };

  return (
    <div className="border-b border-[#2C2C2C] p-4">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8696A0]">Customer</h3>
      {customer.name !== customer.phone && <p className="text-sm font-medium text-[#E9EDEF]">{customer.name}</p>}
      <p className="text-xs text-[#8696A0]">{customer.phone}</p>
      <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
        <span className="text-[#8696A0]">Source</span>
        <span className="text-[#E9EDEF]">{customer.source}</span>
        <span className="text-[#8696A0]">First contacted</span>
        <span className="text-[#E9EDEF]">
          {customer.firstContacted ? new Date(customer.firstContacted).toLocaleDateString() : "—"}
        </span>
      </div>

      {customer.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {customer.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-[#202020] px-2 py-0.5 text-[11px] text-[#8696A0]">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-2 flex items-center gap-1.5">
        <input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTag()}
          placeholder="Add tag"
          className="min-w-0 flex-1 rounded-md border border-[#2C2C2C] bg-[#111111] px-2 py-1 text-xs text-[#E9EDEF] placeholder:text-[#8696A0] focus:border-[#00A884] focus:outline-none"
        />
        <button onClick={addTag} className="rounded-md border border-[#2C2C2C] p-1.5 text-[#8696A0] hover:bg-[#202020]">
          <Tag size={13} />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          onClick={toggleStar}
          className="flex items-center justify-center gap-1.5 rounded-md border border-[#2C2C2C] py-1.5 text-xs text-[#E9EDEF] hover:bg-[#202020]"
        >
          <Star size={13} className={conversation.isStarred ? "fill-[#E0A030] text-[#E0A030]" : ""} />
          {conversation.isStarred ? "Starred" : "Star"}
        </button>
        <button
          onClick={markAsLead}
          disabled={conversation.isLead}
          className="flex items-center justify-center gap-1.5 rounded-md border border-[#2C2C2C] py-1.5 text-xs text-[#E9EDEF] hover:bg-[#202020] disabled:opacity-40"
        >
          <Flame size={13} />
          {conversation.isLead ? "Marked as lead" : "Mark as lead"}
        </button>
        <button
          onClick={closeConversation}
          className="flex items-center justify-center gap-1.5 rounded-md border border-[#2C2C2C] py-1.5 text-xs text-[#E9EDEF] hover:bg-[#202020]"
        >
          <XCircle size={13} />
          Close
        </button>
        <button
          onClick={blockCustomer}
          disabled={conversation.isBlocked}
          className="flex items-center justify-center gap-1.5 rounded-md border border-[#2C2C2C] py-1.5 text-xs text-[#E0703A] hover:bg-[#202020] disabled:opacity-40"
        >
          <Ban size={13} />
          {conversation.isBlocked ? "Blocked" : "Block"}
        </button>
      </div>
    </div>
  );
}
