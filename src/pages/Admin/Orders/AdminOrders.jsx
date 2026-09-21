import { useEffect, useState } from "react";
import API_URL from "../../../config/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch orders");
        }

        setOrders(data);
      } catch (error) {
        console.error("Fetch orders error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `${API_URL}/api/orders/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update order status");
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
    } catch (error) {
      console.error("Update order status error:", error);
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Orders</h1>

      <p className="mt-2 text-gray-600">Manage customer orders.</p>

      {loading && <p className="mt-8 text-gray-500">Loading orders...</p>}

      {error && <p className="mt-8 text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">Customer</th>
                <th className="text-left p-4">Items</th>
                <th className="text-left p-4">Total</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="p-4">
                    <p className="font-medium">{order.customer?.name}</p>

                    <p className="text-sm text-gray-500">
                      {order.customer?.email}
                    </p>
                  </td>

                  <td className="p-4">
                    <div className="space-y-1">
                      {order.items.map((item) => (
                        <div key={item.product}>
                          <span className="font-medium">{item.name}</span>

                          <span className="text-gray-500 ml-2">
                            × {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="p-4 font-medium">₹{order.total}</td>

                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="border rounded-lg px-3 py-2 outline-none focus:border-red-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="p-4 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
