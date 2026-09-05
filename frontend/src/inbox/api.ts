import type { Conversation, ConversationFilter } from "./types";

const API_BASE =
  import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL !== ""
    ? import.meta.env.VITE_API_URL
    : "/api";

function authHeaders(): HeadersInit {
  return { Authorization: `Bearer ${localStorage.getItem("token")}` };
}

async function handle<T>(res: Response): Promise<T> {
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export interface Business {
  id: string;
  name: string;
  whatsapp_number: string;
}

export async function listBusinesses(): Promise<Business[]> {
  const res = await fetch(`${API_BASE}/businesses`, { headers: authHeaders() });
  return handle<Business[]>(res);
}

export async function listConversations(
  businessId: string,
  filter: ConversationFilter,
  search: string
): Promise<Conversation[]> {
  const params = new URLSearchParams({ businessId, filter });
  if (search) params.set("search", search);
  const res = await fetch(`${API_BASE}/conversations?${params.toString()}`, {
    headers: authHeaders(),
  });
  return handle<Conversation[]>(res);
}

export async function getConversation(businessId: string, phone: string): Promise<Conversation> {
  const res = await fetch(
    `${API_BASE}/conversations/${encodeURIComponent(businessId)}/${encodeURIComponent(phone)}`,
    { headers: authHeaders() }
  );
  return handle<Conversation>(res);
}

export async function sendReply(businessId: string, phoneNumber: string, message: string): Promise<{ success: boolean }> {
  const res = await fetch(`${API_BASE}/reply`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ businessId, phoneNumber, message }),
  });
  return handle(res);
}

export async function takeoverConversation(businessId: string, phone: string): Promise<{ mode: string }> {
  const res = await fetch(
    `${API_BASE}/conversations/${encodeURIComponent(businessId)}/${encodeURIComponent(phone)}/takeover`,
    { method: "POST", headers: authHeaders() }
  );
  return handle(res);
}

export async function returnToAI(businessId: string, phone: string): Promise<{ mode: string }> {
  const res = await fetch(
    `${API_BASE}/conversations/${encodeURIComponent(businessId)}/${encodeURIComponent(phone)}/return-to-ai`,
    { method: "POST", headers: authHeaders() }
  );
  return handle(res);
}

export async function patchConversation(
  businessId: string,
  phone: string,
  patch: { isStarred?: boolean; tags?: string[]; isBlocked?: boolean; mode?: "closed"; leadStatus?: "hot" | "warm" | "cold" | "none" }
): Promise<Conversation> {
  const res = await fetch(
    `${API_BASE}/conversations/${encodeURIComponent(businessId)}/${encodeURIComponent(phone)}`,
    {
      method: "PATCH",
      headers: { ...authHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    }
  );
  return handle(res);
}

export async function regenerateSummary(
  businessId: string,
  phone: string
): Promise<{ aiSummary: string; aiIntent: Conversation["aiIntent"]; lead: { status: string; score: number; potentialValue: string } }> {
  const res = await fetch(
    `${API_BASE}/conversations/${encodeURIComponent(businessId)}/${encodeURIComponent(phone)}/summary`,
    { method: "POST", headers: authHeaders() }
  );
  return handle(res);
}
