import { ArrowRight, Boxes, Truck, UserRoundCog, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

import NewsletterSection from "../../components/NewsletterSection";

function About() {
  const promises = [
    {
      id: 1,
      title: "Genuine OEM & Aftermarket Parts",
      description:
        "We source trusted parts that meet or exceed OEM standards for performance and durability.",
      icon: Boxes,
    },
    {
      id: 2,
      title: "Fast & Secure Shipping",
      description:
        "We ensure prompt delivery of every order, backed by reliable logistics partners.",
      icon: Truck,
    },
    {
      id: 3,
      title: "Expert Assistance",
      description:
        "Our experienced team helps you identify compatible parts and source rare components.",
      icon: UserRoundCog,
    },
    {
      id: 4,
      title: "Competitive Pricing",
      description:
        "Whether you're buying retail or wholesale, you'll always get the best value.",
      icon: DollarSign,
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section
        className="relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/src/assets/img/banner-img-scaled.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative max-w-7xl mx-auto px-5 py-24 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold">
            About Us
          </h1>

          <p className="mt-4 text-sm md:text-base text-gray-200">
            Built on Reliability. Driven by Quality.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Our Story
        </h2>

        <p className="mt-5 text-gray-500 leading-7">
          At B2B Diesel Truck Parts, we're dedicated to keeping your trucks
          on the road and your operations running smoothly. With deep roots in
          the heavy-duty industry, we understand what fleet owners,
          mechanics, and independent truckers truly need — reliable parts,
          competitive pricing, and fast, dependable service.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-5 pb-20">
        <div className="relative flex justify-center lg:justify-end">
          <div className="w-full lg:w-[68%]">
            <img
              src="/src/assets/img/truck-parts.jpg"
              alt="Diesel truck parts"
              className="w-full h-[420px] md:h-[520px] object-cover"
            />
          </div>

          <div className="bg-[#151218] text-white p-8 md:p-10 lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[55%]">
            <p className="text-red-500 uppercase tracking-widest text-sm font-semibold">
              Our Mission
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Quality Parts. Reliable Performance.
            </h2>

            <p className="text-gray-300 leading-7 mt-5">
              We aim to deliver quality truck and engine components that
              perform under pressure, ensuring that every mile you drive is
              powered by parts you can trust. Through partnerships with top
              manufacturers worldwide, we bring OEM and premium aftermarket
              solutions to customers across Canada and North America.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-7 bg-red-500 hover:bg-red-600 text-white px-6 py-3 transition"
            >
              Explore Shop
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Our Promise
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {promises.map((promise) => {
            const Icon = promise.icon;

            return (
              <div
                key={promise.id}
                className="bg-[#151218] text-white p-7 md:p-9"
              >
                <div className="flex items-start gap-5">
                  <div className="text-white mt-1">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-bold">
                      {promise.title}
                    </h3>

                    <p className="text-gray-300 text-sm leading-6 mt-3">
                      {promise.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
}

export default About;