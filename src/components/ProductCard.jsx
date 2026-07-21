import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover mb-3"
        />
      </Link>
      <Link to={`/products/${product.id}`}  >
        <h3 className="font-semibold transition-all hover:text-red-600 ">{product.name}</h3>
      </Link>

      <p className="text-gray-600">₹{product.price}</p>

      <p className="text-sm text-green-600">
        {product.stock ? "In Stock" : "Out of Stock"}
      </p>

      <button className="mt-3 bg-red-500 text-white px-4 py-2 rounded w-full">
        Contact Seller
      </button>
    </div>
  );
}

export default ProductCard;
