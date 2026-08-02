export type Collection = "originals" | "rebels";

export type Product = {
  slug: string;
  name: string;
  collection: Collection;
  color: string;
  tagline: string;
  price: number;
  images: string[];
};

export const WHATSAPP_NUMBER = "593978651914";

export const products: Product[] = [
  {
    slug: "originals",
    name: "Originals",
    collection: "originals",
    color: "Negro",
    tagline: "BWV™ 2026 · Salinas, Ecuador. La firma que lo empezó todo.",
    price: 25,
    images: [
      "/products/originals/originals-1.jpg",
      "/products/originals/originals-2.jpg",
      "/products/originals/originals-3.jpg",
    ],
  },
  {
    slug: "in-bloom",
    name: "In Bloom",
    collection: "originals",
    color: "Negro",
    tagline: "Flores pintadas a mano. Hecha para ti, no para todos.",
    price: 25,
    images: [
      "/products/originals/in-bloom-1.jpg",
      "/products/originals/in-bloom-2.jpg",
      "/products/originals/in-bloom-3.jpg",
    ],
  },
  {
    slug: "rising-star",
    name: "Rising Star",
    collection: "originals",
    color: "Blanco",
    tagline: "Estrella BWV en clave retro. Made for you, not for everyone.",
    price: 25,
    images: [
      "/products/originals/rising-star-1.jpg",
      "/products/originals/rising-star-2.jpg",
      "/products/originals/rising-star-3.jpg",
      "/products/originals/rising-star-4.jpg",
    ],
  },
  {
    slug: "call-me",
    name: "Call Me",
    collection: "rebels",
    color: "Negro",
    tagline: "Cuando el mundo se siente demasiado grande.",
    price: 25,
    images: [
      "/products/rebel/call-me-1.jpg",
      "/products/rebel/call-me-2.jpg",
      "/products/rebel/call-me-3.jpg",
    ],
  },
  {
    slug: "rebel",
    name: "Rebel",
    collection: "rebels",
    color: "Blanco",
    tagline: "Unapologetic. Unbothered. Unstoppable.",
    price: 25,
    images: [
      "/products/rebel/rebel-1.jpg",
      "/products/rebel/rebel-2.jpg",
      "/products/rebel/rebel-3.jpg",
    ],
  },
  {
    slug: "vision",
    name: "Vision",
    collection: "rebels",
    color: "Negro",
    tagline: "No ceiling. No apology.",
    price: 25,
    images: [
      "/products/rebel/vision-1.jpg",
      "/products/rebel/vision-2.jpg",
      "/products/rebel/vision-3.jpg",
      "/products/rebel/vision-4.jpg",
    ],
  },
];

export function productsByCollection(collection: Collection) {
  return products.filter((p) => p.collection === collection);
}

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
