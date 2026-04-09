import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductByHandle, products } from "@/data/products";
import { useCart } from "@/store/cart";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const ProductDetail = () => {
  const params = useParams<{ handle: string }>();
  const handle = typeof params?.handle === "string" ? params.handle : "";
  const product = handle ? getProductByHandle(handle) : undefined;
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]?.id ?? "");
  const addItem = useCart((state) => state.addItem);

  const related = useMemo(
    () => products.filter((item) => item.id !== product?.id).slice(0, 3),
    [product?.id],
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] px-6 pb-20 pt-28 md:px-12">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight">Product not found</h1>
          <p className="mt-3 text-waymaker-dark/65">The product you are looking for is unavailable.</p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-waymaker-dark px-6 py-3 text-sm font-semibold text-white"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const activeVariant = product.variants.find((variant) => variant.id === selectedVariant) ?? product.variants[0];

  return (
    <div className="min-h-screen bg-[#f5f5f7] px-6 pb-20 pt-28 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-3xl bg-white shadow-md">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-full w-full aspect-square object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={image}
                  onClick={() => setSelectedImage(index)}
                  className={`overflow-hidden rounded-2xl border ${
                    selectedImage === index ? "border-waymaker-dark" : "border-black/10"
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-md lg:col-span-2 lg:sticky lg:top-24 lg:h-fit">
            <p className="text-xs uppercase tracking-[0.3em] text-waymaker-dark/60">{product.category}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">{product.name}</h1>
            <p className="mt-4 text-2xl font-semibold">{currency.format(activeVariant.price)}</p>
            <p className="mt-4 text-sm leading-relaxed text-waymaker-dark/70">{product.description}</p>

            <div className="mt-7">
              <p className="text-xs uppercase tracking-[0.2em] text-waymaker-dark/60">Choose Variant</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant.id)}
                    disabled={!variant.inStock}
                    className={`rounded-full border px-4 py-2 text-sm ${
                      selectedVariant === variant.id
                        ? "border-waymaker-dark bg-waymaker-dark text-white"
                        : "border-black/20 bg-white text-waymaker-dark"
                    } ${!variant.inStock ? "cursor-not-allowed opacity-40" : ""}`}
                  >
                    {variant.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() =>
                addItem({
                  id: `${product.id}-${activeVariant.id}`,
                  productId: product.id,
                  name: product.name,
                  image: product.images[0],
                  variant: activeVariant.label,
                  price: activeVariant.price,
                })
              }
              className="mt-8 w-full rounded-full bg-waymaker-dark px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white"
            >
              Add to Bag - {currency.format(activeVariant.price)}
            </button>
            <Link
              href="/cart"
              className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-waymaker-dark/20 px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em]"
            >
              View Bag
            </Link>

            <ul className="mt-8 space-y-2 text-sm text-waymaker-dark/70">
              {product.details.map((detail) => (
                <li key={detail}>- {detail}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight">Related Products</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.id} href={`/shop/${item.handle}`} className="rounded-3xl bg-white p-4 shadow-sm">
                <img src={item.images[0]} alt={item.name} className="aspect-square w-full rounded-2xl object-cover" />
                <p className="mt-3 text-sm text-waymaker-dark/60">{item.category}</p>
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-sm font-medium">{currency.format(item.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
