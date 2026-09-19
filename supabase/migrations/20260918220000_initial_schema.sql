create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  email text not null unique,
  telefone text,
  cargo text,
  created_at timestamptz not null default now()
);

create table if not exists public.eventos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descricao text not null default '',
  data_inicio timestamptz not null,
  local text,
  created_at timestamptz not null default now()
);

create table if not exists public.inscricoes_eventos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  event_id uuid not null references public.eventos(id) on delete cascade,
  guest_name text,
  guest_email text,
  status_checkin text not null default 'pendente' check (status_checkin in ('pendente', 'confirmado', 'cancelado')),
  codigo_qr text not null unique default encode(gen_random_bytes(12), 'hex'),
  created_at timestamptz not null default now(),
  unique (user_id, event_id)
);

create table if not exists public.celulas (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  bairro text not null,
  dia_semana text not null,
  lider_id uuid not null references public.profiles(id) on delete restrict,
  created_at timestamptz not null default now()
);

create table if not exists public.pedidos_de_oracao (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  nome text not null,
  email text,
  pedido text not null,
  sigilo boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.informativos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  conteudo text not null,
  autor_id uuid references public.profiles(id) on delete set null,
  data_publicacao timestamptz not null default now(),
  published boolean not null default false
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  data_inscricao timestamptz not null default now(),
  ativo boolean not null default true
);

alter table public.inscricoes_eventos alter column user_id drop not null;
alter table public.inscricoes_eventos add column if not exists guest_name text;
alter table public.inscricoes_eventos add column if not exists guest_email text;

create index if not exists eventos_data_inicio_idx on public.eventos (data_inicio);
create index if not exists inscricoes_eventos_event_id_idx on public.inscricoes_eventos (event_id);
create index if not exists celulas_lider_id_idx on public.celulas (lider_id);
create index if not exists informativos_data_publicacao_idx on public.informativos (data_publicacao desc);
create index if not exists newsletter_subscribers_ativo_idx on public.newsletter_subscribers (ativo);

alter table public.profiles enable row level security;
alter table public.eventos enable row level security;
alter table public.inscricoes_eventos enable row level security;
alter table public.celulas enable row level security;
alter table public.pedidos_de_oracao enable row level security;
alter table public.informativos enable row level security;
alter table public.newsletter_subscribers enable row level security;

create policy "Public profiles are viewable"
  on public.profiles for select using (true);
create policy "Published events are viewable"
  on public.eventos for select using (true);
create policy "Cells are viewable"
  on public.celulas for select using (true);
create policy "Published bulletins are viewable"
  on public.informativos for select using (published = true);
create policy "Anyone can submit prayer requests"
  on public.pedidos_de_oracao for insert with check (true);
create policy "Members can create event registrations"
  on public.inscricoes_eventos for insert with check (auth.uid() = user_id or user_id is null);
create policy "Members can view their registrations"
  on public.inscricoes_eventos for select using (auth.uid() = user_id);
create policy "Anyone can subscribe to newsletter"
  on public.newsletter_subscribers for insert with check (true);
create policy "Authenticated staff can view newsletter subscribers"
  on public.newsletter_subscribers for select using (auth.role() = 'authenticated');
