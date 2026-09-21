import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Products from "./pages/Product/Products";
import Services from "./pages/Service/Services";
import Contact from "./pages/Contact/Contact";
import ProductDetails from "./pages/Product/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProducts from "./pages/Admin/Products/AdminProducts";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminUsers from "./pages/Admin/User/AdminUsers";
import AdminOrders from "./pages/Admin/Orders/AdminOrders";
import AdminRoute from "./pages/Admin/AdminRoute";
function App() {
  return (
    <div className="main-app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
