
import Review from "../models/Review.schema.js";
export const createReview = async (req, res) => {
  try {
    const data = req.body;
       const review = await Review.create(req.body);
    // 📥 Debug log to backend console
    console.log("📥 Incoming Body:", data);

    // Send back to frontend
    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: review,
    });
  } catch (err) {
    console.error("❌ Error creating review:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};