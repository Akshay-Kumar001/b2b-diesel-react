import features from "../data/features";
import FeatureCard from "./FeatureCard";

function FeatureSection() {
  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <p className="text-orange-500 uppercase tracking-widest font-semibold">
            Why Choose Us
          </p>

          <h2 className="text-4xl font-bold mt-3">
            Trusted by Truck Owners & Repair Shops
          </h2>

          <p className="text-gray-500 mt-5 max-w-2xl mx-auto">
            We are committed to providing reliable truck parts,
            outstanding customer service, and fast delivery.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default FeatureSection;