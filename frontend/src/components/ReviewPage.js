import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE } from "../../config";
export default function ReviewPage() {
  const { id } = useParams(),
    nav = useNavigate();
  const [rating, setRating] = useState(5),
    [text, setText] = useState(""),
    [saved, setSaved] = useState(false);
  async function submit(e) {
    e.preventDefault();
    const r = await fetch(`${API_BASE}/api/reviews/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ dealer_id: id, rating, text }),
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
          <button className="btn btn-primary" type="submit">
            Submit Review
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
