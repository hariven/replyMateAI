import { useEffect, useRef, useState, useCallback } from "react";
import { getConversation } from "./api";
import type { Conversation } from "./types";

export function useThreadPoll(businessId: string | null, phone: string | null, intervalMs = 3000) {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Guards against a stale in-flight request (e.g. a poll tick that started before a
  // takeover/return-to-ai mutation) landing after a newer one and clobbering fresh state.
  const requestIdRef = useRef(0);

  const load = useCallback(async () => {
    if (!businessId || !phone) return;
    const requestId = ++requestIdRef.current;
    try {
      const data = await getConversation(businessId, phone);
      if (requestId === requestIdRef.current) {
        setConversation(data);
        setError(null);
      }
    } catch (err) {
      if (requestId === requestIdRef.current) {
        setError(err instanceof Error ? err.message : "Failed to load conversation");
      }
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  }, [businessId, phone]);

  useEffect(() => {
    if (!businessId || !phone) {
      setConversation(null);
      return;
    }

    setLoading(true);
    load();
    const id = setInterval(load, intervalMs);
    return () => clearInterval(id);
  }, [businessId, phone, intervalMs, load]);

  return { conversation, loading, error, refetch: load, setConversation };
}
