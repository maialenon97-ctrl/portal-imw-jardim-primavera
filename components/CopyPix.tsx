"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function CopyPix({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() { await navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  return <button onClick={copy} className="inline-flex items-center gap-2 rounded-full border border-[#1d5b4b] px-4 py-2 text-sm font-bold text-[#1d5b4b]">{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? "Copiado!" : "Copiar PIX"}</button>;
}
