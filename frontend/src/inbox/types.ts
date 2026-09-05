export type SenderType = "customer" | "ai" | "human" | "system";

export type ConversationMode = "ai" | "human" | "waiting" | "closed";

export type LeadStatus = "hot" | "warm" | "cold" | "none";

export type MessageKind =
  | "text"
  | "image"
  | "document"
  | "link"
  | "location"
  | "voice";

export interface RichLinkPreview {
  title: string;
  description: string;
  domain: string;
}

export interface Message {
  id: string;
  sender: SenderType;
  kind: MessageKind;
  text?: string;
  timestamp: string; // ISO
  status?: "sent" | "delivered" | "read";
  imageUrl?: string;
  documentName?: string;
  documentSize?: string;
  linkPreview?: RichLinkPreview;
  locationLabel?: string;
  voiceDuration?: string;
}

export interface SystemEvent {
  id: string;
  kind: "intent-detected" | "ai-generated" | "attention-requested" | "handoff";
  timestamp: string;
  title: string;
  detail?: string;
  leadScore?: number;
}

export type TimelineEntry =
  | { type: "date-separator"; id: string; label: string }
  | { type: "message"; id: string; data: Message }
  | { type: "system-event"; id: string; data: SystemEvent };

export interface KnowledgeBaseSource {
  name: string;
  usedSections: string[];
}

export interface AIIntentInfo {
  primary: string;
  confidence: number;
  alternatives: string[];
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  source: "WhatsApp";
  firstContacted: string;
  tags: string[];
}

export interface LeadInfo {
  status: LeadStatus;
  score: number;
  intent: string;
  potentialValue: string;
}

// 'marker' = cheap heuristic derived opportunistically from the lead-qualification marker.
// 'regenerate' = a real GPT call the owner explicitly triggered. null = no insight yet.
export type InsightSource = "marker" | "regenerate" | null;

export interface Conversation {
  id: string;
  customer: Customer;
  mode: ConversationMode;
  lastMessagePreview: string;
  lastMessageAt: string | null;
  unreadCount: number;
  isLead: boolean;
  isStarred: boolean;
  isBlocked: boolean;
  lead: LeadInfo;
  aiSummary: string;
  aiIntent: AIIntentInfo;
  knowledgeBase: KnowledgeBaseSource;
  insightSource: InsightSource;
  timeline?: TimelineEntry[];
}

export type ConversationFilter =
  | "all"
  | "unread"
  | "leads"
  | "ai"
  | "human"
  | "starred";
