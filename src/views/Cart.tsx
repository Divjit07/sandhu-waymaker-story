import { Link } from "react-router-dom";
import { getCartSubtotal, useCart } from "@/store/cart";
import Navbar from "@/components/Navbar";
import { Trash2 } from "lucide-react";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const Cart = () => {
  const items = useCart((s) => s.items);
  const removeItem = useCart((s) => s.removeItem);
  const updateQuantity = useCart((s) => s.updateQuantity);

  const subtotal = getCartSubtotal(items);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#f5f5f7] px-6 pb-20 pt-28 md:px-12">
      <Navbar />
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-semibold tracking-tight">Your Bag</h1>
        <p className="mt-2 text-sm text-waymaker-dark/60">Free shipping on orders over $100.</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.length === 0 ? (
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <p className="text-waymaker-dark/70">Your bag is currently empty.</p>
                <Link to="/shop" className="mt-4 inline-flex rounded-full bg-waymaker-dark px-5 py-3 text-sm text-white">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="rounded-3xl bg-white p-4 shadow-sm md:p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <img src={item.image} alt={item.name} className="h-24 w-24 rounded-2xl object-cover" />
                    <div className="flex-1">
                      <p className="text-lg font-semibold">{item.name}</p>
                      <p className="text-sm text-waymaker-dark/60">Variant: {item.variant}</p>
                      <p className="mt-1 font-medium">{currency.format(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-10 w-10 rounded-full border border-black/20 flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="min-w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-10 w-10 rounded-full border border-black/20 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm text-waymaker-dark/60 hover:text-red-500 transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{currency.format(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : currency.format(shipping)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-black/10 pt-3 text-base font-semibold">
                <span>Total</span>
                <span>{currency.format(total)}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-waymaker-dark px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white"
            >
              Checkout
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
