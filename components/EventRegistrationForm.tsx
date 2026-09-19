"use client";

import { FormEvent, useState } from "react";
import { submitEventRegistration } from "@/lib/data";

export default function EventRegistrationForm({ eventId, eventTitle, onClose }: { eventId?: string; eventTitle: string; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    if (!eventId) {
      setError("Este evento ainda não está disponível para inscrição.");
      setStatus("error");
      return;
    }
    const form = new FormData(event.currentTarget);
    try {
      await submitEventRegistration({ event_id: eventId, name: String(form.get("name")), email: String(form.get("email")) });
      setStatus("success");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível concluir a inscrição.");
      setStatus("error");
    }
  }
  if (status === "success") return <p className="mt-4 rounded-xl bg-[#dce9df] p-3 text-sm text-[#1d5b4b]">Inscrição enviada com sucesso.</p>;
  return <form onSubmit={submit} className="mt-4 grid gap-2 rounded-xl bg-[#f0f5f0] p-3">
    <input required name="name" placeholder="Seu nome" aria-label="Seu nome" className="rounded-lg border border-[#dce9df] px-3 py-2 text-sm" />
    <input required name="email" type="email" placeholder="Seu e-mail" aria-label="Seu e-mail" className="rounded-lg border border-[#dce9df] px-3 py-2 text-sm" />
    {status === "error" && <p role="alert" className="text-xs text-red-700">{error}</p>}
    <div className="flex gap-2"><button disabled={status === "loading"} className="rounded-full bg-[#1d5b4b] px-3 py-2 text-xs font-bold text-white disabled:opacity-60">{status === "loading" ? "Enviando..." : "Confirmar inscrição"}</button><button type="button" onClick={onClose} className="rounded-full px-3 py-2 text-xs">Cancelar</button></div>
  </form>;
}
