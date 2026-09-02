import { Link, NavLink } from "react-router-dom";
import { UserRound, ShoppingCart } from "lucide-react";
import { useContext, useState } from "react";
import logo from "../assets/img/b2b_logo.webp";
import CartContext from "../context/CartContext";
import AuthModal from "./AuthModal";

function Header() {
  const { cart } = useContext(CartContext);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-4">
        {/* Logo */}
        <div className="w-16">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition ${isActive ? "text-red-600" : "hover:text-red-600"}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `transition ${isActive ? "text-red-600" : "hover:text-red-600"}`
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              `transition ${isActive ? "text-red-600" : "hover:text-red-600"}`
            }
          >
            Services
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `transition ${isActive ? "text-red-600" : "hover:text-red-600"}`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `transition ${isActive ? "text-red-600" : "hover:text-red-600"}`
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-5">
          {/* Login */}
          <button
            onClick={() => setIsAuthOpen(true)}
            className="flex items-center gap-2"
          >
            <UserRound size={20} strokeWidth={1.8} />

            <span className="hidden sm:inline">Login</span>
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center text-gray-700 hover:text-red-600 transition"
          >
            <ShoppingCart size={21} strokeWidth={1.8} />

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
      {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} />}
    </header>
  );
}

export default Header;
