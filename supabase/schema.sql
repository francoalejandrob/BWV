-- BWV admin dashboard — Phase 1 schema
-- Run this once in the Supabase SQL Editor (Project -> SQL Editor -> New query -> Run).

create extension if not exists "pgcrypto";

create table if not exists collections (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  collection_id uuid not null references collections(id) on delete restrict,
  slug text unique not null,
  name text not null,
  tagline text not null default '',
  price numeric(10,2) not null default 0,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  url text not null,
  sort_order int not null default 0
);

create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  size text not null,
  color text not null default '',
  stock int not null default 0
);

create index if not exists products_collection_id_idx on products(collection_id);
create index if not exists product_images_product_id_idx on product_images(product_id);
create index if not exists product_variants_product_id_idx on product_variants(product_id);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_set_updated_at on products;
create trigger products_set_updated_at
before update on products
for each row execute function set_updated_at();

-- Row Level Security: public (anon) can only ever READ. All writes happen
-- server-side from the admin dashboard using the service_role key, which
-- bypasses RLS entirely — so there are intentionally no insert/update/delete
-- policies below.
alter table collections enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table product_variants enable row level security;

drop policy if exists "Public read collections" on collections;
create policy "Public read collections" on collections for select using (true);

drop policy if exists "Public read active products" on products;
create policy "Public read active products" on products for select using (active = true);

drop policy if exists "Public read product images" on product_images;
create policy "Public read product images" on product_images for select using (
  exists (select 1 from products p where p.id = product_images.product_id and p.active = true)
);

drop policy if exists "Public read product variants" on product_variants;
create policy "Public read product variants" on product_variants for select using (
  exists (select 1 from products p where p.id = product_variants.product_id and p.active = true)
);

-- Storage bucket for admin-uploaded product photos.
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "Public read product-images bucket" on storage.objects;
create policy "Public read product-images bucket"
on storage.objects for select
using (bucket_id = 'product-images');
