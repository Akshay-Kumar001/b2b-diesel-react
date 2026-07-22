import { useState } from "react";

function AddReview() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      name,
      comment,
      rating,
    });

    setName("");
    setComment("");
    setRating(0);
  };

  return (
    <section className="mt-16 bg-white py-8 ">

      <p className="text-orange-500 uppercase tracking-widest font-semibold">
        Share Your Experience
      </p>

      <h2 className="text-4xl font-bold mt-3 mb-8">
        Leave a Review
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block mb-2 font-medium">
            Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-5 py-3 outline-none"
          />
        </div>

        <div>
          <label className="block mb-3 font-medium">
            Rating
          </label>

          <div className="flex gap-2 text-4xl cursor-pointer select-none">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`transition ${
                  star <= rating
                    ? "text-yellow-400"
                    : "text-gray-300 hover:text-red-500"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Comment
          </label>

          <textarea
            rows={5}
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-5 py-3 outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg transition font-medium"
        >
          Submit Review
        </button>

      </form>
    </section>
  );
}

export default AddReview;