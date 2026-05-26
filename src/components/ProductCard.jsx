function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover mb-3"
      />

      <h3 className="font-semibold">{product.name}</h3>

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