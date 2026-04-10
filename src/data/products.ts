export interface ProductVariant {
  id: string;
  label: string;
  price: number;
  inStock: boolean;
}

export interface ProductRecord {
  id: string;
  name: string;
  handle: string;
  category: "Apparel" | "Accessories" | "Collectibles";
  description: string;
  details: string[];
  price: number;
  compareAtPrice?: number;
  stock: number;
  images: string[];
  variants: ProductVariant[];
}

export const products: ProductRecord[] = [
  {
    id: "p-hoodie-signature",
    name: "Signature Hoodie",
    handle: "signature-hoodie",
    category: "Apparel",
    description:
      "Heavyweight fleece hoodie with tonal embroidery and a tailored relaxed fit inspired by stage rehearsals.",
    details: [
      "450 GSM brushed fleece",
      "Ribbed cuffs and hem",
      "Limited run with numbered inside tag",
    ],
    price: 120,
    compareAtPrice: 145,
    stock: 17,
    images: [
      "/images/waymaker_hoodie_1775530354605.png",
      "/images/Screenshot 2026-03-08 063230.png",
    ],
    variants: [
      { id: "hoodie-s", label: "S", price: 120, inStock: true },
      { id: "hoodie-m", label: "M", price: 120, inStock: true },
      { id: "hoodie-l", label: "L", price: 120, inStock: true },
      { id: "hoodie-xl", label: "XL", price: 120, inStock: false },
    ],
  },
  {
    id: "p-denim-distressed",
    name: "Distressed Denim",
    handle: "distressed-denim",
    category: "Apparel",
    description:
      "Tour-grade denim with hand-faded treatment for a worn-in silhouette that keeps shape all day.",
    details: ["12 oz premium denim", "Tapered fit", "Custom antique hardware"],
    price: 145,
    stock: 23,
    images: [
      "/images/waymaker_jeans_1775530369705.png",
      "/images/Screenshot_2026-03-08_063154.png",
    ],
    variants: [
      { id: "denim-30", label: "30", price: 145, inStock: true },
      { id: "denim-32", label: "32", price: 145, inStock: true },
      { id: "denim-34", label: "34", price: 145, inStock: true },
    ],
  },
  {
    id: "p-gloves-moto",
    name: "Moto Gloves",
    handle: "moto-gloves",
    category: "Accessories",
    description:
      "Lightweight performance gloves with breathable mesh and reinforced palm grip for all-day comfort.",
    details: ["Vented mesh panel", "Touch-compatible fingertips", "Adjustable wrist strap"],
    price: 85,
    stock: 11,
    images: [
      "/images/waymaker_gloves_1775530491353.png",
      "/images/Screenshot_2026-03-08_063522.png",
    ],
    variants: [
      { id: "gloves-s", label: "S", price: 85, inStock: true },
      { id: "gloves-m", label: "M", price: 85, inStock: true },
      { id: "gloves-l", label: "L", price: 85, inStock: true },
    ],
  },
  {
    id: "p-watch-chrono",
    name: "Chronograph Watch",
    handle: "chronograph-watch",
    category: "Accessories",
    description:
      "Polished steel chronograph with sapphire glass and premium leather strap engineered for statement wear.",
    details: ["42mm case", "Water resistant 5 ATM", "Japanese quartz movement"],
    price: 295,
    stock: 8,
    images: [
      "/images/waymaker_watch_1775530506330.png",
      "/images/Screenshot_2026-03-08_063344.png",
    ],
    variants: [
      { id: "watch-black", label: "Black", price: 295, inStock: true },
      { id: "watch-silver", label: "Silver", price: 295, inStock: true },
    ],
  },
  {
    id: "p-chain-cuban",
    name: "Cuban Chain",
    handle: "cuban-chain",
    category: "Collectibles",
    description:
      "Signature polished chain with locking clasp and engraved emblem from the Waymaker era.",
    details: ["316L stainless steel", "Hypoallergenic finish", "Custom gift pouch included"],
    price: 110,
    stock: 14,
    images: [
      "/images/waymaker_chain_1775530543807.png",
      "/images/Screenshot 2026-03-08 063319.png",
    ],
    variants: [{ id: "chain-one", label: "One Size", price: 110, inStock: true }],
  },
  {
    id: "p-glasses-aviator",
    name: "Aviator Glasses",
    handle: "aviator-glasses",
    category: "Accessories",
    description:
      "Aviator frame with anti-glare lenses tuned for stage and city wear, finished with subtle branding.",
    details: ["UV400 protection", "Lightweight alloy frame", "Hard case included"],
    price: 150,
    stock: 19,
    images: [
      "/images/waymaker_glasses_1775530592178.png",
      "/images/Screenshot 2026-03-08 063256.png",
    ],
    variants: [{ id: "aviator-one", label: "One Size", price: 150, inStock: true }],
  },
];

export function getProductByHandle(handle: string) {
  return products.find((product) => product.handle === handle);
}
