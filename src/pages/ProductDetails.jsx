import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import products from "../data/products";
import ProductDescription from "../components/ProductDescription";
import ProductReviews from "../components/ProductReviews";
import ProductTabs from "../components/ProductTabs";

function ProductDetails() {
  const { id } = useParams();

  const product = products.find((product) => product.id === Number(id));
  console.log("URL id:", id);
  const [activeTab, setActiveTab] = useState("description");
const [reviews, setReviews] = useState(product.reviews);
  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
        <Link to="/" className="hover:text-red-600 transition">
          Home
        </Link>

        <span>/</span>

        <Link to="/products" className="hover:text-red-600 transition">
          Products
        </Link>

        <span>/</span>

        <span className="text-gray-900 font-medium">{product.name}</span>
      </div>
      {/* Product Section */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Side */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-xl shadow-lg"
          />
        </div>

        {/* Right Side */}
        <div>
          <p className="text-sm text-red-500 font-medium">{product.category}</p>

          <h1 className="text-4xl font-bold mt-2">{product.name}</h1>

          <h2 className="text-3xl font-semibold text-red-600 mt-5">
            ₹{product.price}
          </h2>

          <div className="mt-6 space-y-3">
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {product.category}
            </p>

            <p>
              <span className="font-semibold">Stock:</span>{" "}
              {product.stock ? (
                <span className="text-green-600">In Stock</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </p>
          </div>

          <button className="mt-8 bg-red-600 hover:bg-red-700 transition text-white px-8 py-3 rounded-lg">
            Contact Seller
          </button>
        </div>
      </div>
      {/* Tabs */}
      <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab} reviews={product.reviews} />
      {activeTab === "description" && <ProductDescription product={product} />}
      {activeTab === "reviews" && <ProductReviews reviews={product.reviews} />}
    </div>
  );
}

export default ProductDetails;
