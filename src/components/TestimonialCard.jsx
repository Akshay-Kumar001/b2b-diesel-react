function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition">

      <div className="text-yellow-400 text-xl mb-4">
        {"⭐".repeat(testimonial.rating)}
      </div>

      <p className="text-gray-600 italic leading-7">
        "{testimonial.review}"
      </p>

      <div className="mt-6">
        <h3 className="font-bold text-lg">
          {testimonial.name}
        </h3>

        <p className="text-gray-500 text-sm">
          {testimonial.company}
        </p>
      </div>

    </div>
  );
}

export default TestimonialCard;