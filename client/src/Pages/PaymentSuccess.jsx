import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    if (sessionId) {
      console.log("✅ Stripe session ID:", sessionId);
      confirmPayment(sessionId);
    }
  }, [sessionId]);

  const confirmPayment = async (sessionId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:7000/payment/confirm",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" , 
            "Authorization": `Bearer ${token}`, },
          body: JSON.stringify({ sessionId}),
        }
      );

      const data = await response.json();
      console.log("&&&",response);
      
      console.log("✅ Session Details:", data);
      setSessionData(data);
    } catch (error) {
      console.error("❌ Error fetching session details:", error);
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>🎉 Payment Successful</h2>
      <p>Session ID: {sessionId}</p>

      {sessionData ? (
        <div className="mt-3">
          <h5>Payment Info:</h5>
          <p>
            <strong>Customer:</strong> {sessionData.customer_email || "N/A"}
          </p>
          <p>
            <strong>Amount Paid:</strong>{" "}
            {sessionData.amount_total
              ? `$${(sessionData.amount_total / 100).toFixed(2)}`
              : "N/A"}
          </p>
          <p>
            <strong>Status:</strong> {sessionData.payment_status || "N/A"}
          </p>
        </div>
      ) : (
        <p>Fetching session details...</p>
      )}
      
    </div>
   
  );
}

export default PaymentSuccess;
