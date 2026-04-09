import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import ProductCard from "@/components/shop/ProductCard";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";

type SortMode = "featured" | "price-asc" | "price-desc" | "newest";

const Shop = () => {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortMode>("featured");

  const filteredProducts = useMemo(() => {
    const base = category === "All" ? products : products.filter((p) => p.category === category);
    if (sort === "price-asc") return [...base].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...base].sort((a, b) => b.price - a.price);
    if (sort === "newest") return [...base].reverse();
    return base;
  }, [category, sort]);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white pt-28 pb-24 overflow-hidden">
      <Navbar />
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-waymaker-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-xs tracking-[0.6em] uppercase text-waymaker-accent mb-4 font-bold">Limited Collections</p>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">The Vault</h1>
          <p className="mt-8 text-lg text-white/40 max-w-2xl mx-auto font-light leading-relaxed">
            Engineered for movement. Crafted for statement wear. Every piece is a limited run, never to be restocked.
          </p>
        </motion.div>
      </div>

      {/* Marquee for Urgency - EDGE TO EDGE */}
      <div className="mb-12 border-y border-white/10 py-6 overflow-hidden flex whitespace-nowrap bg-white/[0.02]">
         <motion.div 
           animate={{ x: [0, -1000] }}
           transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
           className="flex gap-24 text-sm font-black tracking-[0.5em] uppercase text-waymaker-accent"
         >
            {Array(10).fill("Limited Quantities Available — Worldwide Shipping — Authentic Waymaker Goods").map((t, i) => (
              <span key={i}>{t}</span>
            ))}
         </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">



        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-12">
          <div className="flex flex-wrap gap-3">
            {["All", "Apparel", "Accessories", "Collectibles"].map((value) => (
              <button
                key={value}
                onClick={() => setCategory(value)}
                className={`rounded-full px-6 py-2 text-xs tracking-widest uppercase transition-all duration-300 border ${
                  category === value
                    ? "bg-waymaker-accent border-waymaker-accent text-white shadow-[0_0_20px_rgba(255,77,77,0.3)]"
                    : "bg-white/5 border-white/10 text-white/60 hover:border-white/30"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortMode)}
            className="w-full md:w-[240px] rounded-full border border-white/10 bg-white/5 px-6 py-3 text-xs tracking-widest uppercase text-white outline-none focus:border-waymaker-accent transition-all"
          >
            <option value="featured" className="bg-[#111]">Sort: Featured</option>
            <option value="price-asc" className="bg-[#111]">Price: Low to High</option>
            <option value="price-desc" className="bg-[#111]">Price: High to Low</option>
            <option value="newest" className="bg-[#111]">Newest Release</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 rounded-[40px] bg-gradient-to-br from-waymaker-accent to-[#800000] p-12 text-white relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.5em] text-white/70 mb-4 font-bold">Authenticity Promise</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase leading-none">
                Every PROJECT is a Statement.
              </h2>
            </div>
            <Link
              to="/cart"
              className="group whitespace-nowrap inline-flex items-center justify-center rounded-full bg-white px-10 py-5 text-sm font-black tracking-widest uppercase text-black hover:scale-110 transition-transform shadow-2xl"
            >
              Checkout Bag
            </Link>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-black/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </div>
  );
};

export default Shop;
