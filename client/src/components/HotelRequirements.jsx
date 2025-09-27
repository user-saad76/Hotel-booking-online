import React from "react";

const HotelRequirements = () => {
  return (
    <div className="container my-5">
      <div className="card shadow border-0">
        <div className="card-body p-4">
          <h3 className="fw-bold mb-3">Hotel Requirements & Policies</h3>
          <p className="text-muted">
            Please review the following requirements before booking your stay:
          </p>

          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              🆔 <strong>Valid ID Required</strong> – All guests must present a
              valid government-issued ID or passport at check-in.
            </li>
            <li className="list-group-item">
              ⏰ <strong>Check-in / Check-out</strong> – Check-in starts at{" "}
              <span className="fw-bold">2:00 PM</span>, and check-out is by{" "}
              <span className="fw-bold">12:00 PM</span>.
            </li>
            <li className="list-group-item">
              👶 <strong>Age Restriction</strong> – Minimum check-in age is{" "}
              <span className="fw-bold">18 years</span>.
            </li>
            <li className="list-group-item">
              🚭 <strong>No Smoking</strong> – Smoking is strictly prohibited in
              all rooms and public areas.
            </li>
            <li className="list-group-item">
              🐕 <strong>Pet Policy</strong> – Pets are{" "}
              <span className="fw-bold">not allowed</span> inside the hotel.
            </li>
            <li className="list-group-item">
              💳 <strong>Payment</strong> – Advance payment or valid credit card
              is required to confirm the booking.
            </li>
            <li className="list-group-item">
              🛎 <strong>Cancellation Policy</strong> – Free cancellation up to{" "}
              <span className="fw-bold">24 hours</span> before check-in.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HotelRequirements;
