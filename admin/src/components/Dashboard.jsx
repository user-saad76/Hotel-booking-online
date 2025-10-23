
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
              <h4 className="m-0">Dashboard</h4>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-bell fs-5 me-3"></i>
              <img
                src="https://i.pravatar.cc/40"
                alt="Admin"
                className="rounded-circle"
                width="40"
                height="40"
              />
            </div>
          </div>
        </nav>

        {/* Dashboard Stats */}
        <div className="container-fluid mt-4">
          <div className="row g-3">
            <div className="col-6 col-md-3">
              <div className="stat-card">
                <h6>Total Hotels</h6>
                <h3 className="text-primary">25</h3>
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

          {/* Recent Bookings */}
          <div className="card mt-4 shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Recent Bookings</h5>
            </div>
            <div className="card-body table-responsive">
              <table className="table table-striped align-middle">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Hotel</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Ali Raza</td>
                    <td>Grand Palace</td>
                    <td>2025-10-25</td>
                    <td>2025-10-28</td>
                    <td><span className="badge bg-success">Confirmed</span></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Saad Khan</td>
                    <td>Sunrise Resort</td>
                    <td>2025-11-01</td>
                    <td>2025-11-03</td>
                    <td><span className="badge bg-warning">Pending</span></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Ayesha Noor</td>
                    <td>Seaview Hotel</td>
                    <td>2025-10-29</td>
                    <td>2025-11-02</td>
                    <td><span className="badge bg-danger">Cancelled</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Users */}
          <div className="card mt-4 shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Recent Users</h5>
            </div>
            <div className="card-body table-responsive">
              <table className="table table-striped align-middle">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Joined On</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Hassan Ahmed</td>
                    <td>hassan@example.com</td>
                    <td>2025-10-01</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Fatima Ali</td>
                    <td>fatima@example.com</td>
                    <td>2025-10-15</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Umer Farooq</td>
                    <td>umer@example.com</td>
                    <td>2025-10-20</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
