
import React, { useState } from "react";
import tableImg from "./images.png";

function ReservationSystem({ reservations, onReserve, onTableClick }) {
  const [name, setName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [showAllReservations, setShowAllReservations] = useState(false);

  const handleReserve = () => {
    if (!name || !tableNumber || !date || !startTime || !endTime) {
      alert("Please fill all fields");
      return;
    }
    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);
    const now = new Date();
    if (start < now) {
      alert("You cannot reserve a table in the past!");
      return;
    }
    if (end <= start) {
      alert("End time must be after the start time and cannot be earlier (overnight reservations are not allowed).");
      return;
    }
    if ((end - start) < 30 * 60 * 1000) {
      alert("Reservation must be at least 30 minutes!");
      return;
    }
    onReserve({ name, tableNumber: String(tableNumber), date, startTime, endTime });
    setName("");
    setTableNumber("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setShowFormModal(false);
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

  const today = new Date().toISOString().split("T")[0];

  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", right: 0, top: -10, width: 320 }}>
        <button
          onClick={() => setShowAllReservations(!showAllReservations)}
          style={openFormBtnStyle}
        >
          {showAllReservations ? "Hide Reservations" : "Show Reservations"}
        </button>
        {showAllReservations && (
          <div style={{ marginTop: 12, maxHeight: 200, overflowY: "auto", background: "#fff", padding: 10, borderRadius: 6, boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}>
            <h4 style={{ margin: "0 0 8px 0" }}>All Reservations</h4>
            {reservations.length === 0 ? (
              <p style={{ fontSize: 14 }}>No reservations yet</p>
            ) : (
  <ol className="reservation-list">
    {reservations.map((res, index) => (
      <li key={index} className="reservation-item">
        <div className="reservation-details">
          {res.name}, Table:{res.tableNumber} 
          <div>Date:{res.date}</div>
           <div>({res.startTime} - {res.endTime})</div>
      </div>
    </li>
  ))}
</ol>
            )}
          </div>
        )}
      </div>

      <h2>Table Booking</h2>

      <div className="table-grid">
        {[...Array(10)].map((_, i) => {
          const tableNum = i + 1;
          const reserved = isTableReservedNow(tableNum);
          const activeRes = getActiveReservation(tableNum);
          return (
            <div
              key={tableNum}
              className="table-card"
              style={{ background: reserved ? "#e96666ff" : "#eef862ff", cursor: reserved ? "pointer" : "default" }}
              onClick={() => reserved && onTableClick(activeRes)}
            >
              <img src={tableImg} alt={`Table ${tableNum}`} style={tableImgStyle} />
              <p>Table {tableNum}</p>
              {reserved && <small style={{ color: "yellow" }}>Reserved Now</small>}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 14 }}>
        <button onClick={() => setShowFormModal(true)} style={openFormBtnStyle}>Reserve a Table</button>
      </div>

      {showFormModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={() => setShowFormModal(false)} style={modalCloseBtnStyle}>Close</button>
            <h3 style={{ marginTop: 6 }}>New Reservation</h3>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginTop: 8 }}>
              <input
                type="text"
                placeholder="Customer Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />
              <select value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} style={inputStyle}>
                <option value="">Select Table</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Table {i + 1}
                  </option>
                ))}
              </select>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} min={today} />
              <input type="time" placeholder="Arrival Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} style={inputStyle} />
              <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} style={inputStyle} />
              <button onClick={handleReserve} style={reserveBtnStyle}>Reserve</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const tableImgStyle = {
  display: "block",
  margin: "6px 0",
  width: "58px",
  height: "58px",
};

const openFormBtnStyle = {
  padding: "10px 18px",
  backgroundColor: "#030000c5",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "700",
  boxShadow: "0 6px 10px rgba(0,0,0,0.08)"
};

const modalCloseBtnStyle = {
  position: "absolute",
  top: 12,
  right: 12,
  background: "#ff6b6b",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "700"
};

const inputStyle = {
  padding: "10px",
  width: "260px",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "6px",
  boxSizing: "border-box"
};

const reserveBtnStyle = {
  padding: "10px 18px",
  backgroundColor: "#001111ff",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "700",
  boxShadow: "0 6px 10px rgba(0,0,0,0.08)"
};

export default ReservationSystem;
