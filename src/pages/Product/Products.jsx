import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import products from "../../data/products";
import ProductCard from "../../components/ProductCard";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromURL = searchParams.get("category");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(categoryFromURL || "All");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  // Create unique categories
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Filter products by search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Make sure current page is valid
  const safeCurrentPage = Math.min(currentPage, Math.max(totalPages, 1));

  // Get products for current page
  const startIndex = (safeCurrentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  // Search change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

 const handleCategoryChange = (item) => {
  setCategory(item);
  setCurrentPage(1);

  if (item === "All") {
    setSearchParams({});
  } else {
    setSearchParams({ category: item });
  }
};

  return (
    <>
    <section
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/img/banner-img-scaled.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative max-w-7xl mx-auto px-5 py-24 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold">Products</h1>

          <p className="mt-4 text-sm md:text-base text-gray-200">
            Quality Parts. Reliable Performance.
          </p>
        </div>
      </section>
    <div className="max-w-7xl mx-auto px-5 py-12">
      {/* Page Header */}
      

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
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
            onClick={() => handleCategoryChange(item)}
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

      {/* Product Count */}
      <div className="mb-5 text-sm text-gray-500">
        Showing {currentProducts.length} of {filteredProducts.length} products
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">No products found</h2>

          <p className="text-gray-500 mt-2">
            Try a different search term or category.
          </p>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              {/* Previous */}
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={safeCurrentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 transition disabled:opacity-40 disabled:cursor-not-allowed hover:border-red-500 hover:text-red-500"
              >
                Previous
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg border transition ${
                      safeCurrentPage === page
                        ? "bg-red-500 text-white border-red-500"
                        : "bg-white text-gray-700 border-gray-300 hover:border-red-500 hover:text-red-500"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next */}
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={safeCurrentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 transition disabled:opacity-40 disabled:cursor-not-allowed hover:border-red-500 hover:text-red-500"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
    </>
  );
}

export default Products;
