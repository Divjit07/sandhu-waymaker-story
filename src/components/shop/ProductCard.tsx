"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { ProductRecord } from "@/data/products";
import { useCart } from "@/store/cart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProductCardProps {
  product: ProductRecord;
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCart((state) => state.addItem);

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
        <Link href={`/shop/${product.handle}`} className="absolute inset-0">
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

        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="absolute inset-x-4 bottom-4 rounded-full bg-white/85 py-3 text-center text-sm font-semibold tracking-wide opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100"
            >
              Quick View
            </button>
          </DialogTrigger>

          <DialogContent className="max-w-xl p-0 overflow-hidden">
            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative bg-[#f5f5f7]">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl">{product.name}</DialogTitle>
                  <DialogDescription className="text-sm">
                    {product.category} • {currency.format(activeVariant.price)}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-waymaker-dark/60">Choose Variant</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setVariantId(v.id)}
                        disabled={!v.inStock}
                        className={[
                          "rounded-full border px-4 py-2 text-sm transition-colors",
                          v.id === variantId
                            ? "border-waymaker-dark bg-waymaker-dark text-white"
                            : "border-black/20 bg-white text-waymaker-dark hover:bg-black/5",
                          !v.inStock ? "cursor-not-allowed opacity-40" : "",
                        ].join(" ")}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-3">
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
                      window.setTimeout(() => setAdded(false), 1500);
                    }}
                    className="w-full rounded-full bg-waymaker-dark px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white"
                  >
                    {added ? "Added to Bag" : `Add to Bag — ${currency.format(activeVariant.price)}`}
                  </button>

                  <Link
                    href="/cart"
                    className="w-full inline-flex items-center justify-center rounded-full border border-waymaker-dark/20 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-waymaker-dark"
                  >
                    View Bag
                  </Link>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
