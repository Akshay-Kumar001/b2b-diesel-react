import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../context/CartContext";

function ProductCard({ product }) {
  const { cart, addToCart } = useContext(CartContext);

  const isInCart = cart.some(
    (item) => item._id === product._id
  );

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <Link to={`/products/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover mb-3 rounded"
        />
      </Link>

      <Link to={`/products/${product._id}`}>
        <h3 className="font-semibold transition-all hover:text-red-600">
          {product.name}
        </h3>
      </Link>

      <p className="text-gray-600">₹{product.price}</p>

      <p className="text-sm text-green-600">
        {product.stock ? "In Stock" : "Out of Stock"}
      </p>

      {isInCart ? (
        <Link
          to="/cart"
          className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full block text-center transition"
        >
          ✓ Added • Go to Cart
        </Link>
      ) : (
        <button
          onClick={() => addToCart(product)}
          className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full transition"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default ProductCard;