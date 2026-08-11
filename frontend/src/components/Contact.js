import React from "react";
export default function Contact() {
  return (
    <main className="page">
      <div className="detail-box">
        <h1>Contact Us</h1>
        <p>
          <strong>Email:</strong> support@dealershipportal.example
        </p>
        <p>
          <strong>Phone:</strong> +1 800 555 0145
        </p>
        <p>
          <strong>Address:</strong> 120 Market Street, Kansas City, Kansas 66101
        </p>
        <p>
          <strong>Hours:</strong> Monday-Friday, 08:00-17:00
        </p>
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=80"
          alt="Support team"
          style={{ width: "100%", borderRadius: 12 }}
        />
      </div>
    </main>
  );
}
