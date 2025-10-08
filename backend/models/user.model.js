import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6
      
    },
    phone: {
      type: String,
      required: true,
    },

    // 🔹 User role: admin, customer, hotel-owner
    role: {
      type: String,
      enum: ["customer", "admin", "hotel-owner"],
      default: "customer",
    },

    // 🔹 Profile picture
     mainImage: {
      public_id: { type: String },
      secure_url: { type: String }
    },

    // 🔹 Address
    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "" },
      postalCode: { type: String, default: "" },
    },

    // 🔹 Payment Info (basic for demo, normally handled by Stripe/PayPal)
    paymentInfo: {
      cardHolderName: { type: String, default: "" },
      cardNumber: { type: String, default: "" }, // don’t store in plaintext in real apps!
      expiryDate: { type: String, default: "" },
      cvv: { type: String, default: "" }, // also avoid storing this directly
      billingAddress: {
        street: { type: String, default: "" },
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        country: { type: String, default: "" },
        postalCode: { type: String, default: "" },
      },
    },

    // 🔹 Extra fields for hotel booking systems
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hotel" }], // saved hotels
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }], // user’s reservations
    isVerified: { type: Boolean, default: false }, // email verification
    lastLogin: { type: Date, default: null },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
