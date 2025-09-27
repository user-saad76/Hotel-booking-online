function HotelBookingRecord() {
  return (
    <div className="container my-4">
      <h3 className="mb-4">Hotel Booking Records</h3>
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Guest</th>
                <th>Hotel</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Status</th>
                <th>Amount ($)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>John Doe</td>
                <td>Luxury Palace</td>
                <td>2025-09-25</td>
                <td>2025-09-28</td>
                <td><span className="badge bg-success">Confirmed</span></td>
                <td>$750</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Sarah Khan</td>
                <td>Sea View Resort</td>
                <td>2025-10-02</td>
                <td>2025-10-05</td>
                <td><span className="badge bg-warning text-dark">Pending</span></td>
                <td>$450</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Ali Raza</td>
                <td>City Inn</td>
                <td>2025-09-20</td>
                <td>2025-09-22</td>
                <td><span className="badge bg-danger">Cancelled</span></td>
                <td>$0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HotelBookingRecord;
