import { useState } from "react";
import products from "../../data/products";
import ProductCard from "../../components/ProductCard";

function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Create unique categories from product data
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Filter products by search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-5 py-12">
      {/* Page Header */}
      <div className="mb-10">
        <p className="text-red-500 uppercase tracking-widest text-sm font-semibold">
          Our Products
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mt-2">
          Heavy-Duty Truck Parts
        </h1>

        <p className="text-gray-600 mt-4 max-w-2xl leading-7">
          Explore our range of reliable OEM and aftermarket truck and engine
          parts for heavy-duty applications.
        </p>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`px-4 py-2 rounded-lg border transition ${
              category === item
                ? "bg-red-500 text-white border-red-500"
                : "bg-white text-gray-700 border-gray-300 hover:border-red-500 hover:text-red-500"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">
            No products found
          </h2>

          <p className="text-gray-500 mt-2">
            Try a different search term or category.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;