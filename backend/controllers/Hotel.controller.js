import { Hotel } from "../models/Hotel.schema.js";


export const createNewHotel = async (req, res) => {
  try {
    const data = req.body;

    console.log("📥 Incoming Body:", data);

    // ✅ Parse roomDetails
    let roomDetails = [];
    if (data.roomDetails) {
      try {
        roomDetails =
          typeof data.roomDetails === "string"
            ? JSON.parse(data.roomDetails)
            : data.roomDetails;
      } catch (err) {
        console.error("❌ roomDetails parse error:", err);
      }
    }

    // ✅ Parse amenities
    let amenities = [];
    if (data.amenities) {
      if (Array.isArray(data.amenities)) {
        amenities = data.amenities;
      } else {
        try {
          amenities = JSON.parse(data.amenities);
        } catch {
          amenities = [data.amenities];
        }
      }
    }

    // ✅ Convert string → number
    const pricePerNight = Number(data.pricePerNight);
    const totalRooms = Number(data.totalRooms);
    const rating = Number(data.rating);

    // ✅ Files
    const mainImage = req.files?.mainImage?.[0];
    const gallery = req.files?.gallery || [];

    const hotel = await Hotel.create({
      name: data.name,
      slug: data.slug,
      location: data.location,
      address: data.address,
      contact: data.contact,
      email: data.email,

      pricePerNight,
      totalRooms,
      rating,

      shortDescription: data.shortDescription,
      description: data.description,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      policies: data.policies,

      amenities,
      roomDetails,

      mainImage: mainImage
        ? { public_id: mainImage.filename, secure_url: mainImage.path }
        : null,

      gallery: gallery.map((g) => ({
        public_id: g.filename,
        secure_url: g.path,
      })),
    });

    // ✅ Standardized response
    res.json({
      success: true,
      message: "✅ Hotel created successfully",
      data: hotel,
    });
  } catch (err) {
    console.error("❌ Error creating hotel:", err);
    res.status(500).json({
      success: false,
      message: "❌ Error creating hotel",
      error: err.message,
    });
  }
};


export const getAllHotels = async (req, res) => {
  const qData = req.query;
  console.log(qData);
  const hotel = await Hotel.find(qData);
  res.json(hotel);
};

export const getHotelById = async (req, res) => {
  const { id } = req.params;
  const hotel = await Hotel.findById(id);
  res.json({
    message: " Single Hotel endpoint called",
    hotel,
  });
};

export const updateHotel = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  await Hotel.findByIdAndUpdate(id, data);
  res.json({ message: " update Hotel endpoint called" });
};

export const deleteHotel = async (req, res) => {
  const { id } = req.params;
  await Hotel.findByIdAndDelete(id);
  res.json({ message: " Delete Hotel endpoint called" });
};
