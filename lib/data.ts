import config from "@/data/data.json";
import { supabase } from "./supabase";

export type EventItem = (typeof config.events)[number] & { id?: string };
export type MessageItem = (typeof config.messages)[number];

export async function getEvents(): Promise<EventItem[]> {
  if (!supabase) return config.events;
  const { data, error } = await supabase.from("eventos").select("*").order("data_inicio", { ascending: true });
  if (error) throw new Error(`Não foi possível carregar os eventos: ${error.message}`);
  return data.map((event) => ({
    id: event.id,
    title: event.titulo,
    description: event.descricao,
    date: new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(new Date(event.data_inicio)),
    tag: event.local ?? "Igreja",
  }));
}

export async function getMessages(): Promise<MessageItem[]> {
  if (!supabase) return config.messages;
  const { data, error } = await supabase.from("informativos").select("*").eq("published", true).order("data_publicacao", { ascending: false }).limit(6);
  if (error) throw new Error(`Não foi possível carregar as mensagens: ${error.message}`);
  return data.map((post) => ({
    title: post.titulo,
    speaker: "Informativo da igreja",
    date: new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(post.data_publicacao)),
    duration: "Leitura",
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Informativo da comunidade da Igreja Metodista Wesleyana",
    href: "#mensagens",
  }));
}

export async function submitPrayerRequest(input: {
  name: string;
  email: string;
  request: string;
  is_private: boolean;
}) {
  if (!supabase) throw new Error("Supabase não está configurado. Defina as variáveis de ambiente.");
  const { error } = await supabase.from("pedidos_de_oracao").insert({
    nome: input.name,
    email: input.email,
    pedido: input.request,
    sigilo: input.is_private,
  });
  if (error) throw new Error(`Não foi possível enviar o pedido: ${error.message}`);
}

export async function submitEventRegistration(input: {
  event_id: string;
  name: string;
  email: string;
}) {
  if (!supabase) throw new Error("Supabase não está configurado. Defina as variáveis de ambiente.");
  const { error } = await supabase.from("inscricoes_eventos").insert({
    event_id: input.event_id,
    guest_name: input.name,
    guest_email: input.email,
  });
  if (error) throw new Error(`Não foi possível concluir a inscrição: ${error.message}`);
}

export async function subscribeToNewsletter(email: string) {
  if (!supabase) throw new Error("Supabase não está configurado. Defina as variáveis de ambiente.");
  const { error } = await supabase.from("newsletter_subscribers").insert({ email: email.trim().toLowerCase() });
  if (error) {
    if (error.code === "23505") throw new Error("Este e-mail já está inscrito na newsletter.");
    throw new Error(`Não foi possível concluir a inscrição: ${error.message}`);
  }
}

export async function getNewsletterSubscribers() {
  if (!supabase) throw new Error("Supabase não está configurado. Defina as variáveis de ambiente.");
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("id, email, data_inscricao, ativo")
    .eq("ativo", true)
    .order("data_inscricao", { ascending: false });
  if (error) throw new Error(`Não foi possível carregar os inscritos: ${error.message}`);
  return data;
}

export async function getEventWithRegistrations(eventId: string) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("eventos")
    .select("*, inscricoes_eventos(*)")
    .eq("id", eventId)
    .single();
  if (error) throw new Error(`Não foi possível carregar o evento: ${error.message}`);
  return data;
}

export async function getCellsWithLeaders() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("celulas")
    .select("*, profiles(*)")
    .order("bairro", { ascending: true });
  if (error) throw new Error(`Não foi possível carregar as células: ${error.message}`);
  return data;
}
