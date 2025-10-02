import React from "react"
import { useAuth } from "../contexts/AuthProvider"
function Dashboard() {
     const {user,error,loading} = useAuth()
    return(
        <>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold" href="#">Dashboard</a>
      <div class="d-flex">
        <span class="navbar-text text-white me-3">Welcome, {user?.fullname}</span>
        <button class="btn btn-outline-light btn-sm">Logout</button>
      </div>
    </div>
  </nav>

  <div class="container-fluid">
    <div class="row">
     
      <div class="col-md-3 col-lg-2 bg-light sidebar py-4">
        <ul class="nav flex-column">
          <li class="nav-item mb-2"><a class="nav-link active" href="#">📋 User Details</a></li>
          <li class="nav-item mb-2"><a class="nav-link" href="#">⚙ Settings</a></li>
          <li class="nav-item mb-2"><a class="nav-link" href="#">📊 Reports</a></li>
          <li class="nav-item mb-2"><a class="nav-link" href="#">🔒 Security</a></li>
        </ul>
      </div>

      
      <div class="col-md-9 col-lg-10 p-4">
        <h2 class="mb-4">User Profile</h2>

        
        <div class="card shadow-sm border-0">
          <div class="row g-0">
            <div class="col-md-4 d-flex align-items-center justify-content-center bg-light">
              <img src="https://via.placeholder.com/150" class="img-fluid rounded-circle m-4" alt="User Image"/>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h4 class="card-title">{user?.fullname}</h4>
                <p class="card-text"><strong>Email:</strong>{user?.email}</p>
                <p class="card-text"><strong>Phone:</strong> +92 300 1234567</p>
                <p class="card-text"><strong>Role:</strong> Admin</p>
                <p class="card-text"><strong>Joined:</strong> Jan 10, 2024</p>
                <a href="#" class="btn btn-primary btn-sm">Edit Profile</a>
                <a href="#" class="btn btn-outline-secondary btn-sm">Change Password</a>
              </div>
            </div>
          </div>
        </div>

       
        <div class="row mt-4">
          <div class="col-md-6">
            <div class="card shadow-sm border-0 mb-3">
              <div class="card-body">
                <h5 class="card-title">Recent Activity</h5>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Logged in from Chrome - 2 hrs ago</li>
                  <li class="list-group-item">Updated profile info - Yesterday</li>
                  <li class="list-group-item">Changed password - 1 week ago</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card shadow-sm border-0">
              <div class="card-body">
                <h5 class="card-title">Statistics</h5>
                <p>Total Logins: <span class="fw-bold">120</span></p>
                <p>Reports Generated: <span class="fw-bold">15</span></p>
                <p>Active Sessions: <span class="fw-bold">2</span></p>
              </div>
            </div>
          </div>
        </div>

      </div> 
    </div>
  </div>
        </>
       
    )
}
export default Dashboard