import React, { useContext } from "react";
import { Link } from "react-router";
import { useAuth } from "../contexts/AuthProvider";

const Navbar = () => {
     const  {user,error,loading,logout} = useAuth();
     
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        {/* Logo / Brand */}
        <a className="navbar-brand fw-bold" href="/">
          🏨 HotelBook
        </a>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to ="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to ="/rooms">
                Rooms
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to ="/booking">
                Bookings
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact
              </a>
            </li>

            {/* Dropdown for Login/Signup */}
            <li className="nav-item dropdown">

                 {
                   user && user.fullname?(
                   <>
                             <a
                className="nav-link dropdown-toggle btn btn-light text-dark ms-2 px-3"
                href="#"
                id="accountDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {loading?"loading":user?.fullname}
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
                <li>
                   <Link to = '/dashboard' className="dropdown-item" >
                     Dashboard
                  </Link>
                  <button onClick={logout}className="dropdown-item" >
                    log out
                  </button>
                </li>

              </ul>
                   </>
                  ):(
                      <>
                         <a
                className="nav-link dropdown-toggle btn btn-light text-dark ms-2 px-3"
                href="#"
                id="accountDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="accountDropdown">
                <li>
                  <Link className="dropdown-item" to ="/sign-in">
                   Sign In
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to ="/sign-up">
                    Sign Up
                  </Link>
                </li>
              </ul>
                      </>
                  
              
                  )
                } 
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
