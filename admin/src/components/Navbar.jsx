import { Link } from "react-router";

function Navbar() {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark sticky-top bg-dark">
        <div class="container-fluid">
          {/* ✅ Hamburger for Sidebar (Offcanvas Trigger) */}
          <button
            class="btn btn-outline-light me-2 d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebarOffcanvas"
            aria-controls="sidebarOffcanvas"
          >
            <i class="bi bi-list fs-4"></i>
          </button>

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
                <Link class="nav-link" to ="/add.hotel">
                  <i class="bi bi-door-open me-1"></i> Hotels
                </Link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <i class="bi bi-calendar-check me-1"></i> Bookings
                </a>
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
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Admin Avatar"
                    class="admin-avatar me-2"
                  />
                  <span class="fw-semibold">Admin</span>
                </a>
                <ul
                  class="dropdown-menu dropdown-menu-end"
                  aria-labelledby="adminDropdown"
                >
                  <li>
                    <a class="dropdown-item" href="#">
                      <i class="bi bi-person-circle me-2 text-primary"></i>Profile
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      <i class="bi bi-gear me-2 text-warning"></i>Settings
                    </a>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a class="dropdown-item text-danger" href="#">
                      <i class="bi bi-box-arrow-right me-2"></i>Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ✅ Bootstrap Offcanvas Sidebar */}
      <div
        class="offcanvas offcanvas-start bg-dark text-white"
        tabindex="-1"
        id="sidebarOffcanvas"
        aria-labelledby="sidebarOffcanvasLabel"
      >
        <div class="offcanvas-header border-bottom">
          <h5 class="offcanvas-title" id="sidebarOffcanvasLabel">
            <i class="bi bi-person-circle me-2"></i> Admin Panel
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body p-0">
          {/* ✅ Sidebar */}
        </div>
      </div>
    </>
  );
}

export default Navbar;
