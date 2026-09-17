import { useEffect, useState } from "react";
import API_URL from "../../config/api";
import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";

import { Package, Users, ShoppingCart, IndianRupee } from "lucide-react";
function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await fetch(`${API_URL}/api/dashboard`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch dashboard stats");
        }

        setStats(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        {loading && <p className="mt-8 text-gray-500">Loading dashboard...</p>}

        {error && <p className="mt-8 text-red-500">{error}</p>}
       {!loading && !error && stats && (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
    <StatCard
      title="Products"
      value={stats.products}
      icon={Package}
    />

    <StatCard
      title="Users"
      value={stats.users}
      icon={Users}
    />

    <StatCard
      title="Orders"
      value={stats.orders}
      icon={ShoppingCart}
    />

    <StatCard
      title="Revenue"
      value={`₹${stats.revenue}`}
      icon={IndianRupee}
    />
  </div>
)}
      </main>
    </div>
  );
}

export default AdminDashboard;
