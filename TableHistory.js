import React from "react";

const TableHistory = ({ reservations }) => {
  return (
    <div>
      <h2>Reservation History</h2>
      {reservations.length === 0 ? (
        <p>No reservations yet.</p>
      ) : (
        <ul>
          {reservations.map((res, index) => (
            <li key={index}>
              Table <b>{res.tableId}</b> reserved on <b>{res.date}</b> at <b>{res.time}</b>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TableHistory;
