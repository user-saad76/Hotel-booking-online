import React from "react";
import { FaStar, FaUtensils, FaSwimmer, FaMapMarkerAlt } from "react-icons/fa";

function HotelQuality() {
  return (
    <>
      <div className="container my-5">
        <h2 className="fw-bold text-center mb-4">Why Choose Our Hotel?</h2>
        <div className="row g-4">
          {/* ⭐ Top Rated */}
          <div className="col-md-3">
            <div className="card h-100 shadow-lg border-0 text-center p-4 rounded-4">
              <div className="mb-3 text-primary">
                <FaStar size={50} />
              </div>
              <h5 className="fw-bold">Top Rated</h5>
              <p className="text-muted">
                Rated 4.8/5 by thousands of happy guests worldwide.
              </p>
            </div>
          </div>

          {/* 🍽 Fine Dining */}
          <div className="col-md-3">
            <div className="card h-100 shadow-lg border-0 text-center p-4 rounded-4">
              <div className="mb-3 text-success">
                <FaUtensils size={50} />
              </div>
              <h5 className="fw-bold">Fine Dining</h5>
              <p className="text-muted">
                World-class restaurants with international cuisines.
              </p>
            </div>
          </div>

          {/* 🏊 Luxury Amenities */}
          <div className="col-md-3">
            <div className="card h-100 shadow-lg border-0 text-center p-4 rounded-4">
              <div className="mb-3 text-info">
                <FaSwimmer size={50} />
              </div>
              <h5 className="fw-bold">Luxury Amenities</h5>
              <p className="text-muted">
                Infinity pool, spa, gym, and premium lounge access.
              </p>
            </div>
          </div>

          {/* 📍 Prime Location */}
          <div className="col-md-3">
            <div className="card h-100 shadow-lg border-0 text-center p-4 rounded-4">
              <div className="mb-3 text-danger">
                <FaMapMarkerAlt size={50} />
              </div>
              <h5 className="fw-bold">Prime Location</h5>
              <p className="text-muted">
                Centrally located with easy access to attractions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HotelQuality;
