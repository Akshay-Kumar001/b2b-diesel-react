import { useState, useContext } from "react";
import CartContext from "../../context/CartContext";
function Checkout() {
  const { cart } = useContext(CartContext);
  const totalPrice = cart.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
  e.preventDefault();

  const order = {
    customer: formData,
    items: cart,
    total: totalPrice,
  };

  console.log("Order:", order);
};
  return (
    <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-5 py-12">
      <p className="text-orange-500 uppercase tracking-widest text-sm font-semibold">
        Complete Your Order
      </p>

      <h1 className="text-4xl font-bold mt-2">Checkout</h1>

      {/* Customer Information */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-5">Customer Information</h2>

        <div className="grid md:grid-cols-2 gap-5">
          {/* First Name */}
          <div>
            <label className="block mb-2 font-medium">First Name</label>

            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-2 font-medium">Last Name</label>

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-medium">Phone</label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Company</label>

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter your company name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Address</label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          {/* City */}
          <div>
            <label className="block mb-2 font-medium">City</label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          {/* State */}
          <div>
            <label className="block mb-2 font-medium">State</label>

            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          {/* Postal Code */}
          <div>
            <label className="block mb-2 font-medium">Postal Code</label>

            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Postal code"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="mt-8 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg transition font-medium"
      >
        Place Order
      </button>
    </form>
  );
}

export default Checkout;
