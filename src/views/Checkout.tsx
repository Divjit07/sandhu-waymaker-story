import { useMemo } from "react";
import { Link } from "react-router-dom";
import { getCartSubtotal, useCart } from "@/store/cart";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const Checkout = () => {
  const items = useCart((state) => state.items);
  const subtotal = getCartSubtotal(items);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 12;
  const total = useMemo(() => subtotal + shipping, [shipping, subtotal]);

  return (
    <div className="min-h-screen bg-[#f5f5f7] px-6 pb-20 pt-28 md:px-12">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
        <main className="rounded-3xl bg-white p-6 shadow-sm lg:col-span-2 md:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-waymaker-dark/60">Checkout</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Secure Payment</h1>

          <div className="mt-8 grid gap-4">
            <input className="rounded-xl border border-black/15 px-4 py-3" placeholder="Email address" />
            <div className="grid gap-4 md:grid-cols-2">
              <input className="rounded-xl border border-black/15 px-4 py-3" placeholder="First name" />
              <input className="rounded-xl border border-black/15 px-4 py-3" placeholder="Last name" />
            </div>
            <input className="rounded-xl border border-black/15 px-4 py-3" placeholder="Street address" />
            <div className="grid gap-4 md:grid-cols-3">
              <input className="rounded-xl border border-black/15 px-4 py-3" placeholder="City" />
              <input className="rounded-xl border border-black/15 px-4 py-3" placeholder="State" />
              <input className="rounded-xl border border-black/15 px-4 py-3" placeholder="ZIP code" />
            </div>
          </div>

          <button className="mt-8 w-full rounded-full bg-waymaker-dark px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white">
            Place Order
          </button>
          <p className="mt-4 text-xs text-waymaker-dark/50">100% secure checkout. All products are authenticity verified.</p>
        </main>

        <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span>
                  {item.name} x {item.quantity}
                </span>
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
          <Link href="/cart" className="mt-5 inline-flex text-sm underline underline-offset-4">
            Edit bag
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
