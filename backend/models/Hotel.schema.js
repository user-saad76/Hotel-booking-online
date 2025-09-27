import mongoose from "mongoose";

const RoomDetailSchema = new mongoose.Schema({
  roomName: { type: String, required: true },
  price: { type: Number, required: true },
  maxGuests: { type: Number, required: true },
  facilities: { type: String, required: true }
});

const HotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true },

    pricePerNight: { type: Number, required: true }, // maps from `price` in form
    totalRooms: { type: Number, required: true },    // maps from `rooms` in form

    rating: { type: Number, required: true },
    amenities: { type: [String], required: true },

    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    policies: { type: String, required: true },

    // ✅ Main Image (one file)
    mainImage: {
      public_id: { type: String },
      secure_url: { type: String }
    },

    // ✅ Gallery (multiple images)
    gallery: [
      {
        public_id: { type: String },
        secure_url: { type: String }
      }
    ],

    // ✅ Room details (array of objects)
    roomDetails: [RoomDetailSchema]
  },
  { timestamps: true }
);

export const Hotel = mongoose.model("Hotel", HotelSchema);
