import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';

// ✅ Zod Schema
const hotelSchema = z.object({
  name: z.string().min(3, "Hotel name must be at least 3 characters"),
  slug: z.string().min(3, "Slug is required"),
  location: z.string().min(2, "Location is required"),
  address: z.string().min(5, "Full address is required"),
  contact: z.string().min(10, "Contact number is required"),
  email: z.string().email("Invalid email"),

  // keep your frontend naming
  price: z.number().positive("Price must be greater than 0"),
  rooms: z.number().int().positive("Number of rooms must be greater than 0"),

  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  amenities: z.array(z.string()).min(1, "Select at least one amenity"),
  shortDescription: z.string().min(10, "Short description must be at least 10 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  checkIn: z.string().min(1, "Check-in time required"),
  checkOut: z.string().min(1, "Check-out time required"),
  policies: z.string().min(10, "Policies are required"),

  mainImage: z.any().refine((file) => file?.length === 1, "Main image is required"),
  gallery: z.any().refine((files) => files?.length > 0, "At least one gallery image required"),

  roomDetails: z.array(
    z.object({
      roomName: z.string().min(2, "Room name required"),
      price: z.number().positive("Price must be greater than 0"), // ✅ aligned with your JSX
      maxGuests: z.number().int().positive("Max guests must be greater than 0"),
      facilities: z.string().min(3, "Facilities required"),
    })
  ).min(1, "At least one room type is required"),
});

function AddHotelForm() {
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreview, setGalleryPreview] = useState([]);
   const [loading,setloading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({
    resolver: zodResolver(hotelSchema),
    defaultValues: {
      roomDetails: [{ roomName: "", price: 0, maxGuests: 1, facilities: "" }],
      amenities: [],
    },
  });

  // ✅ For dynamic rooms
  const { fields, append, remove } = useFieldArray({
    control,
    name: "roomDetails",
  });

  // ✅ Auto-generate slug from hotel name
  const hotelName = watch("name");
  useEffect(() => {
    if (hotelName) {
      const generatedSlug = hotelName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [hotelName, setValue]);

  // ✅ Handle Main Image Upload
  const handleMainImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImagePreview(URL.createObjectURL(file));
      setValue("mainImage", [file], { shouldValidate: true });
    }
  };

  // ✅ Handle Multiple Gallery Images
  const handleGalleryImages = (e) => {
    const files = Array.from(e.target.files);

    const newFiles = [...galleryFiles, ...files];
    setGalleryFiles(newFiles);

    const previews = newFiles.map((file) => ({
      id: URL.createObjectURL(file),
      file,
    }));
    setGalleryPreview(previews);

    setValue("gallery", newFiles, { shouldValidate: true });
  };

  // ✅ Remove one gallery image
  const handleRemoveImage = (id) => {
    const updatedFiles = galleryFiles.filter((file) => URL.createObjectURL(file) !== id);
    const updatedPreviews = galleryPreview.filter((img) => img.id !== id);

    setGalleryFiles(updatedFiles);
    setGalleryPreview(updatedPreviews);

    setValue("gallery", updatedFiles, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
  const formData = new FormData();

  // Text fields
  formData.append("name", data.name);
  formData.append("slug", data.slug);
  formData.append("location", data.location);
  formData.append("address", data.address);
  formData.append("contact", data.contact);
  formData.append("email", data.email);
  formData.append("pricePerNight", data.price);
  formData.append("totalRooms", data.rooms);
  formData.append("rating", data.rating);
  formData.append("shortDescription", data.shortDescription);
  formData.append("description", data.description);
  formData.append("checkIn", data.checkIn);
  formData.append("checkOut", data.checkOut);
  formData.append("policies", data.policies);
  formData.append("roomDetails", JSON.stringify(data.roomDetails));

  // Amenities (array)
  data.amenities.forEach((a) => formData.append("amenities[]", a));

  // Main image
  if (data.mainImage && data.mainImage[0]) {
    formData.append("mainImage", data.mainImage[0]);
  }

  // Gallery images
  if (data.gallery && data.gallery.length > 0) {
    data.gallery.forEach((file) => {
      formData.append("gallery", file);
    });
  }

  setloading(true);

  try {
    const res = await fetch("http://localhost:7000/hotels/add", {
      method: "POST",
      body: formData,
    });

    const text = await res.text(); // raw response
    let result;
    try {
      result = JSON.parse(text); // try parse as JSON
    } catch {
      result = { message: text }; // fallback plain text
    }

    console.log("📥 Backend Response:", result);

    // ✅ Handle standardized response
    if (res.ok && result.success) {
      toast.success(result.message || "✅ Hotel saved successfully!");
    } else {
      const msg =
        typeof result.message === "object"
          ? JSON.stringify(result.message)
          : result.message || "❌ Failed to save hotel";

      toast.error(msg);
    }
  } catch (err) {
    toast.error("❌ Network Error: " + err.message);
  } finally {
    setloading(false);
  }
};

 

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-primary text-white py-3 rounded-top-4">
          <h3 className="mb-0">🏨 Add New Hotel</h3>
        </div>
        <div className="card-body p-4">
         <form onSubmit={handleSubmit(onSubmit)} className="row g-4" encType="multipart/form-data">
            {/* Hotel Name */}
            <div className="col-md-6">
              <label className="form-label">Hotel Name</label>
              <input type="text" className="form-control" {...register("name")} />
              {errors.name && <p className="text-danger small">{errors.name.message}</p>}
            </div>

            {/* Slug */}
            <div className="col-md-6">
              <label className="form-label">Slug</label>
              <input type="text" className="form-control" {...register("slug")} readOnly />
              {errors.slug && <p className="text-danger small">{errors.slug.message}</p>}
            </div>

            {/* Location */}
            <div className="col-md-6">
              <label className="form-label">Location</label>
              <input type="text" className="form-control" {...register("location")} />
              {errors.location && <p className="text-danger small">{errors.location.message}</p>}
            </div>

            {/* Address */}
            <div className="col-md-6">
              <label className="form-label">Address</label>
              <input type="text" className="form-control" {...register("address")} />
              {errors.address && <p className="text-danger small">{errors.address.message}</p>}
            </div>

            {/* Contact */}
            <div className="col-md-6">
              <label className="form-label">Contact</label>
              <input type="text" className="form-control" {...register("contact")} />
              {errors.contact && <p className="text-danger small">{errors.contact.message}</p>}
            </div>

            {/* Email */}
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" {...register("email")} />
              {errors.email && <p className="text-danger small">{errors.email.message}</p>}
            </div>

            {/* Price */}
            <div className="col-md-6">
              <label className="form-label">Price per Night ($)</label>
              <input type="number" className="form-control" {...register("price", { valueAsNumber: true })} />
              {errors.price && <p className="text-danger small">{errors.price.message}</p>}
            </div>

            {/* Rooms */}
            <div className="col-md-6">
              <label className="form-label">Total Rooms</label>
              <input type="number" className="form-control" {...register("rooms", { valueAsNumber: true })} />
              {errors.rooms && <p className="text-danger small">{errors.rooms.message}</p>}
            </div>

            {/* Rating */}
            <div className="col-md-6">
              <label className="form-label">Rating (1-5)</label>
              <input type="number" className="form-control" {...register("rating", { valueAsNumber: true })} />
              {errors.rating && <p className="text-danger small">{errors.rating.message}</p>}
            </div>

            {/* Amenities */}
            <div className="col-md-6">
              <label className="form-label">Amenities</label>
              <select multiple className="form-select" {...register("amenities")}>
                <option value="wifi">Free WiFi</option>
                <option value="pool">Swimming Pool</option>
                <option value="parking">Parking</option>
                <option value="spa">Spa</option>
                <option value="gym">Gym</option>
                <option value="restaurant">Restaurant</option>
              </select>
              {errors.amenities && <p className="text-danger small">{errors.amenities.message}</p>}
            </div>

            {/* Short Description */}
            <div className="col-12">
              <label className="form-label">Short Description</label>
              <textarea className="form-control" rows="2" {...register("shortDescription")}></textarea>
              {errors.shortDescription && <p className="text-danger small">{errors.shortDescription.message}</p>}
            </div>

            {/* Description */}
            <div className="col-12">
              <label className="form-label">Full Description</label>
              <textarea className="form-control" rows="4" {...register("description")}></textarea>
              {errors.description && <p className="text-danger small">{errors.description.message}</p>}
            </div>

            {/* Check-in / Check-out */}
            <div className="col-md-6">
              <label className="form-label">Check-in Time</label>
              <input type="time" className="form-control" {...register("checkIn")} />
              {errors.checkIn && <p className="text-danger small">{errors.checkIn.message}</p>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Check-out Time</label>
              <input type="time" className="form-control" {...register("checkOut")} />
              {errors.checkOut && <p className="text-danger small">{errors.checkOut.message}</p>}
            </div>

            {/* Policies */}
            <div className="col-12">
              <label className="form-label">Hotel Policies</label>
              <textarea className="form-control" rows="3" {...register("policies")}></textarea>
              {errors.policies && <p className="text-danger small">{errors.policies.message}</p>}
            </div>

            {/* Main Image */}
            <div className="col-md-6">
              <label className="form-label">Main Image</label>
              <input type="file"  name="mainImage" accept="image/*" className="form-control" onChange={handleMainImage} />
              {mainImagePreview && <img src={mainImagePreview} alt="Preview" className="img-fluid mt-2 rounded shadow-sm" />}
              {errors.mainImage && <p className="text-danger small">{errors.mainImage.message}</p>}
            </div>

            {/* Gallery Images */}
            <div className="col-md-6">
              <label className="form-label">Gallery Images</label>
              <input type="file" name="gallery"  accept="image/*" multiple className="form-control" onChange={handleGalleryImages} />
              <div className="d-flex flex-wrap gap-2 mt-2">
                {galleryPreview.map((img) => (
                  <div key={img.id} className="position-relative">
                    <img src={img.id} alt="preview" className="img-thumbnail" width="100" height="100" />
                    <button type="button" className="btn btn-sm btn-danger position-absolute top-0 end-0" onClick={() => handleRemoveImage(img.id)}>×</button>
                  </div>
                ))}
              </div>
              {errors.gallery && <p className="text-danger small">{errors.gallery.message}</p>}
            </div>

            {/* ✅ Room Details Section */}
            <div className="col-12">
              <h5 className="fw-bold mt-4">🛏️ Room Details</h5>
              {fields.map((field, index) => (
                <div key={field.id} className="card p-3 mb-3 shadow-sm border">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label">Room Name</label>
                      <input type="text" className="form-control" {...register(`roomDetails.${index}.roomName`)} />
                      {errors.roomDetails?.[index]?.roomName && <p className="text-danger small">{errors.roomDetails[index].roomName.message}</p>}
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Price per Night ($)</label>
                      <input type="number" className="form-control" {...register(`roomDetails.${index}.price`, { valueAsNumber: true })} />
                      {errors.roomDetails?.[index]?.price && <p className="text-danger small">{errors.roomDetails[index].price.message}</p>}
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Max Guests</label>
                      <input type="number" className="form-control" {...register(`roomDetails.${index}.maxGuests`, { valueAsNumber: true })} />
                      {errors.roomDetails?.[index]?.maxGuests && <p className="text-danger small">{errors.roomDetails[index].maxGuests.message}</p>}
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">Facilities</label>
                      <input type="text" placeholder="e.g. AC, TV, Balcony" className="form-control" {...register(`roomDetails.${index}.facilities`)} />
                      {errors.roomDetails?.[index]?.facilities && <p className="text-danger small">{errors.roomDetails[index].facilities.message}</p>}
                    </div>
                    <div className="col-md-12 text-end">
                      <button type="button" className="btn btn-danger btn-sm" onClick={() => remove(index)}>Remove Room</button>
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" className="btn btn-outline-primary" onClick={() => append({ roomName: "", price: 0, maxGuests: 1, facilities: "" })}>
                ➕ Add Another Room
              </button>
            </div>

            {/* Submit */}
            <div className="col-12 text-end">
              <button type="submit"  className="btn btn-success px-4 py-2 fw-semibold"> {loading?'Saving...':'Save Hotel'}</button>
            </div>
          </form>

           <ToastContainer 
               position="top-center"
            autoClose={5000}
           hideProgressBar={false}
           newestOnTop={false}
          closeOnClick={false}
           rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
           />
        </div>
      </div>
    </div>
  );
}

export default AddHotelForm;
