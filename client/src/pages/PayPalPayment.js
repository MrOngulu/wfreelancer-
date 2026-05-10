import React, { useState } from "react";
import { initiatePayPalPayment } from "../api/payments";

const PayPalPayment = () => {
  const [amount, setAmount] = useState("");

  const handlePayment = async () => {
    try {
      const data = await initiatePayPalPayment(amount);

      // backend returns approval URL
      if (data.approvalUrl) {
        window.location.href = data.approvalUrl;
      }
    } catch (err) {
      console.error("PayPal error:", err);
    }
  };

  return (
    <div>
      <h2>Pay with PayPal</h2>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
};

export default PayPalPayment;