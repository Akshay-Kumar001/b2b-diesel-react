import { Mail, MapPin, Clock, Phone } from "lucide-react";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
  };
  return (
    <div>
      {/* Hero */}
      <section
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/img/banner-img-scaled.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative max-w-7xl mx-auto px-5 py-24 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold">Contact Us</h1>

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

            <h3 className="text-lg font-bold mt-5">Email Us</h3>

            <p className="text-gray-600 mt-2 text-sm">
              info@b2btruckdieselparts.com
            </p>
          </div>

          {/* Phone */}
          <div className="border rounded-xl p-6 bg-white">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-lg flex items-center justify-center">
              <Phone size={23} />
            </div>

            <h3 className="text-lg font-bold mt-5">Call Us</h3>

            <p className="text-gray-600 mt-2 text-sm">+1 437-774-7882</p>
          </div>

          {/* Service Area */}
          <div className="border rounded-xl p-6 bg-white">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-lg flex items-center justify-center">
              <MapPin size={23} />
            </div>

            <h3 className="text-lg font-bold mt-5">Service Area</h3>

            <p className="text-gray-600 mt-2 text-sm">
              Serving Canada & North America
            </p>
          </div>

          {/* Business Hours */}
          <div className="border rounded-xl p-6 bg-white">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-lg flex items-center justify-center">
              <Clock size={23} />
            </div>

            <h3 className="text-lg font-bold mt-5">Business Hours</h3>

            <p className="text-gray-600 mt-2 text-sm">
              Monday – Saturday
              <br />8 AM – 12 PM
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-5xl mx-auto px-5 pb-16">
        <div className="bg-white border rounded-2xl p-6 md:p-10">
          <div className="max-w-2xl mb-8">
            <p className="text-red-500 uppercase tracking-widest text-sm font-semibold">
              Send Us a Message
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Have a Question?
            </h2>

            <p className="text-gray-600 mt-3 leading-7">
              Tell us what you need and our team will get back to you as soon as
              possible.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block mb-2 font-medium">Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 font-medium">Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-2 font-medium">Phone</label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block mb-2 font-medium">Subject</label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What can we help you with?"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">Message</label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us what you need..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg transition font-medium"
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;
