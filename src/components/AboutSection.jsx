import about from "../data/about";

function AboutSection() {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Image */}

          <div>
            <img
              src={about.image}
              alt={about.heading}
              className="rounded-xl shadow-lg w-full"
            />
          </div>

          {/* Content */}

          <div>

            <p className="text-orange-500 font-semibold uppercase tracking-widest">
              {about.title}
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {about.heading}
            </h2>

            <p className="text-gray-600 leading-8 mt-6">
              {about.description}
            </p>

            <button className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg transition">
              Learn More
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default AboutSection;