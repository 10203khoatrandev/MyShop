import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./screens/Homepage-ecommerce.tsx";
import ProductDetailPage from "./screens/Product-detail.tsx";
import ScrollToTop from "./components/ui/ScrollToTop.tsx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { CartProvider } from "./context/CartContext.tsx";
import { useCart } from "@/context/CartContext";
import CartPage from "./screens/Cart-UI.tsx";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { cart } = useCart();
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAnimate = () => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    };

    document.addEventListener("cart-add-animation", handleAnimate);
    return () =>
      document.removeEventListener("cart-add-animation", handleAnimate);
  }, []);

  return (
    <header className="bg-white px-6 py-4 border-b flex items-center justify-between">
      <a href="/" className="text-2xl font-bold text-gray-800">
        BINO SHOP
      </a>
      <nav className="hidden md:flex gap-6 text-sm text-gray-700">
        <DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)}>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1 hover:text-black focus:outline-none">
              Shop{" "}
              {isDropdownOpen ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuItem>About Us</DropdownMenuItem>
            <DropdownMenuItem>Collections</DropdownMenuItem>
            <DropdownMenuItem>Lookbook</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <a href="#" className="hover:text-black">
          On Sale
        </a>
        <a href="#" className="hover:text-black">
          New Arrivals
        </a>
        <a href="#" className="hover:text-black">
          Brands
        </a>
      </nav>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search for products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-48"
        />
        <Button className="hidden md:block">Search</Button>
        <div className="relative" onClick={() => navigate("/cart")}>
          <ShoppingCart className={`... ${animate ? "cart-animate" : ""}`} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </div>
        <User className="w-5 h-5 cursor-pointer hover:text-black" />
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 text-sm">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
        <div>
          <h3 className="font-bold mb-2">BINO SHOP</h3>
          <p className="text-gray-400">Your one-stop fashion destination</p>
        </div>
        <div>
          <h4 className="font-semibold mb-1">Company</h4>
          <ul className="text-gray-400">
            <li>About</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-1">Help</h4>
          <ul className="text-gray-400">
            <li>Support</li>
            <li>FAQs</li>
            <li>Shipping</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-1">Legal</h4>
          <ul className="text-gray-400">
            <li>Terms</li>
            <li>Privacy</li>
            <li>Cookies</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-10">© 2025 BINO SHOP</div>
    </footer>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);
