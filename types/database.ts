export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; nome: string; email: string; telefone: string | null; cargo: string | null; created_at: string };
        Insert: { id: string; nome: string; email: string; telefone?: string | null; cargo?: string | null; created_at?: string };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      eventos: {
        Row: { id: string; titulo: string; descricao: string; data_inicio: string; local: string | null; created_at: string };
        Insert: { id?: string; titulo: string; descricao?: string; data_inicio: string; local?: string | null; created_at?: string };
        Update: Partial<Database["public"]["Tables"]["eventos"]["Insert"]>;
        Relationships: [];
      };
      inscricoes_eventos: {
        Row: { id: string; user_id: string | null; event_id: string; guest_name: string | null; guest_email: string | null; status_checkin: "pendente" | "confirmado" | "cancelado"; codigo_qr: string; created_at: string };
        Insert: { id?: string; user_id?: string | null; event_id: string; guest_name?: string | null; guest_email?: string | null; status_checkin?: "pendente" | "confirmado" | "cancelado"; codigo_qr?: string; created_at?: string };
        Update: Partial<Database["public"]["Tables"]["inscricoes_eventos"]["Insert"]>;
        Relationships: [];
      };
      celulas: {
        Row: { id: string; nome: string; bairro: string; dia_semana: string; lider_id: string; created_at: string };
        Insert: { id?: string; nome: string; bairro: string; dia_semana: string; lider_id: string; created_at?: string };
        Update: Partial<Database["public"]["Tables"]["celulas"]["Insert"]>;
        Relationships: [];
      };
      pedidos_de_oracao: {
        Row: { id: string; user_id: string | null; nome: string; email: string | null; pedido: string; sigilo: boolean; created_at: string };
        Insert: { id?: string; user_id?: string | null; nome: string; email?: string | null; pedido: string; sigilo?: boolean; created_at?: string };
        Update: Partial<Database["public"]["Tables"]["pedidos_de_oracao"]["Insert"]>;
        Relationships: [];
      };
      informativos: {
        Row: { id: string; titulo: string; conteudo: string; autor_id: string | null; data_publicacao: string; published: boolean };
        Insert: { id?: string; titulo: string; conteudo: string; autor_id?: string | null; data_publicacao?: string; published?: boolean };
        Update: Partial<Database["public"]["Tables"]["informativos"]["Insert"]>;
        Relationships: [];
      };
      newsletter_subscribers: {
        Row: { id: string; email: string; data_inscricao: string; ativo: boolean };
        Insert: { id?: string; email: string; data_inscricao?: string; ativo?: boolean };
        Update: Partial<Database["public"]["Tables"]["newsletter_subscribers"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
