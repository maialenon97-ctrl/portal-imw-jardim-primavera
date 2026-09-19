"use client";

import { Check, LoaderCircle, Mail, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { subscribeToNewsletter } from "@/lib/data";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email")).trim();
    try {
      await subscribeToNewsletter(email);
      setStatus("success");
      event.currentTarget.reset();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível realizar a inscrição.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return <div className="flex items-center gap-2 text-sm font-semibold text-[#1d5b4b]"><Check size={18} /> Inscrição confirmada! Você receberá nossas novidades.</div>;
  }

  return <form onSubmit={submit} className="w-full">
    <div className="flex flex-col gap-2 sm:flex-row">
      <label className="flex flex-1 items-center gap-2 rounded-xl bg-white px-4 py-3 text-[#66736d] shadow-sm focus-within:ring-2 focus-within:ring-[#d79a45]">
        <Mail size={18} />
        <input required type="email" name="email" placeholder="Seu melhor e-mail" aria-label="Seu e-mail para newsletter" className="min-w-0 flex-1 bg-transparent text-sm text-[#16251f] outline-none" />
      </label>
      <button disabled={status === "loading"} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d79a45] px-5 py-3 text-sm font-bold text-[#173d32] transition-colors hover:bg-[#eab66a] disabled:opacity-60">
        {status === "loading" ? <LoaderCircle className="animate-spin" size={17} /> : <Send size={17} />}
        {status === "loading" ? "Enviando..." : "Inscrever-se"}
      </button>
    </div>
    {status === "error" && <p role="alert" className="mt-2 text-xs text-red-200">{error}</p>}
  </form>;
}
