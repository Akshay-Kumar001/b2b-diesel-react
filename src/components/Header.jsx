import { Link, NavLink } from "react-router-dom";
import logo from "../assets/img/b2b_logo.webp";

function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-4">
        {/* Logo */}
        <div className="w-16">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition ${isActive ? "text-red-600" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `transition ${isActive ? "text-red-600" : ""}`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `transition ${isActive ? "text-red-600" : ""}`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `transition ${isActive ? "text-red-600" : ""}`
            }
          >
            About
          </NavLink>
        </nav>

        <Link className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition">
          Contact Us
        </Link>
      </div>
    </header>
  );
}

export default Header;
