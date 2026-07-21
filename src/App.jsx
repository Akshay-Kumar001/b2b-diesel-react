import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";

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

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
