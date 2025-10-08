import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function HotelRevenueByCity() {
  const data = [
    { city: "Karachi", revenue: 40000 },
    { city: "Lahore", revenue: 35000 },
    { city: "Islamabad", revenue: 30000 },
    { city: "Multan", revenue: 18000 },
    { city: "Peshawar", revenue: 15000 },
  ];

  return (
    <div className="container my-4">
      <h3 className="mb-4">Hotel Revenue by City</h3>

      {/* Revenue Table */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>City</th>
                <th>Revenue ($)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.city}</td>
                  <td>${item.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Graph */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">Revenue Comparison (City-wise)</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#198754" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default HotelRevenueByCity;
