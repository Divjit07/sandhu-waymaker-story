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
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-white/70 shadow-md">
        <Link to={`/shop/${product.handle}`} className="absolute inset-0">
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <img
            src={product.images[1] ?? product.images[0]}
            alt={`${product.name} alternate view`}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </Link>

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
          className="absolute inset-x-4 bottom-4 rounded-full bg-white/85 py-3 text-center text-sm font-semibold tracking-wide opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100"
        >
          {added ? "Added ✓" : `Add to Bag — ${currency.format(activeVariant.price)}`}
        </button>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-waymaker-dark/50">{product.category}</p>
          <h3 className="mt-1 text-lg font-semibold text-waymaker-dark">{product.name}</h3>
        </div>
        <p className="text-base font-semibold text-waymaker-dark">{currency.format(product.price)}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
