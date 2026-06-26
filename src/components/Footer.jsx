import logo from "../assets/img/b2b_logo.webp";

function Footer() {
  return (
    <footer className="bg-gray-100 ">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

        {/* Logo Section */}
        <div>
          <img src={logo} alt="Logo" className="h-20 mb-4" />
        </div>

        {/* About */}
        <div>
          <h3 className="font-semibold text-lg mb-3">About Us</h3>
          <p className="text-gray-600 text-sm leading-6">
            At <span className="font-semibold">B2B (Bolt to Block) Diesel Truck Parts</span>, 
            we’re dedicated to keeping your trucks on the road and your operations running smoothly.
            With deep roots in the heavy-duty industry, we understand what fleet owners, mechanics,
            and independent truckers truly need — reliable parts, competitive prices, and fast,
            dependable service.
          </p>
        </div>

        {/* Account */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Account</h3>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li className="hover:text-orange-500 cursor-pointer">My Account</li>
            <li className="hover:text-orange-500 cursor-pointer">My Cart</li>
            <li className="hover:text-orange-500 cursor-pointer">Sign In</li>
            <li className="hover:text-orange-500 cursor-pointer">Check Out</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
          <p className="text-gray-600 text-sm">Phone: +1 437-774-7882</p>
          <p className="text-gray-600 text-sm">Email: B2Btruckparts@gmail.com</p>

          <p className="text-gray-600 text-sm mt-4">London, Ontario</p>
          <p className="text-gray-600 text-sm">Medway Park Dr, N6G 0Z6</p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t text-center py-4 text-gray-500 text-sm">
        Copyright © 2025 - WordPress Theme by Creative Themes
      </div>

    </footer>
  );
}

export default Footer;