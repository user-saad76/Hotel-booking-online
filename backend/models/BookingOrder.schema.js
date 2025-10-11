import mongoose from "mongoose";

const lineItemSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Room or item name
  description: { type: String },
  amount_subtotal: { type: Number }, // in cents, before tax/discount
  amount_total: { type: Number },    // in cents, after tax/discount
  currency: { type: String, default: "usd" },
  quantity: { type: Number, default: 1 },
  price_data: {
    unit_amount: { type: Number }, // price per night in cents
    currency: { type: String },
  },
});

const bookingOrderSchema = new mongoose.Schema(
  {
    // //userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    // hotelId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Hotel",
    //   required: true,
    // },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    totalNights: { type: Number, required: true },
    totalGuests: { type: Number, required: true },

    // Stripe session details
    stripeSessionId: { type: String, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentIntentId: { type: String }, // optional: from Stripe

    // Line items (rooms or packages)
    line_items: [lineItemSchema],

    // Billing details from Stripe session
    customer_email: { type: String },
    customer_name: { type: String },
    customer_phone: { type: String },

    // Total amounts
    amount_subtotal: { type: Number }, // before taxes and discounts
    amount_total: { type: Number },    // after taxes and discounts
    currency: { type: String, default: "usd" },

    // Optional extra data
    bookingNotes: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("BookingOrder", bookingOrderSchema);
