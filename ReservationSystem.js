import React, { useState } from "react";
import tableImg from "./images.png";

function ReservationSystem({ reservations, onReserve }) {
  const [name, setName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleReserve = () => {
    if (!name || !tableNumber || !date || !startTime || !endTime) {
      alert("Please fill all fields");
      return;
    }
    const reservationDateTime = new Date(`${date}T${startTime}`);
    if (reservationDateTime < new Date()) {
      alert("You cannot reserve a table in the past!");
      return;
    }
    onReserve({ name, tableNumber, date, startTime, endTime });
    setName("");
    setTableNumber("");
    setDate("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <div>
      <h2>Reserve a Table</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
        {[...Array(5)].map((_, i) => (
          <div key={i + 1} style={tableCardStyle}>
            <img src={tableImg} alt={`Table ${i + 1}`} style={tableImgStyle} />
            <p>Table {i + 1}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
        {[...Array(5)].map((_, i) => (
          <div key={i + 6} style={tableCardStyle}>
            <img src={tableImg} alt={`Table ${i + 6}`} style={tableImgStyle} />
            <p>Table {i + 6}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        <input type="text" placeholder="Customer Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
        <select value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} style={inputStyle}>
          <option value="">Select Table</option>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>Table {i + 1}</option>
          ))}
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} style={inputStyle} />
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} style={inputStyle} />
        <button onClick={handleReserve} style={buttonStyle}>Reserve</button>
      </div>
    </div>
  );
}

const tableCardStyle = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "10px",
  width: "100px",
  textAlign: "center",
  background: "#fff",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

const tableImgStyle = {
  display: "block",
  margin: "auto",
  width: "80px",
  height: "80px",
};

const inputStyle = {
  padding: "10px",
  width: "220px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const buttonStyle = {
  padding: "10px 15px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default ReservationSystem;
