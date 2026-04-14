import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { ProductRecord } from "@/data/products";
import { useCart } from "@/store/cart";

interface ProductCardProps {
  product: ProductRecord;
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCart((s) => s.addItem);

  const defaultVariantId = useMemo(() => {
    const inStock = product.variants.find((v) => v.inStock);
    return inStock?.id ?? product.variants[0]?.id ?? "";
  }, [product.variants]);

  const [variantId, setVariantId] = useState(defaultVariantId);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setVariantId(defaultVariantId);
    setAdded(false);
  }, [product.id, defaultVariantId]);

  const activeVariant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group"
    >
      <div className="relative aspect-square overflow-hidden rounded-[32px] bg-white/5 border border-white/10 shadow-2xl backdrop-blur-sm">
        <Link to={`/shop/${product.handle}`} className="absolute inset-0">
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
          />
          <img
            src={product.images[1] ?? product.images[0]}
            alt={`${product.name} alternate view`}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        </Link>

        {/* Dynamic Badge */}
        <div className="absolute top-4 left-4 z-20">
           <span className="bg-waymaker-accent text-[8px] font-black tracking-widest text-white px-3 py-1 rounded-full uppercase">
             {product.category === "Apparel" ? "Limited Drop" : "Authentic"}
           </span>
        </div>

        <button
          type="button"
          onClick={() => {
            if (!activeVariant) return;
            addItem({
              id: `${product.id}-${activeVariant.id}`,
              productId: product.id,
              name: product.name,
              image: product.images[0],
              variant: activeVariant.label,
              price: activeVariant.price,
            });
            setAdded(true);
            setTimeout(() => setAdded(false), 1500);
          }}
          className="absolute inset-x-4 bottom-4 rounded-full bg-white py-4 text-center text-[10px] font-black tracking-[0.2em] uppercase text-black opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
        >
          {added ? "Added to Bag ✓" : `Add - ${currency.format(activeVariant.price)}`}
        </button>
      </div>

      <div className="mt-6 flex items-start justify-between gap-3 px-2">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">{product.category}</p>
          <h3 className="mt-2 text-xl font-bold text-white tracking-tight group-hover:text-waymaker-accent transition-colors">{product.name}</h3>
        </div>
        <p className="text-lg font-black text-waymaker-accent mt-6 italic">{currency.format(product.price)}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
