import BannerFirst from "../assets/luxury-hotel-3.jpg";

function Banner() {
  return (
    <>
      <div
        className="banner position-relative text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "60vh", // ✅ responsive height
        }}
      >
        {/* White overlay */}
        <div className="overlay position-absolute top-0 start-0 w-100 h-100 bg-white opacity-50"></div>

        {/* Centered Content */}
        <div className="position-relative d-flex flex-column justify-content-center align-items-center h-100 px-3 text-center">
          <h1 className="fw-bold fs-2 fs-md-1 text-dark text-uppercase">
            Find Your Perfect Stay
          </h1>
          <p className="lead text-dark mb-3">
            Book luxury hotels at the best prices
          </p>
          <a
            href="/rooms"
            className="btn btn-warning px-4 py-2 fw-semibold"
          >
            Explore Rooms
          </a>
        </div>
      </div>
    </>
  );
}

export default Banner;
