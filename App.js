import React, { useState, useEffect } from "react";
import ReservationSystem from "./ReservationSystem";
import OrderSystem from "./OrderSystem";
import Payment from "./Payment";
import "./App.css";

function App() {
  const [reservedTable, setReservedTable] = useState(null);
  const [orders, setOrders] = useState({});
  const [reservations, setReservations] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [reservedNowTables, setReservedNowTables] = useState([]);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const active = reservations.filter((r) => {
        const start = new Date(`${r.date}T${r.startTime}`);
        const end = new Date(`${r.date}T${r.endTime}`);
        return now >= start && now <= end;
      });
      const tableNums = active.map((r) => r.tableNumber);
      setReservedNowTables(tableNums);
    }, 500);
    return () => clearInterval(interval);
  }, [reservations]);

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
    setReservations((prev) => [...prev, reservation]);
  };

  const handleTableClick = (reservation) => {
    setReservedTable(reservation);
    setShowMenu(true);
  };

  const handleOrderChange = (updatedOrder) => {
    setOrders((prev) => ({
      ...prev,
      [reservedTable.tableNumber]: updatedOrder
    }));
  };

  const handlePayment = () => {
    const tableNum = reservedTable?.tableNumber;
    if (tableNum) {
      const updatedOrders = { ...orders };
      delete updatedOrders[tableNum];
      setOrders(updatedOrders);
    }
    setReservedTable(null);
    setShowMenu(false);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <>
      <div className={`App ${showMenu || isReservationModalOpen ? "blurred" : ""}`}>
        <h1>Restaurant Reservation & Ordering Application</h1>
        <ReservationSystem
          reservations={reservations}
          onReserve={handleReservation}
          onTableClick={handleTableClick}
          reservedNowTables={reservedNowTables}
          setIsReservationModalOpen={setIsReservationModalOpen}
        />
      </div>
      {showMenu && reservedTable && (
        <div className="modal-overlay">
          <div className="modal-content light-background">
            <OrderSystem
              table={reservedTable}
              order={orders[reservedTable.tableNumber] || []}
              onOrderChange={handleOrderChange}
            />
            <Payment
              order={orders[reservedTable.tableNumber] || []}
              onPayment={handlePayment}
            />
            <button onClick={closeMenu} className="close-btn">Back</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
