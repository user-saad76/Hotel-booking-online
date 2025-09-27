  
  import  HotelFirst from "../assets/hotel-image.jpg"
 import React from "react";


const HotelCarousel = () => {
  return (
    <div
      id="hotelCarousel"
      className="carousel slide container my-5"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {/* Hotel 1 */}
        <div className="carousel-item active">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src="/assets/hotel-image.jpg"
                alt="Luxury Grand Hotel"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold">Luxury Grand Hotel</h2>
              <p className="text-muted">
                Experience world-class hospitality in the heart of the city.
                Enjoy premium rooms, fine dining, spa facilities, and a rooftop
                pool with stunning skyline views.
              </p>
              <ul className="list-unstyled">
                <li>⭐ 4.8 / 5 Rating</li>
                <li>🍽 Fine Dining & Rooftop Lounge</li>
                <li>🏊 Infinity Pool & Spa</li>
                <li>📍 Central City Location</li>
              </ul>
              <a href="/bookings" className="btn btn-primary px-4 mt-3">
                Book Now
              </a>
            </div>
          </div>
        </div>

        {/* Hotel 2 */}
        <div className="carousel-item">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src="/assets/hotel-image2.jpg"
                alt="Seaside Resort"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold">Seaside Resort & Spa</h2>
              <p className="text-muted">
                Relax with oceanfront views, luxurious spa treatments, and
                private beach access. Perfect for couples and family getaways.
              </p>
              <ul className="list-unstyled">
                <li>⭐ 4.7 / 5 Rating</li>
                <li>🌊 Private Beach</li>
                <li>🛶 Water Sports</li>
                <li>🍹 Poolside Bar</li>
              </ul>
              <a href="/bookings" className="btn btn-primary px-4 mt-3">
                Book Now
              </a>
            </div>
          </div>
        </div>

        {/* Hotel 3 */}
        <div className="carousel-item">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src="/assets/hotel-image3.jpg"
                alt="Mountain Escape Lodge"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold">Mountain Escape Lodge</h2>
              <p className="text-muted">
                Stay close to nature with breathtaking mountain views, cozy
                wooden cabins, and guided hiking tours.
              </p>
              <ul className="list-unstyled">
                <li>⭐ 4.6 / 5 Rating</li>
                <li>🏔 Scenic Hiking Trails</li>
                <li>🔥 Fireplace in Rooms</li>
                <li>🌌 Stargazing Deck</li>
              </ul>
              <a href="/bookings" className="btn btn-primary px-4 mt-3">
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Controls with Bootstrap Icons */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#hotelCarousel"
        data-bs-slide="prev"
      >
        <span className="bi bi-arrow-left-circle-fill fs-2 text-primary"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#hotelCarousel"
        data-bs-slide="next"
      >
        <span className="bi bi-arrow-right-circle-fill fs-2 text-primary"></span>
      </button>
    </div>
  );
};

export default HotelCarousel;
