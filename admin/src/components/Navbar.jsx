import React, { useEffect, useState } from "react";
import { Link } from "react-router";

function Navbar() {
  // ✅ Step 1: Hold admin data
  const [admin, setAdmin] = useState(null);

  // ✅ Step 2: Fetch logged-in admin info from backend
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch("http://localhost:7000/admin-user/me", {
          method: "GET",
          credentials: "include", // send cookie with request
        });

        if (!res.ok) {
          console.log("Not authenticated");
          return;
        }

        const data = await res.json();
        console.log("Admin data:", data);
        setAdmin(data);
      } catch (error) {
        console.error("Error fetching admin:", error);
      }
    };

    fetchAdmin();
  }, []);

  // ✅ Step 3: Logout function
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:7000/admin-user/logout", {
        method: "POST",
        credentials: "include",
      });
      setAdmin(null);
      window.location.reload(); // refresh after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark sticky-top bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <i class="bi bi-building-check"></i> HotelAdmin
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#adminNavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="adminNavbar">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" to="/dashboard">
                  <i class="bi bi-speedometer2 me-1"></i> Dashboard
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/add.hotel">
                  <i class="bi bi-door-open me-1"></i> Hotels
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/bookingOrder">
                  <i class="bi bi-calendar-check me-1"></i> Bookings
                </Link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="bi bi-people me-1"></i> Guests
                </a>
              </li>

              {/* Messages Dropdown */}
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="messageDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="bi bi-envelope-fill me-1"></i> Messages
                  <span class="badge bg-danger rounded-pill">3</span>
                </a>
                <ul
                  class="dropdown-menu dropdown-menu-end"
                  aria-labelledby="messageDropdown"
                >
                  <li>
                    <a class="dropdown-item" href="#">
                      <strong>Ali Raza:</strong> Need room info
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      <strong>Sana Khan:</strong> Booking confirmed
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      <strong>John Doe:</strong> Check-in tomorrow
                    </a>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a class="dropdown-item text-primary" href="#">
                      View all messages
                    </a>
                  </li>
                </ul>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="bi bi-bar-chart-line me-1"></i> Reports
                </a>
              </li>
            </ul>

            {/* ✅ Admin/User Dropdown Section */}
            <ul class="navbar-nav ms-auto">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  id="adminDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class="fw-semibold">
                    {admin ? admin.name : "Admin"}
                  </span>
                </a>
                <ul
                  class="dropdown-menu dropdown-menu-end"
                  aria-labelledby="adminDropdown"
                >
                  {/* If not logged in → show Signin/Signup */}
                  {!admin ? (
                    <>
                      <li>
                        <Link class="dropdown-item" to="/sign-in">
                          <i class="bi bi-person-circle me-2 text-primary"></i>
                          Sign In
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item" to="/sign-up">
                          <i class="bi bi-person-plus me-2 text-success"></i>
                          Sign Up
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <button
                          class="dropdown-item text-danger"
                          onClick={handleLogout}
                        >
                          <i class="bi bi-box-arrow-right me-2"></i> Logout
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
