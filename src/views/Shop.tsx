import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import ProductCard from "@/components/shop/ProductCard";
import { products } from "@/data/products";

type SortMode = "featured" | "price-asc" | "price-desc" | "newest";

const Shop = () => {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortMode>("featured");

  const filteredProducts = useMemo(() => {
    const base = category === "All" ? products : products.filter((product) => product.category === category);
    if (sort === "price-asc") {
      return [...base].sort((a, b) => a.price - b.price);
    }
    if (sort === "price-desc") {
      return [...base].sort((a, b) => b.price - a.price);
    }
    if (sort === "newest") {
      return [...base].reverse();
    }
    return base;
  }, [category, sort]);

  return (
    <div className="relative min-h-screen bg-[#f5f5f7] text-waymaker-dark pt-28 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-waymaker-dark/60 mb-4">
            Collection
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight uppercase">
            The Shop
          </h1>
          <p className="mt-5 text-base md:text-lg text-waymaker-dark/65 max-w-2xl mx-auto">
            Limited edition pieces, engineered for movement and crafted for statement wear.
          </p>
        </motion.div>

        <div className="rounded-3xl border border-black/10 bg-white/70 p-4 md:p-6 backdrop-blur-md shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {["All", "Apparel", "Accessories", "Collectibles"].map((value) => (
                <button
                  key={value}
                  onClick={() => setCategory(value)}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    category === value
                      ? "bg-waymaker-dark text-white"
                      : "bg-white text-waymaker-dark hover:bg-waymaker-dark/5"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortMode)}
              className="w-full md:w-[220px] rounded-full border border-black/15 bg-white px-4 py-2 text-sm text-waymaker-dark outline-none"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 rounded-3xl bg-waymaker-dark p-8 text-white md:p-12"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">Authenticity Promise</p>
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="text-3xl md:text-4xl font-semibold max-w-3xl">
              Every item is verified, limited, and crafted to preserve the Waymaker story.
            </h2>
            <Link
              to="/cart"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-waymaker-dark"
            >
              Go to Bag
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Shop;
