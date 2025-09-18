import React, { useState } from "react";

function Payment({ order, onPayment }) {
  const [method, setMethod] = useState("");

  const calculateTotal = () => {
    return order.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);
  };

  const handlePay = () => {
    if (!method) {
      alert("Please select a payment method.");
      return;
    }
    alert(`Payment successful via ${method}!`);
    onPayment();
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Payment</h2>
      <p>Total Amount: ${calculateTotal()}</p>
      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      >
        <option value="">Select Payment Method</option>
        <option value="Card">Card</option>
        <option value="Cash">Cash</option>
        <option value="UPI">UPI</option>
      </select>
      <br />
      <button onClick={handlePay} style={payButtonStyle}>Pay Now</button>
    </div>
  );
}

const payButtonStyle = {
  padding: "10px 15px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Payment;
