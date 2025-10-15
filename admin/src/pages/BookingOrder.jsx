 import React from "react";
import { useFetch } from "../hook/useFetch";

function BookingOrders() {
  const { data, error, loading } = useFetch("http://localhost:7000/bookingOrder");
 
  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-danger text-center py-5">Error loading data</div>;

  const orders = data?.bookingOrders || [];
  console.log("BookingOrders",data);
  

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Booking Orders</h4>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Booking ID</th>
              <th>Guest Name</th>
              <th>Email</th>
              <th>Hotel ID</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order._id}</td>
                  <td>{order.customer_name || "N/A"}</td>
                  <td>{order.customer_email || "N/A"}</td>
                  <td>{order.hotelId || "N/A"}</td>
                  <td>{new Date(order.checkInDate).toLocaleDateString()}</td>
                  <td>{new Date(order.checkOutDate).toLocaleDateString()}</td>
                  <td>${order.amount_total}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.paymentStatus === "paid" ? "bg-success" : "bg-warning text-dark"
                      }`}
                    >
                      {order.paymentStatus === "paid" ? "Confirmed" : "Pending"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        order.paymentStatus === "paid" ? "bg-info text-dark" : "bg-secondary"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-1">
                      <i className="bi bi-eye"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center text-muted py-4">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingOrders;
