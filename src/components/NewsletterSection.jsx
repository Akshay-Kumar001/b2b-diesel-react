import { useState } from "react";
import newsletterBg from "../assets/img/news-letter-bg.avif";

function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email);

    alert("Thanks for subscribing!");

    setEmail("");
  };

  return (
    <section
      className="relative py-24 bg-cover bg-center"
      style={{
        backgroundImage: `url(${newsletterBg})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto">

        <div className="bg-black/70 px-10 py-16 text-center rounded">

          <h2 className="text-5xl font-bold text-white">
            Newsletter Updates
          </h2>

          <p className="text-gray-300 mt-5 text-lg">
            Subscribe to receive emails on new product arrivals &
            special offers
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col md:flex-row justify-center gap-4"
          >
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                bg-white
                w-full
                md:w-96
                px-5
                py-4
                rounded
                outline-none
              "
            />

            <button
              className="
                bg-red-500
                hover:bg-red-600
                transition
                px-8
                py-4
                text-white
                font-semibold
                rounded
              "
            >
              Subscribe
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}

export default NewsletterSection;