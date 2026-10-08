import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  MapPin,
  Phone,
  User,
  Edit,
  Save,
  X,
  ShoppingBag,
  CreditCard,
} from "lucide-react";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const [editingShipping, setEditingShipping] = useState(false);
  const [shippingForm, setShippingForm] = useState({});
  const [savingShipping, setSavingShipping] = useState(false);

  const [cancellingOrder, setCancellingOrder] = useState(false);

  // --------------------------------
  // FETCH ORDER
  // --------------------------------
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:5000/api/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch order"
          );
        }

        setOrder(data);
      } catch (error) {
        console.error("Order details error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // --------------------------------
  // START SHIPPING EDIT
  // --------------------------------
  const startEditingShipping = () => {
    setShippingForm({
      name: order.shippingAddress.name || "",
      phone: order.shippingAddress.phone || "",
      address: order.shippingAddress.address || "",
      city: order.shippingAddress.city || "",
      state: order.shippingAddress.state || "",
      pincode: order.shippingAddress.pincode || "",
    });

    setEditingShipping(true);
  };

  // --------------------------------
  // SAVE SHIPPING
  // --------------------------------
  const saveShipping = async () => {
    try {
      setSavingShipping(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/orders/${id}/shipping`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(shippingForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update shipping address"
        );
      }

      setOrder(data.order);
      setEditingShipping(false);

      alert("Shipping address updated successfully");
    } catch (error) {
      console.error("Update shipping error:", error);
      alert(error.message);
    } finally {
      setSavingShipping(false);
    }
  };

  // --------------------------------
  // CANCEL ORDER
  // --------------------------------
  const cancelOrder = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancellingOrder(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/orders/${id}/cancel`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to cancel order"
        );
      }

      setOrder(data.order);

      alert("Order cancelled successfully");
    } catch (error) {
      console.error("Cancel order error:", error);
      alert(error.message);
    } finally {
      setCancellingOrder(false);
    }
  };

  // --------------------------------
  // LOADING
  // --------------------------------
  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-600">
          Loading order...
        </p>
      </section>
    );
  }

  // --------------------------------
  // ORDER NOT FOUND
  // --------------------------------
  if (!order) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">
            Order Not Found
          </h2>

          <p className="text-gray-600 mt-2">
            We couldn't find this order.
          </p>

          <Link
            to="/account/orders"
            className="inline-flex items-center gap-2 mt-5 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition font-medium"
          >
            <ArrowLeft size={17} />
            Back to Orders
          </Link>
        </div>
      </section>
    );
  }

  // --------------------------------
  // STATUS STYLES
  // --------------------------------
  const statusStyles = {
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    confirmed: "bg-blue-50 text-blue-700 border-blue-200",
    processing: "bg-purple-50 text-purple-700 border-purple-200",
    shipped: "bg-indigo-50 text-indigo-700 border-indigo-200",
    delivered: "bg-green-50 text-green-700 border-green-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* =================================
          PAGE HEADER
      ================================== */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-5 py-10">

          {/* Back */}
          <Link
            to="/account/orders"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-500 transition"
          >
            <ArrowLeft size={17} />
            Back to Orders
          </Link>

          <div className="mt-6">
            <p className="text-red-500 uppercase tracking-widest text-sm font-semibold">
              My Account
            </p>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-2">

              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Order Details
                </h1>

                <p className="text-gray-500 mt-2 text-sm break-all">
                  Order #{order._id.slice(-8)}
                </p>
              </div>

              {/* Status */}
              <span
                className={`inline-flex w-fit items-center px-4 py-2 rounded-full border text-sm font-semibold capitalize ${
                  statusStyles[order.status] ||
                  "bg-gray-100 text-gray-700 border-gray-200"
                }`}
              >
                {order.status}
              </span>

            </div>
          </div>
        </div>
      </section>

      {/* =================================
          MAIN CONTENT
      ================================== */}
      <section className="max-w-7xl mx-auto px-5 py-12">

        <div className="grid lg:grid-cols-3 gap-6">

          {/* =================================
              PRODUCTS
          ================================== */}
          <div className="lg:col-span-2">

            <div className="bg-white border rounded-2xl">

              {/* Header */}
              <div className="flex items-center gap-3 p-6 border-b">

                <div className="w-11 h-11 bg-red-50 text-red-500 rounded-lg flex items-center justify-center">
                  <ShoppingBag size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Order Items
                  </h2>

                  <p className="text-sm text-gray-600 mt-1">
                    {order.items.length}{" "}
                    {order.items.length === 1
                      ? "item"
                      : "items"}{" "}
                    in this order
                  </p>
                </div>

              </div>

              {/* Products */}
              <div className="divide-y">

                {order.items.map((item) => (
                  <div
                    key={item.product}
                    className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  >

                    <div className="flex items-start gap-4">

                      <div className="w-12 h-12 bg-gray-50 border rounded-lg flex items-center justify-center shrink-0">
                        <Package
                          size={21}
                          className="text-gray-500"
                        />
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {item.name}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                    </div>

                    <div className="sm:text-right">
                      <p className="text-sm text-gray-500">
                        Price
                      </p>

                      <p className="font-bold text-gray-900 mt-1">
                        ₹
                        {item.price.toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>

                  </div>
                ))}

              </div>

              {/* Total */}
              <div className="border-t p-6">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">
                    <CreditCard
                      size={19}
                      className="text-gray-500"
                    />

                    <span className="font-medium text-gray-700">
                      Order Total
                    </span>
                  </div>

                  <span className="text-xl font-bold text-gray-900">
                    ₹
                    {order.total.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

              </div>
            </div>

          </div>

          {/* =================================
              SHIPPING ADDRESS
          ================================== */}
          <div>

            <div className="bg-white border rounded-2xl">

              {/* Header */}
              <div className="flex items-center gap-3 p-6 border-b">

                <div className="w-11 h-11 bg-red-50 text-red-500 rounded-lg flex items-center justify-center">
                  <MapPin size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Shipping Address
                  </h2>

                  <p className="text-sm text-gray-600 mt-1">
                    Delivery information
                  </p>
                </div>

              </div>

              {/* Address */}
              {!editingShipping ? (
                <div className="p-6">

                  <div className="space-y-5">

                    {/* Name */}
                    <div className="flex items-start gap-3">
                      <User
                        size={18}
                        className="text-gray-400 mt-0.5 shrink-0"
                      />

                      <div>
                        <p className="text-xs text-gray-500">
                          Name
                        </p>

                        <p className="font-medium text-gray-900 mt-1">
                          {order.shippingAddress.name}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-3">
                      <Phone
                        size={18}
                        className="text-gray-400 mt-0.5 shrink-0"
                      />

                      <div>
                        <p className="text-xs text-gray-500">
                          Phone
                        </p>

                        <p className="font-medium text-gray-900 mt-1">
                          {order.shippingAddress.phone}
                        </p>
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <p className="text-xs text-gray-500">
                        Address
                      </p>

                      <p className="font-medium text-gray-900 mt-1 leading-6">
                        {order.shippingAddress.address}
                      </p>
                    </div>

                    {/* Location */}
                    <div>
                      <p className="text-xs text-gray-500">
                        Location
                      </p>

                      <p className="font-medium text-gray-900 mt-1">
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}
                      </p>
                    </div>

                    {/* Pincode */}
                    <div>
                      <p className="text-xs text-gray-500">
                        Pincode
                      </p>

                      <p className="font-medium text-gray-900 mt-1">
                        {order.shippingAddress.pincode}
                      </p>
                    </div>

                  </div>

                  {/* Edit */}
                  <button
                    onClick={startEditingShipping}
                    className="w-full mt-7 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg transition font-medium flex items-center justify-center gap-2"
                  >
                    <Edit size={17} />
                    Edit Shipping
                  </button>

                </div>
              ) : (
                /* =================================
                   EDIT SHIPPING
                ================================== */
                <div className="p-6">

                  <div className="space-y-5">

                    {/* Name */}
                    <div>
                      <label className="block mb-2 font-medium text-gray-900">
                        Name
                      </label>

                      <input
                        type="text"
                        value={shippingForm.name}
                        onChange={(e) =>
                          setShippingForm({
                            ...shippingForm,
                            name: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block mb-2 font-medium text-gray-900">
                        Phone
                      </label>

                      <input
                        type="text"
                        value={shippingForm.phone}
                        onChange={(e) =>
                          setShippingForm({
                            ...shippingForm,
                            phone: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block mb-2 font-medium text-gray-900">
                        Address
                      </label>

                      <input
                        type="text"
                        value={shippingForm.address}
                        onChange={(e) =>
                          setShippingForm({
                            ...shippingForm,
                            address: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="block mb-2 font-medium text-gray-900">
                        City
                      </label>

                      <input
                        type="text"
                        value={shippingForm.city}
                        onChange={(e) =>
                          setShippingForm({
                            ...shippingForm,
                            city: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                      />
                    </div>

                    {/* State */}
                    <div>
                      <label className="block mb-2 font-medium text-gray-900">
                        State
                      </label>

                      <input
                        type="text"
                        value={shippingForm.state}
                        onChange={(e) =>
                          setShippingForm({
                            ...shippingForm,
                            state: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                      />
                    </div>

                    {/* Pincode */}
                    <div>
                      <label className="block mb-2 font-medium text-gray-900">
                        Pincode
                      </label>

                      <input
                        type="text"
                        value={shippingForm.pincode}
                        onChange={(e) =>
                          setShippingForm({
                            ...shippingForm,
                            pincode: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                      />
                    </div>

                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-3 mt-7">

                    <button
                      onClick={saveShipping}
                      disabled={savingShipping}
                      className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white px-5 py-3 rounded-lg transition font-medium flex items-center justify-center gap-2"
                    >
                      <Save size={17} />

                      {savingShipping
                        ? "Saving..."
                        : "Save Shipping"}
                    </button>

                    <button
                      onClick={() =>
                        setEditingShipping(false)
                      }
                      className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-3 rounded-lg transition font-medium flex items-center justify-center gap-2"
                    >
                      <X size={17} />
                      Cancel
                    </button>

                  </div>

                </div>
              )}

            </div>

            {/* =================================
                CANCEL ORDER
            ================================== */}
            {(order.status === "pending" ||
              order.status === "confirmed") && (
              <button
                onClick={cancelOrder}
                disabled={cancellingOrder}
                className="w-full mt-4 border border-red-200 bg-white hover:bg-red-50 text-red-500 px-5 py-3 rounded-xl transition font-medium flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {cancellingOrder
                  ? "Cancelling..."
                  : "Cancel Order"}
              </button>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}

export default OrderDetails;