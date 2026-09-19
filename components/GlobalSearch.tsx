"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import config from "@/data/data.json";

type SearchEntry = (typeof config.searchEntries)[number];

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
  const results = config.searchEntries.filter((entry) =>
    [entry.title, entry.type, entry.description].some((value) =>
      value.toLocaleLowerCase("pt-BR").includes(normalizedQuery),
    ),
  );

  return (
    <>
      <button
        type="button"
        aria-label="Abrir busca global"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-[#dce9df] px-3 py-2 text-sm font-semibold text-[#1d5b4b] transition-colors hover:border-[#1d5b4b] hover:bg-[#f0f5f0]"
      >
        <Search size={16} />
        <span className="hidden lg:inline">Buscar</span>
        <kbd className="hidden rounded bg-[#f0f5f0] px-1.5 py-0.5 text-[10px] font-normal lg:inline">Ctrl K</kbd>
      </button>
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] flex items-start justify-center bg-[#102d26]/60 px-4 pt-[12vh] backdrop-blur-sm transition-opacity duration-300 ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}
      >
        <div role="dialog" aria-modal="true" aria-label="Busca global" className={`w-full max-w-2xl rounded-3xl bg-white p-5 shadow-2xl transition-all duration-300 ${open ? "translate-y-0 scale-100" : "-translate-y-4 scale-95"}`}>
          <div className="flex items-center gap-3 border-b border-[#dce9df] pb-4">
            <Search className="text-[#1d5b4b]" size={21} />
            <input autoFocus={open} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busque por pregações, cursos, células ou endereços..." aria-label="Termo da busca" className="min-w-0 flex-1 text-base outline-none" />
            <button type="button" aria-label="Fechar busca" onClick={() => setOpen(false)} className="rounded-full p-2 text-[#66736d] transition-colors hover:bg-[#f0f5f0]"><X size={18} /></button>
          </div>
          <div className="mt-4 max-h-[50vh] overflow-y-auto">
            {normalizedQuery && results.length === 0 && <p className="py-8 text-center text-sm text-[#66736d]">Nenhum resultado encontrado.</p>}
            {!normalizedQuery && <p className="py-8 text-center text-sm text-[#66736d]">Digite para encontrar conteúdos e informações da igreja.</p>}
            {results.map((entry: SearchEntry) => (
              <a key={`${entry.type}-${entry.title}`} href={entry.href} onClick={() => setOpen(false)} className="block rounded-2xl p-3 transition-colors hover:bg-[#f0f5f0]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#d79a45]">{entry.type}</span>
                <strong className="mt-1 block text-base">{entry.title}</strong>
                <span className="mt-1 block text-sm text-[#66736d]">{entry.description}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
