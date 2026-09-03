
import { Link } from "react-router-dom";
import products from "../../../data/products";

function CategorySection() {
  const categories = [
  ...new Set(products.map((product) => product.category)),
];


  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Subtitle */}
        <p className="text-red-500 text-sm mb-2">Check our products</p>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-10">
          Explore Our Parts Categories
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.length > 0 ? (
            categories.map((item, index) => (
              <Link
                key={index}
                to={`/products?category=${item}`}
                className="p-4 border text-sm font-medium cursor-pointer transition transition duration-300 bg-white text-black hover:bg-red-500 hover:text-white"
                
              >
                {item}
              </Link>
            ))
          ) : (
            <p className="text-xl">No products found.</p>
          )}
        </div>

        {/* Button */}
        <Link to="/products"
         className="mt-10 bg-red-500 hover:bg-red-600 px-6 py-3">
          SHOP NOW
        </Link>
      </div>
    </section>
  );
}

export default CategorySection;
