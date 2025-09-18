import React, { useState } from 'react';

function ReservationSystem({ onReserve }) {
  const [tables, setTables] = useState([
    { id: 1, seats: 5 },
    { id: 2, seats: 5 },
    { id: 3, seats: 5 },
    { id: 4, seats: 5 },
    { id: 5, seats: 5 },
    { id: 6, seats: 5 },
    { id: 7, seats: 5 },
    { id: 8, seats: 5 },
    { id: 9, seats: 5 },
    { id: 10, seats: 5 },
  ]);

  const [selectedTable, setSelectedTable] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [seatsToReserve, setSeatsToReserve] = useState(1);

  const handleReserve = () => {
    if (!selectedTable) {
      alert('Please select a table');
      return;
    }
    if (!date || !time) {
      alert('Please enter both date and time before reserving a table');
      return;
    }

    const table = tables.find((t) => t.id === parseInt(selectedTable));

    if (seatsToReserve > table.seats) {
      alert(`Only ${table.seats} seats are available for this table`);
      return;
    }

    const updatedTables = tables.map((t) =>
      t.id === parseInt(selectedTable)
        ? { ...t, seats: t.seats - seatsToReserve }
        : t
    );

    setTables(updatedTables);

    const reservation = {
      tableId: selectedTable,
      date,
      time,
      seats: seatsToReserve,
    };

    onReserve(reservation);

    setSelectedTable('');
    setDate('');
    setTime('');
    setSeatsToReserve(1);
  };

  return (
    <div>
      <h2>Table Reservation</h2>
      <label>
        Select Table:{' '}
        <select
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
        >
          <option value="">--Select--</option>
          {tables.map((table) => (
            <option
              key={table.id}
              value={table.id}
              disabled={table.seats === 0}
            >
              Table {table.id} 
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Number of Seats:{' '}
        <input
          type="number"
          min="1"
          max="5"
          value={seatsToReserve}
          onChange={(e) => setSeatsToReserve(parseInt(e.target.value))}
        />
      </label>
      <br />
      <label>
        Select Date:{' '}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <br />
      <label>
        Select Time:{' '}
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </label>
      <br />
      <button
        style={{
          color: 'white',
          backgroundColor: 'black',
          marginTop: '10px',
          padding: '8px 12px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={handleReserve}
      >
        Reserve Table
      </button>
    </div>
  );
}

export default ReservationSystem;
