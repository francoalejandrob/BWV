-- Seeds the current BWV catalog so the site doesn't go blank on cutover.
-- Run this once, after schema.sql, in the Supabase SQL Editor.
-- Safe to re-run: it clears these 4 tables first.

truncate table product_variants, product_images, products, collections cascade;

insert into collections (slug, name, description, sort_order) values
  ('originals', 'Originals', 'Diseños propios, ya listos. Lo que ves es lo que hay — cada pieza está disponible para pedir ahora.', 1),
  ('rebels', 'Rebels', 'Back-prints con más carácter. La cara opuesta de BWV, en la espalda de cada prenda.', 2);

-- Originals
with c as (select id from collections where slug = 'originals')
insert into products (collection_id, slug, name, tagline, price, sort_order)
select c.id, v.slug, v.name, v.tagline, v.price, v.sort_order
from c, (values
  ('originals', 'Originals', 'BWV™ 2026 · Salinas, Ecuador. La firma que lo empezó todo.', 25, 1),
  ('in-bloom', 'In Bloom', 'Flores pintadas a mano. Hecha para ti, no para todos.', 25, 2),
  ('rising-star', 'Rising Star', 'Estrella BWV en clave retro. Made for you, not for everyone.', 25, 3)
) as v(slug, name, tagline, price, sort_order);

-- Rebels
with c as (select id from collections where slug = 'rebels')
insert into products (collection_id, slug, name, tagline, price, sort_order)
select c.id, v.slug, v.name, v.tagline, v.price, v.sort_order
from c, (values
  ('call-me', 'Call Me', 'Cuando el mundo se siente demasiado grande.', 25, 1),
  ('rebel', 'Rebel', 'Unapologetic. Unbothered. Unstoppable.', 25, 2),
  ('vision', 'Vision', 'No ceiling. No apology.', 25, 3)
) as v(slug, name, tagline, price, sort_order);

-- Images (existing files already in /public, no Storage upload needed for these)
insert into product_images (product_id, url, sort_order)
select p.id, v.url, v.sort_order
from products p
join (values
  ('originals', '/products/originals/originals-1.jpg', 1),
  ('originals', '/products/originals/originals-2.jpg', 2),
  ('originals', '/products/originals/originals-3.jpg', 3),
  ('in-bloom', '/products/originals/in-bloom-1.jpg', 1),
  ('in-bloom', '/products/originals/in-bloom-2.jpg', 2),
  ('in-bloom', '/products/originals/in-bloom-3.jpg', 3),
  ('rising-star', '/products/originals/rising-star-1.jpg', 1),
  ('rising-star', '/products/originals/rising-star-2.jpg', 2),
  ('rising-star', '/products/originals/rising-star-3.jpg', 3),
  ('rising-star', '/products/originals/rising-star-4.jpg', 4),
  ('call-me', '/products/rebel/call-me-1.jpg', 1),
  ('call-me', '/products/rebel/call-me-2.jpg', 2),
  ('call-me', '/products/rebel/call-me-3.jpg', 3),
  ('rebel', '/products/rebel/rebel-1.jpg', 1),
  ('rebel', '/products/rebel/rebel-2.jpg', 2),
  ('rebel', '/products/rebel/rebel-3.jpg', 3),
  ('vision', '/products/rebel/vision-1.jpg', 1),
  ('vision', '/products/rebel/vision-2.jpg', 2),
  ('vision', '/products/rebel/vision-3.jpg', 3),
  ('vision', '/products/rebel/vision-4.jpg', 4)
) as v(slug, url, sort_order) on v.slug = p.slug;

-- Variants: S/M/L per product, in the product's single garment color, stock 10
insert into product_variants (product_id, size, color, stock)
select p.id, s.size, v.color, 10
from products p
join (values
  ('originals', 'Negro'),
  ('in-bloom', 'Negro'),
  ('rising-star', 'Blanco'),
  ('call-me', 'Negro'),
  ('rebel', 'Blanco'),
  ('vision', 'Negro')
) as v(slug, color) on v.slug = p.slug
cross join (values ('S'), ('M'), ('L')) as s(size);
