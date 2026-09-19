"use client";

import { useEffect, useState } from "react";
import { getEvents, getMessages, type EventItem, type MessageItem } from "@/lib/data";

export function useEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    getEvents().then(setEvents).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false));
  }, []);
  return { events, loading, error };
}

export function useMessages() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    getMessages().then(setMessages).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false));
  }, []);
  return { messages, loading, error };
}
