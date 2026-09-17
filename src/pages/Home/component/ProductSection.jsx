import { useContext } from "react";
import ProductCard from "../../../components/ProductCard";
import ProductContext from "../../../context/ProductContext";

function ProductSection() {
  const { products, loading, error } = useContext(ProductContext);

  if (loading) {
  return (
    <div className="py-20 text-center">
      Loading products...
    </div>
  );
}

if (error) {
  return (
    <div className="py-20 text-center text-red-500">
      {error}
    </div>
  );
}
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Title */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Save on Open-Box Parts</h2>

        <button className="border px-4 py-2 text-sm hover:bg-black hover:text-white transition duration-300">
          VIEW ALL
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductSection;
