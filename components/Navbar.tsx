"use client";

import { useState } from "react";
import { ChevronDown, Menu, MessageCircle, X } from "lucide-react";
import config from "@/data/data.json";
import GlobalSearch from "./GlobalSearch";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const whatsapp = `https://wa.me/${config.church.whatsapp}`;
  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-sm backdrop-blur">
      <div className="bg-[#173d32] text-xs text-white">
        <div className="container-page flex min-h-9 items-center justify-between gap-4">
          <span className="hidden sm:block opacity-80">Bem-vindo à nossa casa</span>
          <div className="ml-auto flex items-center gap-4">
            <a href={whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#eab66a]"><MessageCircle size={13} /> WhatsApp</a>
            <a href={`mailto:${config.church.email}`} className="hidden sm:block hover:text-[#eab66a]">{config.church.email}</a>
            <a href="#contato" className="rounded bg-[#d79a45] px-3 py-1 font-bold text-[#173d32]">Fale conosco</a>
          </div>
        </div>
      </div>
      <div className="container-page flex h-[76px] items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#1d5b4b] text-lg font-bold text-white">W</span>
          <span><strong className="block font-display text-xl leading-none">Wesleyana</strong><small className="text-[10px] uppercase tracking-widest text-[#66736d]">Jardim Primavera</small></span>
        </a>
        <div className="flex items-center gap-2">
          <GlobalSearch />
          <button className="p-2 md:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
        <nav className={`${open ? "absolute left-0 top-[112px] block w-full border-t bg-white p-5 opacity-100" : "hidden opacity-0"} transition-all duration-300 md:static md:block md:w-auto md:border-0 md:bg-transparent md:p-0 md:opacity-100`}>
          <ul className="flex flex-col gap-1 md:flex-row md:items-center md:gap-1">
            {config.navigation.map((item) => <li key={item.label} className="group relative">
              <a href={item.href ?? "#"} onClick={() => setOpen(false)} className="flex items-center gap-1 rounded px-3 py-3 text-sm font-semibold hover:bg-[#f0f5f0]">{item.label}{item.items && <ChevronDown size={14} />}</a>
              {item.items && <div className="invisible max-h-0 min-w-48 overflow-hidden rounded-xl bg-white p-0 opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:max-h-96 group-hover:p-2 group-hover:opacity-100 md:absolute md:left-0 md:top-full">{item.items.map((sub) => <a key={sub} href="#" className="block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-[#f0f5f0]">{sub}</a>)}</div>}
            </li>)}
          </ul>
        </nav>
      </div>
    </header>
  );
}
