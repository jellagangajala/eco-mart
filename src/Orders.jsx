// Orders.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { QRCodeSVG } from "qrcode.react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import emailjs from "@emailjs/browser";
import "./orders.css"; // Make sure this path is correct

function Orders() {
  const orders = useSelector((state) => state.orders || []);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  const generatePDF = (order) => {
    try {
      const doc = new jsPDF();
      doc.text(`Invoice for Order ID: ${order.id}`, 10, 10);
      doc.text(`Date: ${order.date}`, 10, 20);
      doc.text(`Status: ${order.status || "Pending"}`, 10, 30);
      doc.text(`Total: ₹${order.total}`, 10, 40);

      const itemRows = order.items.map((item) => [
        item.name,
        item.quantity,
        `₹${item.price}`,
        `₹${(item.quantity * item.price).toFixed(2)}`,
      ]);

      autoTable(doc, {
        head: [["Item", "Qty", "Price", "Subtotal"]],
        body: itemRows,
        startY: 50,
      });

      doc.save(`Order_${order.id}.pdf`);
    } catch (error) {
      console.error("PDF Error:", error);
      alert("❌ Failed to generate PDF");
    }
  };

  const sendEmail = (order) => {
    const templateParams = {
      email: "minnijella@gmail.com",
      order_id: order.id,
      orders: JSON.stringify(
        order.items.map((item) => ({
          name: item.name,
          units: item.quantity,
          price: item.price,
        }))
      ),
    };

    emailjs
      .send(
        "service_1804",
        "template_2j0cnoa",
        templateParams,
        "G_VLy_Rz2JJmwXwgO"
      )
      .then(() => alert("✅ Email sent successfully"))
      .catch((error) => {
        console.error("❌ Email Error:", error);
        alert("❌ Failed to send email");
      });
  };

  const handleTrackOrder = () => {
    alert("🚚 Order is in transit. Expected delivery in 2–3 days.");
  };

  if (orders.length === 0) {
    return <h2 className="no-orders">No orders placed yet 🛍</h2>;
  }

  return (
    <div className="order-list">
      <div className="toggle-mode">
        <button onClick={toggleDarkMode}>
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <h2>🛍 Order History</h2>

      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <h3>Order ID: {order.id}</h3>
            <span className={`status ${order.status?.toLowerCase() || "pending"}`}>
              {order.status || "Pending"}
            </span>
          </div>

          <p>🗓 {order.date}</p>
          <p>Total: ₹{order.total}</p>

          <h4>Items:</h4>
          <ul>
            {order.items.map((item, i) => (
              <li key={i}>
                {item.name} × {item.quantity} — ₹{item.price}
              </li>
            ))}
          </ul>

          <div className="qr-download">
            <h4>📱 Scan to Pay</h4>
            <QRCodeSVG
              value={`upi://pay?pa=6304028175@axl&pn=Jella Gangajala&am=${order.total}&cu=INR`}
              size={120}
            />
            <p>
              UPI ID: <strong>6304028175@axl</strong>
            </p>

            <button onClick={() => generatePDF(order)}>📄 Download PDF</button>
            <button onClick={() => sendEmail(order)}>📧 Email</button>
            <button onClick={handleTrackOrder}>🚚 Track</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
