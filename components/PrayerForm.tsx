"use client";

import { LoaderCircle, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { submitPrayerRequest } from "@/lib/data";

export default function PrayerForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      await submitPrayerRequest({ name: String(form.get("name")), email: String(form.get("email")), request: String(form.get("request")), is_private: form.get("is_private") === "on" });
      setStatus("success");
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível enviar o pedido.");
      setStatus("error");
    }
  }
  if (status === "success") return <div className="rounded-3xl bg-[#dce9df] p-8"><h3 className="font-display text-3xl text-[#1d5b4b]">Recebemos seu pedido.</h3><p className="mt-3 leading-7 text-[#66736d]">Nossa equipe vai acolher sua mensagem e orar por você.</p></div>;
  return <form onSubmit={submit} className="rounded-3xl bg-white p-7 shadow-sm"><h3 className="font-display text-3xl">Pedido de oração</h3><div className="mt-5 grid gap-4"><input required name="name" aria-label="Seu nome" placeholder="Seu nome" className="rounded-xl border border-[#dce9df] px-4 py-3 outline-none focus:border-[#1d5b4b]" /><input required name="email" type="email" aria-label="Seu e-mail" placeholder="Seu e-mail" className="rounded-xl border border-[#dce9df] px-4 py-3 outline-none focus:border-[#1d5b4b]" /><textarea required name="request" aria-label="Seu pedido" placeholder="Como podemos orar por você?" rows={4} className="resize-none rounded-xl border border-[#dce9df] px-4 py-3 outline-none focus:border-[#1d5b4b]" /><label className="flex items-start gap-2 text-sm text-[#66736d]"><input name="is_private" type="checkbox" className="mt-1 accent-[#1d5b4b]" /> Manter em sigilo (apenas para pastores)</label>{status === "error" && <p role="alert" className="text-sm text-red-700">{error}</p>}<button disabled={status === "loading"} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1d5b4b] px-5 py-3 font-bold text-white hover:bg-[#173d32] disabled:opacity-60">{status === "loading" ? <LoaderCircle className="animate-spin" size={16} /> : <Send size={16} />}{status === "loading" ? "Enviando..." : "Enviar pedido"}</button></div></form>;
}
