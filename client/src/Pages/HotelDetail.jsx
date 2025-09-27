
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import { hotels } from "../hotel-data";

function HotelDetail({hotels}) {
  const { slug } = useParams();
  //const [hotels, setHotels] = useState([]);
    const item = hotels?.find((h) => h.slug === slug);
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
              {/* ✅ Main Image from DB */}
              <img
                src={item.mainImage?.secure_url || "https://via.placeholder.com/800x400?text=Hotel"}
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

                {/* ✅ Dynamic Room Details Section from DB */}
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
                  <li>Check-in: {item.checkIn} · Check-out: {item.checkOut}</li>
                  <li>{item.policies}</li>
                  <li>Children under 6 stay free (using existing beds).</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar Section */}
          <aside className="col-lg-4">
            <div className="card shadow-sm mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <h4 className="mb-0">${item.pricePerNight}</h4>
                    <div className="small text-muted">
                      Starting price / night
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold">{item.rating}</div>
                    <div className="small text-muted">(1,234 reviews)</div>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="form-label small">Check-in</label>
                  <input type="date" className="form-control mb-2" />
                  <label className="form-label small">Check-out</label>
                  <input type="date" className="form-control mb-3" />
                  <label className="form-label small">Guests</label>
                  <select className="form-select mb-3">
                    <option>1 guest</option>
                    <option>2 guests</option>
                    <option>3 guests</option>
                    <option>4 guests</option>
                  </select>

                  <button className="btn btn-primary w-100">Reserve</button>
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
