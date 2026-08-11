import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE } from "../config";
export default function DetailsPage() {
  const { id } = useParams();
  const [d, setD] = useState(null);
  useEffect(() => {
    fetch(`${API_BASE}/api/dealerships/${id}/`)
      .then((r) => r.json())
      .then(setD);
  }, [id]);
  if (!d) return <main className="page">Loading...</main>;
  return (
    <main className="page">
      <div className="detail-box">
        <h1>{d.name}</h1>
        <p className="endpoint">Endpoint: {window.location.href}</p>
        <img
          src={d.image_url}
          alt={d.name}
          style={{
            width: "100%",
            maxHeight: 380,
            objectFit: "cover",
            borderRadius: 10,
          }}
        />
        <h3>Dealer details</h3>
        <p>{d.address}</p>
        <p>
          {d.city}, {d.state}
        </p>
        <p>{d.phone}</p>
        {localStorage.getItem("token") && (
          <Link className="btn btn-success mb-3" to={`/dealer/${id}/review`}>
            Post Review
          </Link>
        )}
        <h2>Reviews</h2>
        {d.reviews?.length ? (
          d.reviews.map((r) => (
            <div className="border rounded p-3 mb-2" key={r.id}>
              <strong>{r.username}</strong>
              <div>Rating: {r.rating}/5</div>
              <p>{r.text}</p>
              <small>Sentiment: {r.sentiment}</small>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </main>
  );
}
