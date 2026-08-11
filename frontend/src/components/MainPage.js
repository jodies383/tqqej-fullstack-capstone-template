import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE } from "../config";
export default function MainPage() {
  const { state } = useParams();
  const [dealers, setDealers] = useState([]);
  const [filter, setFilter] = useState(state || "");
  useEffect(() => {
    const q = state || filter;
    fetch(
      `${API_BASE}/api/dealerships/${q ? `?state=${encodeURIComponent(q)}` : ""}`,
    )
      .then((r) => r.json())
      .then((d) => setDealers(Array.isArray(d) ? d : d.results || []));
  }, [state, filter]);
  const endpoint = `${API_BASE}/api/dealerships/${state ? `?state=${encodeURIComponent(state)}` : ""}`;
  return (
    <main className="page">
      <h1>Dealerships</h1>
      <p className="endpoint">Endpoint: {endpoint}</p>
      <div className="d-flex gap-2 mb-4">
        <input
          className="form-control"
          placeholder="State e.g. Kansas"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Link
          className="btn btn-primary"
          to={filter ? `/state/${filter}` : "/"}
        >
          Filter
        </Link>
        <Link className="btn btn-secondary" to="/">
          All
        </Link>
      </div>
      <div className="grid">
        {dealers.map((d) => (
          <article className="dealer-card" key={d.id}>
            <img src={d.image_url} alt={d.name} />
            <div className="dealer-body">
              <h2>{d.name}</h2>
              <p>
                {d.city}, {d.state}
              </p>
              <p>{d.address}</p>
              <p>{d.phone}</p>
              <Link className="btn btn-primary" to={`/dealer/${d.id}`}>
                View Details
              </Link>
              {localStorage.getItem("token") && (
                <Link
                  className="btn btn-success ms-2"
                  to={`/dealer/${d.id}/review`}
                >
                  Review Dealer
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
