import { useState, useContext, useEffect } from "react";
import CartContext from "../../context/CartContext";
import { Link } from "react-router-dom";
import API_URL from "../../config/api";
import AuthContext from "../../context/AuthContext";
import AuthModal from "../../components/AuthModal";

// Razorpay payment integration
const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });

// Checkout component
function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
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
  useEffect(() => {
    const fetchShippingAddress = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const response = await fetch(
          `${API_URL}/api/users/me/shipping`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();
        console.log("Shipping response:", response.status);
        console.log("Shipping data:", data);
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch shipping address");
        }

        if (!data || !data.name) return;

        const nameParts = data.name.trim().split(" ");

        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ");

        setFormData((prev) => ({
          ...prev,
          firstName,
          lastName,
          email: user?.email || "",
          phone: data.phone || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          postalCode: data.pincode || "",
        }));
      } catch (error) {
        console.error("Shipping address error:", error);
      }
    };

    fetchShippingAddress();
  }, []);
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isProcessing) return;

    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[6-9]\d{9}$/;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!phonePattern.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    setErrors({});
    setPaymentMessage("");
    setIsProcessing(true);

    const shippingAddress = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.postalCode,
    };

    try {
      const token = localStorage.getItem("token");

      const addressResponse = await fetch(`${API_URL}/api/users/me/shipping`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(shippingAddress),
      });

      if (!addressResponse.ok) {
        const addressResult = await addressResponse.json();
        throw new Error(
          addressResult.message || "Could not save shipping address",
        );
      }
    } catch (error) {
      console.error("Shipping address save error:", error);
      setPaymentMessage(
        "Could not save your shipping address. Please try again.",
      );
      setIsProcessing(false);
      return;
    }

    const orderItems = cart.map((item) => ({
      product: item._id,
      quantity: item.quantity,
    }));

    try {
      // 1. Create a Razorpay order. This must not save a MongoDB Order.
      const response = await fetch("${API_URL}/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          items: orderItems,
          shippingAddress,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to start payment");
      }

      // 2. Load Razorpay checkout.
      const loaded = await loadRazorpay();

      if (!loaded) {
        throw new Error("Unable to load Razorpay. Please try again.");
      }

      // 3. Open the payment popup.
      const options = {
        key: data.keyId,
        amount: data.razorpayOrder.amount,
        currency: data.razorpayOrder.currency,
        name: "B2B Diesel",
        description: "Order payment",
        order_id: data.razorpayOrder.id,

        prefill: {
          name: shippingAddress.name,
          email: formData.email,
          contact: formData.phone,
        },

        handler: async function (response) {
          try {
            console.log("Razorpay payment received:", {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signatureReceived: Boolean(response.razorpay_signature),
            });

            const verificationResponse = await fetch(
              "${API_URL}/api/orders/verify-payment",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              },
            );

            const result = await verificationResponse.json();

            console.log("Verification status:", verificationResponse.status);
            console.log("Verification result:", result);

            if (!verificationResponse.ok) {
              setPaymentMessage(
                result.message || "Payment verification failed.",
              );
              setIsProcessing(false);
              return;
            }

            setCart([]);
            setPaymentMessage("");
            setOrderPlaced(true);
            setIsProcessing(false);
          } catch (error) {
            console.error("Payment verification error:", error);
            setPaymentMessage(
              "Payment may have succeeded, but order confirmation failed. Please contact support.",
            );
            setIsProcessing(false);
          }
        },

        modal: {
          ondismiss: () => {
            setPaymentMessage("Payment cancelled. No order was placed.");
            setIsProcessing(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (event) => {
        setPaymentMessage(
          event.error?.description || "Payment failed. Please try again.",
        );
        setIsProcessing(false);
      });

      razorpay.open();
    } catch (error) {
      console.error("Checkout error:", error);
      setPaymentMessage(error.message);
      setIsProcessing(false);
    }
  };

  // Render
  if (orderPlaced) {
    return (
      <div className="max-w-7xl mx-auto px-5 py-16 text-center">
        <div className="bg-white border rounded-xl p-10">
          <h1 className="text-3xl font-bold">Order Placed Successfully!</h1>

          <p className="text-gray-500 mt-3">
            Thank you for your order. We will contact you shortly.
          </p>
        </div>
      </div>
    );
  }
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-5 py-16 text-center">
        <h1 className="text-3xl font-bold">Your Cart is Empty</h1>

        <p className="text-gray-500 mt-3">
          Please add a product before proceeding to checkout.
        </p>

        <Link
          to="/products"
          className="inline-block mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-5 py-12">
        {/* Page Header */}
        <div className="mb-10">
          <p className="text-red-500 uppercase tracking-widest text-sm font-semibold">
            Complete Your Order
          </p>

          <h1 className="text-4xl font-bold mt-2">Checkout</h1>
        </div>

        {/* Main Checkout Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Customer Information */}
          <div className="lg:col-span-2 bg-white border rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6">Customer Information</h2>

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

                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
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

                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
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

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
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

                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
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

                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
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

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <div className="bg-gray-50 border rounded-xl p-6 ">
                <h2 className="text-xl font-bold">Order Summary</h2>

                <div className="mt-6 space-y-5">
                  {cart.map((item) => (
                    <div key={item._id} className="flex justify-between gap-4">
                      <div>
                        <p className="font-medium">{item.name}</p>

                        <p className="text-sm text-gray-500 mt-1">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="font-medium whitespace-nowrap">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-6 pt-5 flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>

                  <span className="text-xl font-bold text-red-500">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
              <div className="mt-8 flex-col  justify-end">
                {paymentMessage && (
                  <p className="text-red-600 text-sm mb-2" role="alert">
                    {paymentMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white px-8 py-3 rounded-lg transition font-medium"
                >
                  {isProcessing ? "Processing..." : "Pay Now"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
      </form>
      {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} />}
    </div>
  );
}

export default Checkout;
