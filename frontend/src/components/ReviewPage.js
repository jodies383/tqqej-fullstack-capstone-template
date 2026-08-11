import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE } from "../config";
export default function ReviewPage() {
  const { id } = useParams(),
    nav = useNavigate();
  const [rating, setRating] = useState(5),
    [text, setText] = useState(""),
    [purchase, setPurchase] = useState(false),
    [purchaseDate, setPurchaseDate] = useState(""),
    [carMake, setCarMake] = useState("Toyota"),
    [carModel, setCarModel] = useState("Camry"),
    [carYear, setCarYear] = useState("2024"),
    [saved, setSaved] = useState(false);
  async function submit(e) {
    e.preventDefault();
    const r = await fetch(`${API_BASE}/api/reviews/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ dealer_id: id, rating, text, purchase, purchase_date: purchaseDate, car_make: carMake, car_model: carModel, car_year: carYear }),
    });
    if (r.ok) {
      setSaved(true);
      setTimeout(() => nav(`/dealer/${id}`), 900);
    }
  }
  if (!localStorage.getItem("token"))
    return (
      <main className="page">
        <div className="form-box">
          <h1>Post Review</h1>
          <p>Please log in first.</p>
        </div>
      </main>
    );
  return (
    <main className="page">
      <div className="form-box">
        <h1>Post Review</h1>
        <p className="endpoint">Endpoint: {window.location.href}</p>
        <form onSubmit={submit}>
          <label className="form-label">
            Rating
            <select
              className="form-select"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              {[5, 4, 3, 2, 1].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label className="form-label">
            Review details
            <textarea
              className="form-control"
              rows="6"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              placeholder="Fantastic services"
            />
          </label>
          <label className="form-check mb-3 d-block">
            <input className="form-check-input me-2" type="checkbox" checked={purchase} onChange={(e) => setPurchase(e.target.checked)} />
            I purchased a vehicle from this dealership
          </label>
          {purchase && <label className="form-label d-block">Purchase date
            <input className="form-control" type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} required />
          </label>}
          <div className="row g-2 mb-3">
            <label className="col-md-4 form-label">Car make
              <input className="form-control" value={carMake} onChange={(e) => setCarMake(e.target.value)} required />
            </label>
            <label className="col-md-4 form-label">Car model
              <input className="form-control" value={carModel} onChange={(e) => setCarModel(e.target.value)} required />
            </label>
            <label className="col-md-4 form-label">Car year
              <input className="form-control" type="number" min="1900" max="2100" value={carYear} onChange={(e) => setCarYear(e.target.value)} required />
            </label>
          </div>
          <button className="btn btn-primary" type="submit">
            Post Review
          </button>
          {saved && (
            <div className="alert alert-success mt-3">
              Review posted successfully.
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
