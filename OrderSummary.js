import React from 'react';
import { useNavigate } from 'react-router-dom';
const OrderSummary = () => {
  const navigate = useNavigate();
  const handlePayment = () => {
    navigate('/payment');
  };
  return (
    <div>
      <h2>Order Summary</h2>
      <p>Total Amount: $42.99 (example)</p>
      <button onClick={handlePayment}>Proceed to Payment</button>
    </div>
  );
};
export default OrderSummary;
