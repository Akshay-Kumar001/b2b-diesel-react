import logo from "../assets/img/b2b_logo.webp"
function Header() {
  return (
    <header className="w-full border-b bg-white">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-4">

        {/* Logo */}
        <div className="w-16">
          <img src={logo} alt="" />
        </div>

     
        <nav className="hidden md:flex items-center space-x-8 font-medium text-gray-700">

          <a
            href="#"
            className="hover:text-red-600 transition"
          >
            Home
          </a>

          <a
            href="#"
            className="hover:text-red-600 transition"
          >
            Products
          </a>

          <a
            href="#"
            className="hover:text-red-600 transition"
          >
            Services
          </a>

          <a
            href="#"
            className="hover:text-red-600 transition"
          >
            About
          </a>

          <a
            href="#"
            className="hover:text-red-600 transition"
          >
            Contact
          </a>

        </nav>

        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition">
          Contact Us
        </button>

      </div>

    </header>
  );
}

export default Header;