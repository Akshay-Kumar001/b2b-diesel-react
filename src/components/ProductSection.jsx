import products from "../data/products";
import ProductCard from "./ProductCard";

function ProductSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">

      {/* Title */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">
          Save on Open-Box Parts
        </h2>

        <button className="border px-4 py-2 text-sm hover:bg-black hover:text-white transition duration-300">
          VIEW ALL
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>

    </section>
  );
}

export default ProductSection;