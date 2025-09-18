import React, { useState } from "react";
import tableImg from "./images.png";

function ReservationSystem({ reservations, onReserve, onTableClick }) {
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

  const isTableReservedNow = (tableNum) => {
    const now = new Date();
    return reservations.some((r) => {
      if (r.tableNumber !== String(tableNum)) return false;
      const start = new Date(`${r.date}T${r.startTime}`);
      const end = new Date(`${r.date}T${r.endTime}`);
      return now >= start && now <= end;
    });
  };

  const getActiveReservation = (tableNum) => {
    const now = new Date();
    return reservations.find((r) => {
      if (r.tableNumber !== String(tableNum)) return false;
      const start = new Date(`${r.date}T${r.startTime}`);
      const end = new Date(`${r.date}T${r.endTime}`);
      return now >= start && now <= end;
    });
  };

  return (
    <div>
      <h2>Reserve a Table</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "50px" }}>
        {[...Array(5)].map((_, i) => {
          const tableNum = i + 1;
          const reserved = isTableReservedNow(tableNum);
          const activeRes = getActiveReservation(tableNum);
          return (
            <div
              key={tableNum}
              style={{
                ...tableCardStyle,
                background: reserved ? "#d9534f" : "#8a4d4dff",
                cursor: reserved ? "pointer" : "default"
              }}
              onClick={() => reserved && onTableClick(activeRes)}
            >
              <img src={tableImg} alt={`Table ${tableNum}`} style={tableImgStyle} />
              <p>Table {tableNum}</p>
              {reserved && <small style={{ color: "yellow" }}>Reserved Now</small>}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
        {[...Array(5)].map((_, i) => {
          const tableNum = i + 6;
          const reserved = isTableReservedNow(tableNum);
          const activeRes = getActiveReservation(tableNum);
          return (
            <div
              key={tableNum}
              style={{
                ...tableCardStyle,
                background: reserved ? "#d9534f" : "#8a4d4dff",
                cursor: reserved ? "pointer" : "default"
              }}
              onClick={() => reserved && onTableClick(activeRes)}
            >
              <img src={tableImg} alt={`Table ${tableNum}`} style={tableImgStyle} />
              <p>Table {tableNum}</p>
              {reserved && <small style={{ color: "yellow" }}>Reserved Now</small>}
            </div>
          );
        })}
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
  border: "1px solid #5e8f0fff",
  borderRadius: "8px",
  padding: "10px",
  width: "100px",
  textAlign: "center",
  background: "#8a4d4dff",
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
