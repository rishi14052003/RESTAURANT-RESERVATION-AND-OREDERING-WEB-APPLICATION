import React from "react";

function TableHistory({ reservations, onTableClick }) {
  return (
    <div>
      <h2>Reservation History</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {reservations.map((res, index) => (
          <li
            key={index}
            style={historyItemStyle}
            onClick={() => onTableClick(res)}
          >
            {res.name} reserved Table {res.tableNumber} on {res.date} from {res.startTime} to {res.endTime}
          </li>
        ))}
      </ul>
    </div>
  );
}

const historyItemStyle = {
  cursor: "pointer",
  margin: "5px 0",
  padding: "8px",
  border: "1px solid #888",
  borderRadius: "6px",
  backgroundColor: "#ffffff",
};

export default TableHistory;
