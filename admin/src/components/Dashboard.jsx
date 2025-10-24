
import React, { useState } from "react";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar bg-dark text-light ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header d-flex justify-content-between align-items-center p-3">
          <h4 className="m-0">🏨 Admin</h4>
          <button
            className="btn btn-sm btn-outline-light d-lg-none"
            onClick={() => setIsSidebarOpen(false)}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <nav className="nav flex-column p-3">
          <a href="#" className="nav-link active">
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </a>
          <a href="#" className="nav-link">
            <i className="bi bi-building me-2"></i> Hotels
          </a>
          <a href="#" className="nav-link">
            <i className="bi bi-calendar-check me-2"></i> Bookings
          </a>
          <a href="#" className="nav-link">
            <i className="bi bi-people me-2"></i> Users
          </a>
          <a href="#" className="nav-link">
            <i className="bi bi-chat-left-text me-2"></i> Reviews
          </a>
          <a href="#" className="nav-link">
            <i className="bi bi-gear me-2"></i> Settings
          </a>
          <hr className="border-secondary" />
          <a href="#" className="nav-link text-danger">
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content flex-grow-1">
        {/* Navbar */}
        <nav className="navbar navbar-light bg-white shadow-sm p-3">
          <div className="d-flex align-items-center w-100 justify-content-between">
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-secondary me-2 d-lg-none"
                onClick={() => setIsSidebarOpen(true)}
              >
                <i className="bi bi-list"></i>
              </button>
                <h5>Dashboard</h5>
            </div>
           
          </div>
        </nav>

        {/* Dashboard Stats */}
        <div className="container-fluid mt-4">
          <div className="row g-3">
            <div className="col-6 col-md-3">
              <div className="stat-card">
                <h6>Total Hotels</h6>
                <h3 className="text-accent">25</h3>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-card">
                <h6>Total Bookings</h6>
                <h3 className="text-success">180</h3>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-card">
                <h6>Total Users</h6>
                <h3 className="text-warning">450</h3>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-card">
                <h6>Revenue</h6>
                <h3 className="text-danger">$12,400</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
