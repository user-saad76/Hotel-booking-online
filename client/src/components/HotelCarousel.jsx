  
import React from "react";
import { FaStar, FaMapMarkerAlt, FaMoneyBillWave, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HotelCarousel = ({ hotels = [] }) => {
  return (
    <div
      id="hotelCarousel"
      className="carousel slide container my-5 position-relative"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner rounded shadow-lg overflow-hidden">
        {hotels && hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <div
              key={hotel._id || index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className="row align-items-center">
                <div className="col-md-6 mb-4 mb-md-0">
                  <img
                    src={
                      hotel?.mainImage?.secure_url || "/assets/hotel-image.jpg"
                    }
                    alt={hotel.name}
                    className="img-fluid rounded-start shadow-sm"
                    style={{ height: "400px", width: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-6 p-4">
                  <h2 className="fw-bold mb-3 text-primary">{hotel.name}</h2>
                  <p className="text-muted mb-3">
                    {hotel.shortDescription || "Experience a wonderful stay."}
                  </p>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <FaStar className="text-warning me-2" />
                      {hotel.rating || "4.5"} / 5 Rating
                    </li>
                    <li className="mb-2">
                      <FaMapMarkerAlt className="text-danger me-2" />
                      {hotel.location || "Prime Location"}
                    </li>
                    <li>
                      <FaMoneyBillWave className="text-success me-2" />
                      From ${hotel.pricePerNight || "99"} per night
                    </li>
                  </ul>
                  <a href="/bookings" className="btn btn-primary px-4 mt-3">
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="carousel-item active">
            <div className="row align-items-center">
              <div className="col-md-6 mb-4 mb-md-0">
                <img
                  src="/assets/hotel-image.jpg"
                  alt="Default Hotel"
                  className="img-fluid rounded-start shadow-sm"
                  style={{ height: "400px", width: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="col-md-6 p-4">
                <h2 className="fw-bold text-primary">Luxury Grand Hotel</h2>
                <p className="text-muted">
                  Experience world-class hospitality in the heart of the city.
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <FaStar className="text-warning me-2" /> 4.8 / 5 Rating
                  </li>
                  <li className="mb-2">
                    <FaMapMarkerAlt className="text-danger me-2" /> Central City Location
                  </li>
                  <li>
                    <FaMoneyBillWave className="text-success me-2" /> From $120 per night
                  </li>
                </ul>
                <a href="/bookings" className="btn btn-primary px-4 mt-3">
                  Book Now
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Carousel Controls - upgraded with react-icons */}
      <button
        className="carousel-control-prev custom-carousel-btn"
        type="button"
        data-bs-target="#hotelCarousel"
        data-bs-slide="prev"
      >
        <FaChevronLeft size={40} className="text-primary bg-white rounded-circle p-2 shadow-sm" />
      </button>

      <button
        className="carousel-control-next custom-carousel-btn"
        type="button"
        data-bs-target="#hotelCarousel"
        data-bs-slide="next"
      >
        <FaChevronRight size={40} className="text-primary bg-white rounded-circle p-2 shadow-sm" />
      </button>
    </div>
  );
};

export default HotelCarousel;
