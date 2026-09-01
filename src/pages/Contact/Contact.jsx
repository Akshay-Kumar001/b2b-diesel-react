import { Mail, MapPin, Clock, Phone } from "lucide-react";

function Contact() {
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
            Contact Us
          </h1>

          <p className="mt-4 text-sm md:text-base text-gray-200">
            We're here to help you find the right part.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-5 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-red-500 uppercase tracking-widest text-sm font-semibold">
            Get in Touch
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            How Can We Help?
          </h2>

          <p className="text-gray-600 mt-4 leading-7">
            We're here to help you find the right part for your heavy-duty
            truck. Get in touch with our team for product information,
            availability, or assistance with finding the right component.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">

          {/* Email */}
          <div className="border rounded-xl p-6 bg-white">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-lg flex items-center justify-center">
              <Mail size={23} />
            </div>

            <h3 className="text-lg font-bold mt-5">
              Email Us
            </h3>

            <p className="text-gray-600 mt-2 text-sm">
              info@b2btruckdieselparts.com
            </p>
          </div>

          {/* Phone */}
          <div className="border rounded-xl p-6 bg-white">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-lg flex items-center justify-center">
              <Phone size={23} />
            </div>

            <h3 className="text-lg font-bold mt-5">
              Call Us
            </h3>

            <p className="text-gray-600 mt-2 text-sm">
              +1 437-774-7882
            </p>
          </div>

          {/* Service Area */}
          <div className="border rounded-xl p-6 bg-white">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-lg flex items-center justify-center">
              <MapPin size={23} />
            </div>

            <h3 className="text-lg font-bold mt-5">
              Service Area
            </h3>

            <p className="text-gray-600 mt-2 text-sm">
              Serving Canada & North America
            </p>
          </div>

          {/* Business Hours */}
          <div className="border rounded-xl p-6 bg-white">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-lg flex items-center justify-center">
              <Clock size={23} />
            </div>

            <h3 className="text-lg font-bold mt-5">
              Business Hours
            </h3>

            <p className="text-gray-600 mt-2 text-sm">
              Monday – Saturday
              <br />
              8 AM – 12 PM
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Contact;