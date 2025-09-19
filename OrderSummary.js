import React from "react";

function OrderSystem({ table, order, onOrderChange }) {
  const menu = {
    Starters: [
      { name: "panner tikka", price: 5, desc: "panner with green chutney" },
      { name: "locha", price: 10, desc: "besan ka" },
      { name: "samosa", price: 15, desc: "aloo ka" },
      { name: "petis", price: 20, desc: "meetha" },
      { name: "bread pakoda", price: 25, desc: "oily" }
    ],
    MainCourse: [
      { name: "pneer butter masala", price: 5, desc: "gravy paneer" },
      { name: "veg handi", price: 10, desc: "mix veges" },
      { name: "veg kolhapuri", price: 15, desc: "spicy veges" },
      { name: "veg toofani", price: 20, desc: "good taste" },
      { name: "veg jaipuri", price: 25, desc: "best" }
    ],
    Desserts: [
      { name: "cake", price: 5, desc: "bday" },
      { name: "crepe", price: 10, desc: "sweet dosa" },
      { name: "doughnut", price: 15, desc: "round" },
      { name: "pastry", price: 20, desc: "cheaper" },
      { name: "cupcake", price: 25, desc: "small" }
    ],
    Beverages: [
      { name: "soda", price: 5, desc: "digest" },
      { name: "coke", price: 10, desc: "mixture" },
      { name: "water", price: 15, desc: "pani" },
      { name: "limica", price: 20, desc: "lemonn" },
      { name: "coldrink", price: 25, desc: "not good" }
    ],
    Specials: [
      { name: "italian", price: 5, desc: "itlay se" },
      { name: "pizza", price: 10, desc: "golgol" },
      { name: "pasta", price: 15, desc: "ezy to make" },
      { name: "garlic", price: 20, desc: "lahsun" },
      { name: "frankie", price: 25, desc: "maida roti" }
    ]
  };

  const addToOrder = (item) => {
    const existing = order.find((o) => o.name === item.name);
    let updated;
    if (existing) {
      updated = order.map((o) =>
        o.name === item.name ? { ...o, qty: o.qty + 1 } : o
      );
    } else {
      updated = [...order, { ...item, qty: 1 }];
    }
    onOrderChange(updated);
  };

  const increaseQty = (item) => {
    const updated = order.map((o) =>
      o.name === item.name ? { ...o, qty: o.qty + 1 } : o
    );
    onOrderChange(updated);
  };

  const decreaseQty = (item) => {
    const updated = order
      .map((o) => (o.name === item.name ? { ...o, qty: o.qty - 1 } : o))
      .filter((o) => o.qty > 0);
    onOrderChange(updated);
  };

  const total = order.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div>
      <h2>Menu</h2>
      {Object.entries(menu).map(([category, items]) => (
        <details key={category}>
          <summary>{category}</summary>
          {items.map((item, idx) => (
            <div key={idx} style={{ margin: "5px 0", textAlign: "left" }}>
              <strong>{item.name}-${item.price}</strong><button className="menu-btn" onClick={() => addToOrder(item)}>
                +
              </button>
              <p>{item.desc}</p>
              
            </div>
          ))}
        </details>
      ))}

      <h3>Order Summary</h3>
      {order.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <ul>
          {order.map((item, idx) => (
            <li key={idx}>
              {item.name} (${item.price}) × {item.qty}
              <div>
                <button className="qty-btn" onClick={() => decreaseQty(item)}>
                  <strong>-</strong>
                </button>
                <button className="qty-btn" onClick={() => increaseQty(item)}>
                  <strong>+</strong>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {order.length > 0 && <h4>Total: ${total}</h4>}
    </div>
  );
}

export default OrderSystem;
