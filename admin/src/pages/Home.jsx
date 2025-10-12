
function Home() {
  return (
    <>
      <div className="container-fluid py-4">
        {/* Header Section */}
        <div className="d-sm-flex align-items-center justify-content-between mb-3">
          <div>
            <h2 className="h4 mb-0">Admin Home</h2>
            <small className="text-muted">Overview of bookings & hotel operations</small>
          </div>

          <div className="d-flex gap-2">
            <input
              id="globalSearch"
              className="form-control form-control-sm"
              style={{ minWidth: "240px" }}
              placeholder="Search bookings or customers..."
            />
            <button className="btn btn-primary" id="btnNewBooking">
              <i className="bi bi-plus-lg"></i> New Booking
            </button>
            <button className="btn btn-outline-secondary" id="btnAddHotel">
              <i className="bi bi-building-add"></i> Add Hotel
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="card shadow-sm">
              <div className="card-body d-flex align-items-center">
                <div className="me-3">
                  <i className="bi bi-bookmark-check text-primary fs-4"></i>
                </div>
                <div>
                  <div className="text-muted small">Total Bookings</div>
                  <div className="h5 mb-0">1,284</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card shadow-sm">
              <div className="card-body d-flex align-items-center">
                <div className="me-3">
                  <i className="bi bi-currency-dollar text-success fs-4"></i>
                </div>
                <div>
                  <div className="text-muted small">Revenue (30d)</div>
                  <div className="h5 mb-0">$42,730</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card shadow-sm">
              <div className="card-body d-flex align-items-center">
                <div className="me-3">
                  <i className="bi bi-door-open text-warning fs-4"></i>
                </div>
                <div>
                  <div className="text-muted small">Rooms Occupied</div>
                  <div className="h5 mb-0">328 / 480</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="card shadow-sm">
              <div className="card-body d-flex align-items-center">
                <div className="me-3">
                  <i className="bi bi-exclamation-circle text-danger fs-4"></i>
                </div>
                <div>
                  <div className="text-muted small">Pending Check-ins</div>
                  <div className="h5 mb-0">12</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="row">
          {/* Recent Bookings */}
          <div className="col-lg-8 mb-4">
            <div className="card shadow-sm">
              <div className="card-header d-flex align-items-center justify-content-between">
                <strong>Recent Bookings</strong>
                <small className="text-muted">Latest 10</small>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light small">
                      <tr>
                        <th>#</th>
                        <th>Guest</th>
                        <th>Hotel</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>BK-1001</td>
                        <td>Maria Khan</td>
                        <td>Sunrise Hotel</td>
                        <td>2025-10-16</td>
                        <td>2025-10-18</td>
                        <td>$210</td>
                        <td>
                          <span className="badge bg-success">Confirmed</span>
                        </td>
                        <td className="text-end">
                          <button className="btn btn-sm btn-outline-primary me-1">
                            View
                          </button>
                          <button className="btn btn-sm btn-success me-1">
                            Check-in
                          </button>
                          <button className="btn btn-sm btn-danger">Cancel</button>
                        </td>
                      </tr>

                      <tr>
                        <td>BK-1000</td>
                        <td>Ali Raza</td>
                        <td>Seaview Resort</td>
                        <td>2025-10-14</td>
                        <td>2025-10-15</td>
                        <td>$95</td>
                        <td>
                          <span className="badge bg-warning text-dark">Pending</span>
                        </td>
                        <td className="text-end">
                          <button className="btn btn-sm btn-outline-primary me-1">
                            View
                          </button>
                          <button className="btn btn-sm btn-success me-1">
                            Confirm
                          </button>
                          <button className="btn btn-sm btn-danger">Cancel</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer text-muted small d-flex justify-content-between">
                <div>
                  Last updated: <strong>Oct 12, 2025</strong>
                </div>
                <a href="#" className="link-primary">
                  View all bookings
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar Widgets */}
          <div className="col-lg-4 mb-4">
            <div className="card shadow-sm mb-3">
              <div className="card-header">
                <strong>Today's Check-ins</strong>
              </div>
              <div className="card-body">
                <ul className="list-unstyled mb-0 small">
                  <li className="mb-2">
                    <strong>BK-0989</strong> — Ahmed (Seaview)
                    <span className="float-end text-success">Checked in</span>
                  </li>
                  <li className="mb-2">
                    <strong>BK-0993</strong> — Nina (Sunrise)
                    <span className="float-end text-warning">Pending</span>
                  </li>
                  <li className="mb-2">
                    <strong>BK-1001</strong> — Maria (Sunrise)
                    <span className="float-end text-warning">Pending</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="card shadow-sm">
              <div className="card-header">
                <strong>Quick Reports</strong>
              </div>
              <div className="card-body small">
                <div>
                  Total revenue (YTD): <strong>$320,400</strong>
                </div>
                <div className="mt-2">
                  Avg. nightly rate: <strong>$110</strong>
                </div>
                <div className="mt-2">
                  Occupancy (30d): <strong>68%</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
