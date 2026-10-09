import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Package, ArrowRight } from "lucide-react";
import API_URL from "../../config/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${API_URL}/api/orders/my-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch orders");
        }

        setOrders(data);
      } catch (error) {
        console.error("Orders error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // --------------------------------
  // LOADING
  // --------------------------------
  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-600">Loading orders...</p>
      </section>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ================================
          PAGE HEADER
      ================================= */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-5 py-10">
          <p className="text-red-500 uppercase tracking-widest text-sm font-semibold">
            My Account
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">
            My Orders
          </h1>

          <p className="text-gray-600 mt-3">
            Track and manage your recent orders.
          </p>
        </div>
      </section>

      {/* ================================
          ORDERS
      ================================= */}
      <section className="max-w-5xl mx-auto px-5 py-12">
        {orders.length === 0 ? (
          /* ================================
             EMPTY STATE
          ================================= */
          <div className="bg-white border rounded-2xl p-10 md:p-14 text-center">
            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-xl flex items-center justify-center mx-auto">
              <ShoppingBag size={25} />
            </div>

            <h2 className="text-xl font-bold text-gray-900 mt-5">
              No Orders Yet
            </h2>

            <p className="text-gray-600 mt-2">
              You haven't placed any orders yet.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div key={order._id} className="bg-white border rounded-2xl p-6">
                {/* ================================
                    ORDER HEADER
                ================================= */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-5 border-b">
                  <div>
                    <p className="text-lg font-bold text-gray-900 ">Order No: <span className="text-red-500 font-semibold"> #{order._id.slice(-8)} </span></p>

                    <div className="mt-2">
                      {order.items.slice(0, 2).map((item, index) => (
                        <p key={index} className="text-sm text-gray-600">
                          {item.name} × {item.quantity}
                        </p>
                      ))}

                      {order.items.length > 2 && (
                        <p className="text-sm text-gray-500 mt-1">
                          + {order.items.length - 2} more item
                          {order.items.length - 2 > 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <span
                    className={`inline-flex w-fit items-center px-3 py-1.5 rounded-full text-xs font-semibold capitalize
                      ${
                        order.status === "pending"
                          ? "bg-yellow-50 text-yellow-700"
                          : order.status === "confirmed"
                            ? "bg-blue-50 text-blue-700"
                            : order.status === "processing"
                              ? "bg-purple-50 text-purple-700"
                              : order.status === "shipped"
                                ? "bg-indigo-50 text-indigo-700"
                                : order.status === "delivered"
                                  ? "bg-green-50 text-green-700"
                                  : order.status === "cancelled"
                                    ? "bg-red-50 text-red-700"
                                    : "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* ================================
                    ORDER INFO
                ================================= */}
                <div className="grid sm:grid-cols-3 gap-5 py-6">
                  {/* Items */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center shrink-0">
                      <Package size={19} />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Items</p>

                      <p className="font-semibold text-gray-900 mt-1">
                        {order.items.length}
                      </p>
                    </div>
                  </div>

                  {/* Total */}
                  <div>
                    <p className="text-sm text-gray-500">Total</p>

                    <p className="text-lg font-bold text-gray-900 mt-1">
                      ₹{order.total.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-sm text-gray-500">Order Status</p>

                    <p className="font-semibold text-gray-900 mt-1 capitalize">
                      {order.status}
                    </p>
                  </div>
                </div>

                {/* ================================
                    ACTION
                ================================= */}
                <div className="pt-5 border-t flex justify-end">
                  <Link
                    to={`/account/orders/${order._id}`}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition font-medium flex items-center justify-center gap-2"
                  >
                    View Details
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default MyOrders;
