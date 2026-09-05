import { useState } from "react";
import { Paperclip, Smile, Send } from "lucide-react";
import type { ConversationMode } from "./types";

interface ComposerProps {
  mode: ConversationMode;
  businessName: string;
  sending: boolean;
  onSend: (text: string) => void;
  onTakeOver: () => void;
}

export default function Composer({ mode, businessName, sending, onSend, onTakeOver }: ComposerProps) {
  const [text, setText] = useState("");

  if (mode !== "human") {
    return (
      <div className="flex items-center justify-between gap-3 border-t border-[#2C2C2C] bg-[#1A1A1A] px-4 py-3">
        <span className="text-sm text-[#8696A0]">🤖 AI is handling this conversation</span>
        <button
          onClick={onTakeOver}
          className="rounded-md bg-[#00A884] px-3 py-1.5 text-sm font-medium text-black hover:bg-[#02c99b]"
        >
          Take over
        </button>
      </div>
    );
  }

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    onSend(trimmed);
    setText("");
  };

  return (
    <div className="border-t border-[#2C2C2C] bg-[#1A1A1A] px-4 py-3">
      <p className="mb-2 text-xs text-[#8696A0]">You're replying as {businessName}</p>
      <div className="flex items-end gap-2">
        <button className="rounded-md p-2 text-[#8696A0] hover:bg-[#202020]" title="Attach">
          <Paperclip size={18} />
        </button>
        <button className="rounded-md p-2 text-[#8696A0] hover:bg-[#202020]" title="Emoji">
          <Smile size={18} />
        </button>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Type a message..."
          rows={1}
          className="max-h-32 flex-1 resize-none rounded-lg border border-[#2C2C2C] bg-[#111111] px-3 py-2 text-sm text-[#E9EDEF] placeholder:text-[#8696A0] focus:border-[#00A884] focus:outline-none"
        />
        <button
          onClick={handleSend}
          disabled={sending || !text.trim()}
          className="rounded-md bg-[#00A884] p-2 text-black disabled:opacity-40"
          title="Send"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
