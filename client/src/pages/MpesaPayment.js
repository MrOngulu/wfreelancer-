import React, { useState } from "react";
import { initiateMpesaPayment } from "../api/payments";

const MpesaPayment = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleMpesa = async () => {
    try {
      setStatus("Sending STK push...");

      const data = await initiateMpesaPayment(phone, amount);

      if (data.CheckoutRequestID) {
        setStatus("STK Push sent. Check your phone.");
      }
    } catch (err) {
      setStatus("Payment failed");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>M-Pesa Payment</h2>

      <input
        placeholder="Phone (2547...)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleMpesa}>
        Pay with M-Pesa
      </button>

      <p>{status}</p>
    </div>
  );
};


export default MpesaPayment;