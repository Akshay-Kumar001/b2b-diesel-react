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
            className="hover:text-orange-500 transition"
          >
            Home
          </a>

          <a
            href="#"
            className="hover:text-orange-500 transition"
          >
            Products
          </a>

          <a
            href="#"
            className="hover:text-orange-500 transition"
          >
            Services
          </a>

          <a
            href="#"
            className="hover:text-orange-500 transition"
          >
            About
          </a>

          <a
            href="#"
            className="hover:text-orange-500 transition"
          >
            Contact
          </a>

        </nav>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition">
          Contact Us
        </button>

      </div>

    </header>
  );
}

export default Header;