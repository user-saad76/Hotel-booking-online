

import { useEffect, useState } from "react";
import { Link } from "react-router";

function Booking({hotels}) {
  return (
    <>
      <div className="container my-4">
        {/* Search Bar */}
        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by hotel or location"
          />
          <button className="btn btn-primary">Search</button>
        </div>

        {/* Hotel Cards */}
        <div className="row">
          {hotels?.map((hotel, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card shadow-sm h-100">
                <img
                  src={hotel.mainImage?.secure_url|| "https://via.placeholder.com/400x200?text=Hotel"}
                  className="card-img-top"
                  alt={hotel.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{hotel.name}</h5>
                  <p className="text-muted">{hotel.location}</p>
                  <p className="card-text">{hotel.description}</p>
                  <Link to={`/hotels/${hotel.slug}`} className="btn btn-outline-primary w-100">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
     
    </>
  );
}

export default Booking;
