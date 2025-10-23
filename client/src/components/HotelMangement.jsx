
import manager from '../assets/manager-2.jpg'
import frontOffice from '../assets/front office.jpg'
import Chef from '../assets/chef-1.jpg'
import Housekeeping from '../assets/housekeeper.jpg'
function HotelMangement () {
    return(
      <>
        <div className="container my-5">
  <h2 className="fw-bold text-center mb-4">Hotel Management Team</h2>
  <div className="row g-4">
    <div className="col-md-3">
      <div className="card h-100 shadow border-0">
        <img src={manager} className="card-img-top" alt="John Smith"/>
        <div className="card-body text-center">
          <h5 className="card-title fw-bold">John Smith</h5>
          <p className="text-primary mb-1">General Manager</p>
          <p className="card-text text-muted">
            Oversees overall hotel operations ensuring world-className service.
          </p>
        </div>
        <div className="card-footer bg-white text-center">
          <button className="btn btn-outline-primary btn-sm">Contact</button>
        </div>
      </div>
    </div>

  
    <div className="col-md-3">
      <div className="card h-100 shadow border-0">
        <img src={frontOffice} className="card-img-top" alt="Emily Johnson"/>
        <div className="card-body text-center">
          <h5 className="card-title fw-bold">Emily Johnson</h5>
          <p className="text-primary mb-1">Front Office Manager</p>
          <p className="card-text text-muted">
            Leads the reception team and ensures smooth guest check-ins.
          </p>
        </div>
        <div className="card-footer bg-white text-center">
          <button className="btn btn-outline-primary btn-sm">Contact</button>
        </div>
      </div>
    </div>

    
    <div className="col-md-3">
      <div className="card h-100 shadow border-0">
        <img src={Chef} className="card-img-top" alt="Michael Lee"/>
        <div className="card-body text-center">
          <h5 className="card-title fw-bold">Michael Lee</h5>
          <p className="text-primary mb-1">Executive Chef</p>
          <p className="card-text text-muted">
            Specializes in fine dining and international cuisines.
          </p>
        </div>
        <div className="card-footer bg-white text-center">
          <button className="btn btn-outline-primary btn-sm">Contact</button>
        </div>
      </div>
    </div>

   
    <div className="col-md-3">
      <div className="card h-100 shadow border-0">
        <img src={Housekeeping} className="card-img-top" alt="Sophia Brown"/>
        <div className="card-body text-center">
          <h5 className="card-title fw-bold">Sophia Brown</h5>
          <p className="text-primary mb-1">Housekeeping Manager</p>
          <p className="card-text text-muted">
            Ensures clean, safe, and comfortable rooms for every guest.
          </p>
        </div>
        <div className="card-footer bg-white text-center">
          <button className="btn btn-outline-primary btn-sm">Contact</button>
        </div>
      </div>
    </div>
  </div>
</div>

      </>
    )
}
export default HotelMangement