import FeatureSection from "../../components/FeatureSection";
import NewsletterSection from "../../components/NewsletterSection";
import services from "../../data/service";
import ServiceCard from "./component/ServiceCard";
function Services() {
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
            <h1 className="text-4xl md:text-6xl font-bold">Services</h1>

            <p className="mt-4 text-sm md:text-base text-gray-200">
              Reliable Support for Heavy-Duty Applications.
            </p>
          </div>
        </section>
      <div className="max-w-7xl mx-auto px-10 py-12">
        {/* Page Header */}
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
      <FeatureSection />
      <NewsletterSection />
    </>
  );
}

export default Services;
