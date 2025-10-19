

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";


function Booking({hotels}) {
  const [search,setSearch] = useState("")
  const [filteredHotels, setFilteredHotels] = useState(hotels || []);
  useEffect(()=>{
     if(!search){
       setFilteredHotels(hotels)
     }
     else{
      const lowerSearch = search.toLowerCase();
      const filtered = hotels?.filter((hotel)=>
         hotel.name.toLowerCase().includes(lowerSearch) ||
          hotel.location.toLowerCase().includes(lowerSearch)

      );
     setFilteredHotels(filtered)
     }
  },[search,hotels])
 const handleSubmit = (e)=>{
    e.preventDefault();
 }
  return (
    <>
      <div className="container my-4">
        {/* Search Bar */}
        <form className="input-group mb-4" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by hotel or location"
            onChange={(e) => setSearch(e.target.value)}

          />
          <button className="btn btn-primary">Search</button>
        </form>

        {/* Hotel Cards */}
        <div className="row">
          {filteredHotels?.map((hotel, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card shadow-sm h-100">
                <img
                  src={hotel.mainImage?.secure_url|| "https://via.placeholder.com/400x200?text=Hotel"}
                  className="card-img-top"
                  alt={hotel.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{hotel.name}</h5>
                  <p className="text-muted">{hotel.location}</p>
                  <p className="card-text">{hotel.description}</p>
                  <Link to={`/hotels/${hotel.slug}`} className="btn btn-outline-primary w-100">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
     
    </>
  );
}

export default Booking;
