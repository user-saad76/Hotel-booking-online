import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Validation schema
const reviewSchema = z.object({
  name: z.string().min(2, "Name is required"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be 5 or less"),
  review: z.string().min(10, "Review must be at least 10 characters"),
});

function Review({ reviews }) {


  console.log("Reviews from props:", reviews);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(reviewSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:7000/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();
      console.log("✅ Review saved:", result);

      if (result.success) {
        alert("Review submitted successfully!");
        reset();
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("❌ Error submitting review:", error);
      alert("Server error, try again later.");
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Leave a Review</h5>

          {/* ✅ Review Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                {...register("name")}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>

            {/* Rating */}
            <div className="mb-3">
              <label className="form-label">Rating (1 - 5)</label>
              <input
                type="number"
                className={`form-control ${errors.rating ? "is-invalid" : ""}`}
                {...register("rating", { valueAsNumber: true })}
                min="1"
                max="5"
              />
              {errors.rating && (
                <div className="invalid-feedback">{errors.rating.message}</div>
              )}
            </div>

            {/* Review */}
            <div className="mb-3">
              <label className="form-label">Your Review</label>
              <textarea
                rows="4"
                className={`form-control ${errors.review ? "is-invalid" : ""}`}
                {...register("review")}
              ></textarea>
              {errors.review && (
                <div className="invalid-feedback">{errors.review.message}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Submit Review
            </button>
          </form>

          {/* ✅ Reviews List */}
          <div id="reviews" className="card mt-4 mb-3">
            <div className="card-body">
              <h5 className="card-title">Guest Reviews</h5>

              {!reviews ? (
                <p className="text-muted small">Loading reviews...</p>
              ) : Array.isArray(reviews) && reviews.length > 0 ? (
                reviews.map((review) => (
                  <div className="mb-3 border-bottom pb-2" key={review._id}>
                    <div className="d-flex justify-content-between">
                      <div>
                        <strong>{review.name}</strong>
                        <div className="small text-muted">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                        <div className="small mt-1">“{review.review}”</div>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold">
                          {Number(review.rating).toFixed(1)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted small">No reviews yet.</p>
              )}

              <a href="#top" className="small">Read all reviews</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
