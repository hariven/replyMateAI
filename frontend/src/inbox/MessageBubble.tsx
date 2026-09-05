import { Bot, FileText, MapPin, Mic, Check, CheckCheck } from "lucide-react";
import type { Message } from "./types";

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function MessageContent({ message }: { message: Message }) {
  switch (message.kind) {
    case "image":
      return (
        <div className="space-y-1">
          <img
            src={message.imageUrl}
            alt={message.text || "Shared image"}
            className="max-w-[260px] rounded-lg border border-[#2C2C2C]"
          />
          {message.text && <p className="text-sm leading-snug">{message.text}</p>}
        </div>
      );
    case "document":
      return (
        <div className="flex items-center gap-3 rounded-lg border border-[#2C2C2C] bg-black/20 px-3 py-2">
          <FileText size={28} className="shrink-0 text-[#8696A0]" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{message.documentName || "Document"}</p>
            {message.documentSize && <p className="text-xs text-[#8696A0]">{message.documentSize}</p>}
          </div>
        </div>
      );
    case "location":
      return (
        <div className="flex items-center gap-2 rounded-lg border border-[#2C2C2C] bg-black/20 px-3 py-2">
          <MapPin size={18} className="shrink-0 text-[#8696A0]" />
          <p className="text-sm">{message.locationLabel || "Shared location"}</p>
        </div>
      );
    case "voice":
      return (
        <div className="flex items-center gap-2 rounded-lg border border-[#2C2C2C] bg-black/20 px-3 py-2">
          <Mic size={18} className="shrink-0 text-[#8696A0]" />
          <p className="text-sm">Voice message · {message.voiceDuration || "0:00"}</p>
        </div>
      );
    case "link":
      return (
        <div className="rounded-lg border border-[#2C2C2C] bg-black/20 p-3">
          <p className="text-sm font-medium">{message.linkPreview?.title}</p>
          <p className="mt-0.5 text-xs text-[#8696A0]">{message.linkPreview?.description}</p>
          <p className="mt-1 text-[11px] uppercase tracking-wide text-[#8696A0]">{message.linkPreview?.domain}</p>
        </div>
      );
    default:
      return <p className="whitespace-pre-wrap text-sm leading-snug">{message.text}</p>;
  }
}

export default function MessageBubble({ message }: { message: Message }) {
  const isCustomer = message.sender === "customer";
  const isAI = message.sender === "ai";
  const isHuman = message.sender === "human";

  return (
    <div className={`flex ${isCustomer ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[70%] rounded-xl px-3 py-2 ${
          isCustomer
            ? "bg-[#202020] text-[#E9EDEF]"
            : isAI
            ? "bg-[#0B4A3F] text-[#E9EDEF]"
            : "bg-[#1F2A44] text-[#E9EDEF]"
        }`}
      >
        {isAI && (
          <div className="mb-1 flex items-center gap-1 text-[11px] font-medium text-[#5FE0C4]">
            <Bot size={12} /> ReplyMate AI
          </div>
        )}
        {isHuman && <div className="mb-1 text-[11px] font-medium text-[#8FA6E8]">You</div>}
        <MessageContent message={message} />
        <div
          className={`mt-1 flex items-center gap-1 text-[10px] ${
            isCustomer ? "text-[#8696A0]" : "text-[#8696A0]/80"
          }`}
        >
          <span>{formatTime(message.timestamp)}</span>
          {!isCustomer &&
            (message.status === "read" ? (
              <CheckCheck size={12} className="text-[#5FE0C4]" />
            ) : message.status === "delivered" ? (
              <CheckCheck size={12} />
            ) : (
              <Check size={12} />
            ))}
        </div>
      </div>
    </div>
  );
}
