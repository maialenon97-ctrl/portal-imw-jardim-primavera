"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import config from "@/data/data.json";

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  useEffect(() => { const timer = setInterval(() => setActive((current) => (current + 1) % config.heroSlides.length), 6000); return () => clearInterval(timer); }, []);
  const slide = config.heroSlides[active];
  return <section className="relative min-h-[600px] overflow-hidden bg-[#173d32] text-white">
    {config.heroSlides.map((item, index) => <img key={item.title} src={item.image} alt={item.imageAlt} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${active === index ? "opacity-100" : "opacity-0"}`} />)}
    <div className="hero-gradient absolute inset-0" />
    <div className="container-page relative flex min-h-[600px] items-center py-20"><div className="max-w-2xl"><span className="eyebrow">Bem-vindo à nossa casa</span><h1 className="mt-4 text-5xl leading-[1.08] md:text-7xl">{slide.title}</h1><p className="mt-6 max-w-lg text-lg leading-8 text-white/80">{slide.description}</p><div className="mt-9 flex flex-wrap gap-3"><a href={slide.primaryCta.href} className="inline-flex items-center gap-2 rounded-full bg-[#d79a45] px-6 py-3 font-bold text-[#173d32]">{slide.primaryCta.label} <ArrowRight size={18} /></a><a href={slide.secondaryCta.href} className="glass rounded-full px-6 py-3 font-bold">{slide.secondaryCta.label}</a></div></div></div>
    <div className="container-page absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center justify-between"><div className="flex gap-2">{config.heroSlides.map((item, index) => <button key={item.title} aria-label={`Ir para slide ${index + 1}`} onClick={() => setActive(index)} className={`h-1 rounded-full ${active === index ? "w-10 bg-[#d79a45]" : "w-5 bg-white/50"}`} />)}</div><div className="flex gap-2"><button aria-label="Slide anterior" onClick={() => setActive((active - 1 + config.heroSlides.length) % config.heroSlides.length)} className="grid h-10 w-10 place-items-center rounded-full border border-white/40 hover:bg-white/20"><ChevronLeft size={18} /></button><button aria-label="Próximo slide" onClick={() => setActive((active + 1) % config.heroSlides.length)} className="grid h-10 w-10 place-items-center rounded-full border border-white/40 hover:bg-white/20"><ChevronRight size={18} /></button></div></div>
  </section>;
}
