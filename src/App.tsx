import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./views/Index";
import NotFound from "./views/NotFound";
import Biography from "./views/Biography";
import Discography from "./views/Discography";
import Tour from "./views/Tour";
import Listen from "./views/Listen";
import Shop from "./views/Shop";
import ProductDetail from "./views/ProductDetail";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/biography" element={<Biography />} />
          <Route path="/discography" element={<Discography />} />
          <Route path="/tour" element={<Tour />} />
          <Route path="/listen" element={<Listen />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:handle" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
