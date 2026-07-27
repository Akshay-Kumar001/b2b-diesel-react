import AddReview from "./AddReview";

function ProductReviews({ reviews  }) {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews available.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border rounded-lg p-5">
              {/* Review Header */}
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">{review.name}</h3>

                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= review.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* Review Comment */}
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      )}


      <AddReview  />
    </div>
  );
}

export default ProductReviews;
