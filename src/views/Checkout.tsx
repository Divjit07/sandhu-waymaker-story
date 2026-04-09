import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getCartSubtotal, useCart } from "@/store/cart";
import Navbar from "@/components/Navbar";
import { CheckCircle } from "lucide-react";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const Checkout = () => {
  const items = useCart((s) => s.items);
  const clearCart = useCart((s) => s.clearCart);
  const subtotal = getCartSubtotal(items);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 12;
  const total = useMemo(() => subtotal + shipping, [shipping, subtotal]);
  const [placed, setPlaced] = useState(false);

  const handlePlaceOrder = () => {
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] px-6 pb-20 pt-28 md:px-12">
        <Navbar />
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-12 text-center shadow-sm">
          <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-6" />
          <h1 className="text-3xl font-semibold tracking-tight">Order Placed!</h1>
          <p className="mt-3 text-waymaker-dark/65">Thank you for shopping with WAYMAKER. Your order is being processed.</p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-waymaker-dark px-8 py-3 text-sm font-semibold text-white"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] px-6 pb-20 pt-28 md:px-12">
      <Navbar />
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
        <main className="rounded-3xl bg-white p-6 shadow-sm lg:col-span-2 md:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-waymaker-dark/60">Checkout</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Secure Payment</h1>

          <div className="mt-8 grid gap-4">
            <input className="rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-waymaker-dark/40 transition-colors" placeholder="Email address" />
            <div className="grid gap-4 md:grid-cols-2">
              <input className="rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-waymaker-dark/40 transition-colors" placeholder="First name" />
              <input className="rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-waymaker-dark/40 transition-colors" placeholder="Last name" />
            </div>
            <input className="rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-waymaker-dark/40 transition-colors" placeholder="Street address" />
            <div className="grid gap-4 md:grid-cols-3">
              <input className="rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-waymaker-dark/40 transition-colors" placeholder="City" />
              <input className="rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-waymaker-dark/40 transition-colors" placeholder="State" />
              <input className="rounded-xl border border-black/15 px-4 py-3 outline-none focus:border-waymaker-dark/40 transition-colors" placeholder="ZIP code" />
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-8 w-full rounded-full bg-waymaker-dark px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white hover:bg-waymaker-dark/90 transition-colors"
          >
            Place Order — {currency.format(total)}
          </button>
          <p className="mt-4 text-xs text-waymaker-dark/50">100% secure checkout. All products are authenticity verified.</p>
        </main>

        <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span>{currency.format(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-2 border-t border-black/10 pt-4 text-sm">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{currency.format(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : currency.format(shipping)}</span>
            </div>
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Total</span>
              <span>{currency.format(total)}</span>
            </div>
          </div>
          <Link to="/cart" className="mt-5 inline-flex text-sm underline underline-offset-4">
            Edit bag
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
