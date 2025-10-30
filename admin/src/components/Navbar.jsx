import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import socket from "../utils/socket";
import moment from 'moment';

function Navbar() {
   const [messages,setMessages]= useState([])

   useEffect(()=>{
    socket.on("new-order",(data)=>{
      console.log("socket-data",data);
      
   setMessages((messages) => [...messages, data]);
    })
   },[])


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
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <i className="bi bi-building-check"></i> HotelAdmin
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#adminNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="adminNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/dashboard">
                  <i className="bi bi-speedometer2 me-1"></i> Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add.hotel">
                  <i className="bi bi-door-open me-1"></i> Hotels
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/bookingOrder">
                  <i className="bi bi-calendar-check me-1"></i> Bookings
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="bi bi-people me-1"></i> Guests
                </a>
              </li>

              {/* Messages Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="messageDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-envelope-fill me-1"></i> Messages
                  <span className="badge bg-danger rounded-pill">{messages.length}</span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="messageDropdown"
                >
                  {
                    messages?.length == 0? <p>No messages</p>:
                  messages && messages?.map((message)=>{
                    return(
                      <>
                        <li>
                    <a className="dropdown-item" href="#">
                      <strong>{message.customer_name}</strong>
                      <p>Hotel payment is delivered</p> 
                       <small>{moment.utc(message.createdAt).fromNow()}</small>
                    </a>
                     
                  </li>
                     <li>
                    <hr className="dropdown-divider" />
                  </li>
                  </>
                    )
                  })
                }
                  {/* <li>
                    <a className="dropdown-item text-primary" href="#">
                      View all messages
                    </a>
                  </li> */}
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/reports">
                  <i className="bi bi-bar-chart-line me-1"></i> Reports
                </Link>
              </li>
            </ul>

            {/* ✅ Admin/User Dropdown Section */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  id="adminDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="fw-semibold">
                    {admin ? admin.name : "Admin"}
                  </span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="adminDropdown"
                >
                  {/* If not logged in → show Signin/Signup */}
                  {!admin ? (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/sign-in">
                          <i className="bi bi-person-circle me-2 text-primary"></i>
                          Sign In
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/sign-up">
                          <i className="bi bi-person-plus me-2 text-success"></i>
                          Sign Up
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={handleLogout}
                        >
                          <i className="bi bi-box-arrow-right me-2"></i> Logout
                        </button>
                      </li>
                       <li>
                        <button
                          className="dropdown-item "
                        >
                          <i className="me-2"></i> Dashboard
                        </button>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/sign-up">
                          <i className="bi bi-person-plus me-2 text-success"></i>
                          Sign Up
                        </Link>
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
