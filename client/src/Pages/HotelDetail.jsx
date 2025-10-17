
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loadStripe } from "@stripe/stripe-js"; // ✅ Stripe Import

// ✅ Zod Schema for Payment Info
const paymentSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  address: z.string().min(5, "Full address is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9]+$/, "Only numbers allowed"),
  idCardNumber: z
    .string()
    .min(13, "CNIC must be 13 digits")
    .max(13, "CNIC must be 13 digits")
    .regex(/^[0-9]+$/, "Only numbers allowed"),
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  guests: z.string().min(1, "Please select guests"),
});

function HotelDetail({ hotels }) {
  const { slug } = useParams();
  const item = hotels?.find((h) => h.slug === slug);

  const [guests, setGuests] = useState(1);

  // ✅ React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: { guests: "1" },
  });

  // ✅ Stripe Integration — Only Added Here
  const onSubmit = async (data) => {
      const checkInISO = new Date(data.checkIn).toISOString();
      const checkOutISO = new Date(data.checkOut).toISOString();

    const bookingData = {
      ...data,
      hotelName: item?.name,
      totalPrice: item?.pricePerNight * guests,
         checkIn: checkInISO,
        checkOut: checkOutISO,
    };

    console.log("✅ Stripe Payment Data Submitted:", bookingData);
    console.log("💰 totalPrice:", bookingData.totalPrice);


    try {
      // Load Stripe with public key
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      // or use process.env.REACT_APP_STRIPE_PUBLIC_KEY if CRA
        // ✅ GET TOKEN
       const token = localStorage.getItem("token");

      // Call backend to create checkout session
      const response = await fetch(
        "http://localhost:7000/checkout/sessions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, },
          body: JSON.stringify(bookingData),
        }
      );

      const session = await response.json();

      if (!session.id) {
        alert("❌ Stripe session not created. Check backend logs.");
        return;
      }

      // Redirect to Stripe Checkout
      // const result = await stripe.redirectToCheckout({
      //   sessionId: session.id,
      // });

    // ✅ New working Stripe redirect
     if (session.url) {
      window.location.href = session.url; // 👈 Redirect to Stripe checkout page
     } else {
     console.error("❌ No URL found in response");
     }
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
      alert("❌ Something went wrong with payment.");
    }
  };

  if (!item) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">Hotel not found!</div>
      </div>
    );
  }

  return (
    <>
      <div className="container my-4">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card shadow-sm">
              {/* ✅ Main Image */}
              <img
                src={
                  item.mainImage?.secure_url ||
                  "https://via.placeholder.com/800x400?text=Hotel"
                }
                className="card-img-top"
                alt={item.name}
              />
              <div className="card-body">
                <h2 className="card-title mb-1">{item.name}</h2>
                <p className="text-muted mb-2">
                  {item.location} <span className="fw-semibold">★★★★★</span>
                </p>
                <p className="mb-3">{item.description}</p>

                <h5 className="mb-2">Amenities</h5>
                <ul className="list-inline mb-3">
                  {item.amenities?.map((amenity, index) => (
                    <li
                      key={index}
                      className="list-inline-item badge bg-secondary me-1"
                    >
                      {amenity}
                    </li>
                  ))}
                </ul>

                {/* ✅ Room Details */}
                <div className="mt-4">
                  <h5 className="mb-3">Room Details</h5>
                  <div className="row row-cols-1 row-cols-md-2 g-4">
                    {item.roomDetails?.map((room, index) => (
                      <div className="col" key={index}>
                        <div className="card h-100 shadow-sm">
                          <img
                            src={
                              item.gallery?.[index]?.secure_url ||
                              "https://via.placeholder.com/400x200?text=Room"
                            }
                            className="card-img-top"
                            alt={room.roomName}
                          />
                          <div className="card-body">
                            <h6 className="card-title">{room.roomName}</h6>
                            <ul className="small text-muted mb-0">
                              <li>Price: ${room.price}</li>
                              <li>Max Guests: {room.maxGuests}</li>
                              <li>Facilities: {room.facilities}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <h5 className="mt-4">Hotel Policies</h5>
                <ul className="small text-muted">
                  <li>
                    Check-in: {item.checkIn} · Check-out: {item.checkOut}
                  </li>
                  <li>{item.policies}</li>
                  <li>Children under 6 stay free (using existing beds).</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ✅ Sidebar Section */}
          <aside className="col-lg-4">
            <div className="card shadow-sm mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <h4 className="mb-0">${item.pricePerNight * guests}</h4>
                    <div className="small text-muted">
                      Starting price / night
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold">{item.rating}</div>
                    <div className="small text-muted">(1,234 reviews)</div>
                  </div>
                </div>

                {/* ✅ Payment Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-2">
                    <label className="form-label small">Full Name</label>
                    <input
                      type="text"
                      {...register("name")}
                      className={`form-control form-control-sm ${
                        errors.name ? "is-invalid" : ""
                      }`}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">
                        {errors.name.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-2">
                    <label className="form-label small">Address</label>
                    <input
                      type="text"
                      {...register("address")}
                      className={`form-control form-control-sm ${
                        errors.address ? "is-invalid" : ""
                      }`}
                    />
                    {errors.address && (
                      <div className="invalid-feedback">
                        {errors.address.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-2">
                    <label className="form-label small">CNIC</label>
                    <input
                      type="text"
                      {...register("idCardNumber")}
                      className={`form-control form-control-sm ${
                        errors.idCardNumber ? "is-invalid" : ""
                      }`}
                    />
                    {errors.idCardNumber && (
                      <div className="invalid-feedback">
                        {errors.idCardNumber.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-2">
                    <label className="form-label small">Phone Number</label>
                    <input
                      type="text"
                      {...register("phoneNumber")}
                      className={`form-control form-control-sm ${
                        errors.phoneNumber ? "is-invalid" : ""
                      }`}
                    />
                    {errors.phoneNumber && (
                      <div className="invalid-feedback">
                        {errors.phoneNumber.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-2">
                    <label className="form-label small">Check-In</label>
                    <input
                      type="date"
                      {...register("checkIn")}
                      className={`form-control form-control-sm ${
                        errors.checkIn ? "is-invalid" : ""
                      }`}
                    />
                    {errors.checkIn && (
                      <div className="invalid-feedback">
                        {errors.checkIn.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-2">
                    <label className="form-label small">Check-Out</label>
                    <input
                      type="date"
                      {...register("checkOut")}
                      className={`form-control form-control-sm ${
                        errors.checkOut ? "is-invalid" : ""
                      }`}
                    />
                    {errors.checkOut && (
                      <div className="invalid-feedback">
                        {errors.checkOut.message}
                      </div>
                    )}
                  </div>

                  <div className="mt-3">
                    <label className="form-label small">Guests</label>
                    <select
                      {...register("guests")}
                      className={`form-select mb-3 ${
                        errors.guests ? "is-invalid" : ""
                      }`}
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                    >
                      <option value="1">1 guest</option>
                      <option value="2">2 guests</option>
                      <option value="3">3 guests</option>
                      <option value="4">4 guests</option>
                    </select>
                    {errors.guests && (
                      <div className="invalid-feedback">
                        {errors.guests.message}
                      </div>
                    )}
                  </div>

                  {/* ✅ Stripe Payment Button */}
                  <button type="submit" className="btn btn-dark w-100">
                    💳 Pay with Stripe
                  </button>
                </form>

                {/* ✅ Review Button */}
                <div className="text-center mt-3">
                  <Link to="/review" className="btn btn-primary w-100">
                    Read Reviews
                  </Link>
                </div>
              </div>
            </div>

            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="card-title">Location</h6>
                <p className="small text-muted mb-2">{item.address}</p>
                <div
                  style={{
                    height: "180px",
                    background: "#eee",
                    borderRadius: "6px",
                  }}
                  className="d-flex align-items-center justify-content-center"
                >
                  <span className="small text-muted">Map placeholder</span>
                </div>
                <ul className="list-unstyled mt-3 small text-muted">
                  <li>Airport: 25 km</li>
                  <li>Nearest metro/bus: 1.2 km</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export default HotelDetail;
