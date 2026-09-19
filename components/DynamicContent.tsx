"use client";

import { ExternalLink, Play } from "lucide-react";
import { useState } from "react";
import config from "@/data/data.json";
import { useEvents, useMessages } from "@/hooks/useChurchData";
import EventRegistrationForm from "./EventRegistrationForm";

function DataState({ error }: { error: string }) {
  return error ? <p role="alert" className="mt-6 text-sm text-red-700">{error}</p> : null;
}

export function DynamicMessages() {
  const { messages, loading, error } = useMessages();
  return <div className="mt-10 grid gap-6 md:grid-cols-3">
    {loading && <p className="text-sm text-white/70">Carregando mensagens...</p>}
    <DataState error={error} />
    {messages.map((message) => <a href={message.href} target="_blank" rel="noreferrer" key={message.title} className="group"><div className="relative aspect-video overflow-hidden rounded-2xl"><img src={message.image} alt={message.imageAlt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute bottom-3 left-3 rounded bg-black/70 px-2 py-1 text-xs">{message.duration}</span><span className="absolute inset-0 grid place-items-center opacity-0 transition duration-300 group-hover:opacity-100"><span className="grid h-14 w-14 place-items-center rounded-full bg-[#d79a45] text-[#173d32] transition-transform duration-300 group-hover:scale-110"><Play fill="currentColor" /></span></span></div><p className="mt-4 text-sm text-[#d79a45]">{message.date}</p><h3 className="mt-1 text-2xl">{message.title}</h3><p className="mt-1 text-sm text-white/60">{message.speaker}</p></a>)}
  </div>;
}

export function DynamicEvents() {
  const { events, loading, error } = useEvents();
  const [selected, setSelected] = useState<string | null>(null);
  return <div className="mt-10 grid gap-5 md:grid-cols-3">
    {loading && <p className="text-sm text-[#66736d]">Carregando eventos...</p>}
    <DataState error={error} />
    {events.map((event) => <article key={event.id ?? event.title} className="rounded-2xl border border-[#dce9df] bg-white p-6 transition-shadow hover:shadow-lg"><span className="text-sm font-bold text-[#d79a45]">{event.date}</span><h3 className="mt-3 text-2xl">{event.title}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-[#66736d]">{event.description}</p>{selected === event.title ? <EventRegistrationForm eventId={event.id} eventTitle={event.title} onClose={() => setSelected(null)} /> : <button onClick={() => setSelected(event.title)} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1d5b4b] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#173d32]">Quero participar <ExternalLink size={15} /></button>}</article>)}
  </div>;
}

export function DynamicContentNotice() {
  return <p className="sr-only">Os conteúdos são carregados por uma camada de dados preparada para o Supabase.</p>;
}
