"use client";

import { Clipboard, LoaderCircle, Megaphone, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { getNewsletterSubscribers } from "@/lib/data";

type Subscriber = { id: string; email: string; data_inscricao: string; ativo: boolean };

export default function NewsletterAdmin() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      setSubscribers(await getNewsletterSubscribers());
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível carregar os inscritos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  async function copyContacts() {
    await navigator.clipboard.writeText(subscribers.map((subscriber) => subscriber.email).join(", "));
    setMessage("Contatos copiados para a área de transferência.");
  }

  return <section aria-labelledby="newsletter-admin-title" className="rounded-3xl bg-white p-6 shadow-sm md:p-10">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div><span className="eyebrow">Secretaria</span><h1 id="newsletter-admin-title" className="mt-2 text-4xl">Gestão da newsletter</h1><p className="mt-2 text-sm text-[#66736d]">Área simulada para visualizar contatos e preparar o disparo semanal.</p></div>
      <button onClick={() => void load()} aria-label="Atualizar inscritos" className="rounded-full border border-[#dce9df] p-3 text-[#1d5b4b] transition-colors hover:bg-[#f0f5f0]"><RefreshCw size={18} /></button>
    </div>
    <div className="mt-8 flex flex-wrap gap-3">
      <button disabled={!subscribers.length} onClick={() => void copyContacts()} className="inline-flex items-center gap-2 rounded-full bg-[#1d5b4b] px-4 py-2 text-sm font-bold text-white disabled:opacity-50"><Clipboard size={16} /> Copiar contatos</button>
      <button disabled={!subscribers.length} onClick={() => setMessage("Disparo semanal simulado. Integre um provedor de e-mail para envio real.")} className="inline-flex items-center gap-2 rounded-full border border-[#1d5b4b] px-4 py-2 text-sm font-bold text-[#1d5b4b] disabled:opacity-50"><Megaphone size={16} /> Simular disparo semanal</button>
    </div>
    {message && <p className="mt-4 rounded-xl bg-[#dce9df] p-3 text-sm text-[#1d5b4b]">{message}</p>}
    {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error} A listagem exige uma sessão autenticada de secretaria.</p>}
    {loading ? <p className="mt-8 flex items-center gap-2 text-sm text-[#66736d]"><LoaderCircle className="animate-spin" size={16} /> Carregando inscritos...</p> : <div className="mt-8 overflow-x-auto"><table className="w-full text-left text-sm"><caption className="sr-only">Inscritos ativos na newsletter</caption><thead><tr className="border-b border-[#dce9df] text-[#66736d]"><th className="px-3 py-3">E-mail</th><th className="px-3 py-3">Data de inscrição</th><th className="px-3 py-3">Status</th></tr></thead><tbody>{subscribers.map((subscriber) => <tr key={subscriber.id} className="border-b border-[#f0f5f0]"><td className="px-3 py-3 font-semibold">{subscriber.email}</td><td className="px-3 py-3">{new Intl.DateTimeFormat("pt-BR").format(new Date(subscriber.data_inscricao))}</td><td className="px-3 py-3 text-[#1d5b4b]">Ativo</td></tr>)}</tbody></table>{!subscribers.length && !error && <p className="py-8 text-center text-sm text-[#66736d]">Nenhum inscrito ativo.</p>}</div>}
  </section>;
}
