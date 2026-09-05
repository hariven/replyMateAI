import { useEffect, useRef, useState } from "react";
import { listConversations } from "./api";
import type { Conversation, ConversationFilter } from "./types";

export function useConversationsPoll(
  businessId: string | null,
  filter: ConversationFilter,
  search: string,
  intervalMs = 6000
) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchRef = useRef(search);
  searchRef.current = search;

  useEffect(() => {
    if (!businessId) {
      setConversations([]);
      return;
    }

    let cancelled = false;
    setLoading(true);

    const fetchOnce = async () => {
      try {
        const data = await listConversations(businessId, filter, searchRef.current);
        if (!cancelled) {
          setConversations(data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load conversations");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchOnce();
    const id = setInterval(fetchOnce, intervalMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [businessId, filter, search, intervalMs]);

  return { conversations, loading, error };
}
