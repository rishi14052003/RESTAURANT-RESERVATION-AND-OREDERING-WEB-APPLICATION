import React, { useState } from "react";
import ReservationSystem from "./ReservationSystem";
import OrderSystem from "./OrderSystem";
import Payment from "./Payment";
import TableHistory from "./TableHistory";
import "./App.css";

function App() {
  const [reservedTable, setReservedTable] = useState(null);
  const [order, setOrder] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const handleReservation = (reservation) => {
    const overlap = reservations.some((r) => {
      return (
        r.tableNumber === reservation.tableNumber &&
        r.date === reservation.date &&
        !(reservation.endTime <= r.startTime || reservation.startTime >= r.endTime)
      );
    });
    if (overlap) {
      alert("This table is already booked for this time slot.");
      return;
    }
    setReservedTable(reservation);
    setReservations((prev) => [...prev, reservation]);
    setShowMenu(true);
  };

  const handleTableClick = (reservation) => {
    setReservedTable(reservation);
    setShowMenu(true);
  };

  const handleOrderChange = (updatedOrder) => {
    setOrder(updatedOrder);
  };

  const handlePayment = () => {
    setOrder([]);
    setReservedTable(null);
    setShowMenu(false);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <>
      <div className={`App ${showMenu ? "blurred" : ""}`}>
        <h1>Restaurant Reservation & Ordering Application</h1>
        <ReservationSystem reservations={reservations} onReserve={handleReservation} />
        <TableHistory reservations={reservations} onTableClick={handleTableClick} />
      </div>
      {showMenu && (
        <div className="modal-overlay">
          <div className="modal-content light-background">
            <OrderSystem
              table={reservedTable}
              order={order}
              onOrderChange={handleOrderChange}
            />
            <Payment order={order} onPayment={handlePayment} />
            <button onClick={closeMenu} className="close-btn">Back</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
