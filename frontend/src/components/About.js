import React from "react";
export default function About() {
  return (
    <main className="page">
      <h1>About Us</h1>
      <p>
        Our dealership review portal helps customers compare dealers, read
        reviews and share their own experiences.
      </p>
      <div className="grid">
        <div className="dealer-card">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
            alt="Michael Johnson"
          />
          <div className="dealer-body">
            <h2>Michael Johnson</h2>
            <p>Project Manager</p>
            <p>michael.johnson@example.com</p>
          </div>
        </div>
        <div className="dealer-card">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
            alt="Sarah Williams"
          />
          <div className="dealer-body">
            <h2>Sarah Williams</h2>
            <p>Frontend Developer</p>
            <p>sarah.williams@example.com</p>
          </div>
        </div>
      </div>
    </main>
  );
}
