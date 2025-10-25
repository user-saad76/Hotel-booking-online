import React, { useState } from "react";
import { useFetch } from "../hook/useFetch";

function ComplainMessage() {
  // ✅ Fetch data from backend
  const { data, error, loading } = useFetch("http://localhost:7000/report/getcomplain");

  const [search, setSearch] = useState("");

  if (loading)
    return <div className="text-center py-5">⏳ Loading complaints...</div>;
  if (error)
    return (
      <div className="text-danger text-center py-5">
        ❌ Error loading data
      </div>
    );

  // ✅ Ensure we have an array
  const complaints = Array.isArray(data) ? data : [];

  // 🔍 Filter complaints by name, email, or message
  const filteredComplaints = complaints.filter((item) => {
    const query = search.toLowerCase();
    return (
      item.name?.toLowerCase().includes(query) ||
      item.email?.toLowerCase().includes(query) ||
      item.message?.toLowerCase().includes(query)
    );
  });

  console.log("📩 ComplainMessage Data:", complaints);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">Customer Complaint Messages</h2>

      {/* 🔍 Search Bar */}
      <div className="input-group mb-4 shadow-sm">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, email, or message..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => setSearch("")}
        >
          Clear
        </button>
      </div>

      {/* 📨 Complaint Boxes */}
      <div className="row g-4">
        {filteredComplaints.length > 0 ? (
          filteredComplaints.map((item, index) => (
            <div key={item._id || index} className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0 fw-semibold">
                      {item.name || "Unknown"}
                    </h5>
                    <span
                      className={`badge ${
                        item.status === "Resolved"
                          ? "bg-success"
                          : item.status === "Rejected"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {item.status || "Pending"}
                    </span>
                  </div>
                  <h6 className="text-muted small mb-2">{item.email}</h6>
                  <p className="card-text text-secondary">{item.message}</p>
                </div>
                <div className="card-footer bg-transparent border-0 text-end text-muted small">
                  📅{" "}
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : "No Date"}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted py-5">
            No complaint messages found.
          </div>
        )}
      </div>
    </div>
  );
}

export default ComplainMessage;
