// src/Pages/PaymentCancel.jsx
import { Link } from "react-router-dom";

function PaymentCancel() {
  return (
    <div className="container text-center my-5">
      <h1 className="text-danger">❌ Payment Cancelled</h1>
      <p className="lead">
        Your payment was cancelled. You can try booking again.
      </p>
      <Link to="/rooms" className="btn btn-dark mt-3">
        🔁 Try Again
      </Link>
    </div>
  );
}

export default PaymentCancel;
