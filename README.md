🍽️ Restaurant Reservation & Ordering Web Application

A full-stack React-based restaurant application that allows customers to reserve tables, browse menus, place food orders, and complete payments online. The system also provides a reservation history and order summary for smooth restaurant management.

🚀 Features

Table Reservation

Select table, seats, date, and time.

Prevents overbooking with seat availability validation.

Menu & Ordering System

Organized by categories (Starters, Main Course, Desserts, Beverages, Specials).

Add or remove items from the cart.

Displays order summary with total bill.

Payment Integration

Supports Credit Card, Cash, and UPI.

Real-time total amount calculation.

Reservation History

Track past reservations in a history log.

Responsive UI

Simple, user-friendly interface built with React and styled with CSS.

🛠️ Tech Stack

Frontend: React (useState, functional components)

Styling: CSS (custom styling for layout & responsiveness)

State Management: React Hooks

📂 Project Structure
📦 restaurant-app
 ┣ 📜 App.js              # Main app container
 ┣ 📜 ReservationSystem.js # Handles table reservations
 ┣ 📜 Menu.js              # Menu & ordering system
 ┣ 📜 Payment.js           # Payment functionality
 ┣ 📜 TableHistory.js      # Displays reservation history
 ┣ 📜 App.css              # Styling
 ┗ 📜 index.js             # React entry point

⚡ Installation & Setup

Clone the repository

git clone https://github.com/your-username/restaurant-app.git
cd restaurant-app


Install dependencies

npm install


Start the development server

npm start


Open in browser

http://localhost:3000

🎯 Usage

Reserve a table by selecting table number, seats, date & time.

Browse the menu and add items to your order.

View order summary and total amount.

Complete payment using your preferred method.

View past reservations in the history section.

📸 Screenshots (Optional)

You can add screenshots of the UI here for better presentation.

📝 Future Enhancements

User authentication (Login/Signup)

Backend integration with database (Node.js/Express + MongoDB)

Real-time availability with WebSockets

Order tracking system
