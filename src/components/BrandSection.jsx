import brands from "../data/brand";
import BrandCard from "./BrandCard";

function BrandSection() {
  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <p className="text-orange-500 uppercase tracking-widest text-sm">
            Trusted Manufacturers
          </p>

          <h2 className="text-4xl font-bold mt-3">
            Supported Brands
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            We supply genuine OEM and premium aftermarket parts from
            the industry's most trusted heavy-duty manufacturers.
          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {brands.map((brand) => (
            <BrandCard
              key={brand.id}
              brand={brand}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default BrandSection;