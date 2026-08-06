import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api'

export default function Dealership({ token }) {
  const { id } = useParams()
  const [dealer, setDealer] = useState(null)

  useEffect(() => {
    api
      .get(`/api/dealerships/${id}/`)
      .then((res) => setDealer(res.data))
      .catch((err) => console.error(err))
  }, [id])

  if (!dealer) return <div style={{ padding: 20 }}>Loading...</div>

  return (
    <div style={{ padding: 20 }}>
      <h2>{dealer.name}</h2>
      <p>
        {dealer.address} — {dealer.city}, {dealer.state}
      </p>
      {token && (
        <p>
          <Link to={`/review/${dealer.id}`}>Write a review</Link>
        </p>
      )}

      <h3>Reviews</h3>
      {dealer.reviews.length === 0 && <p>No reviews yet.</p>}
      {[...dealer.reviews].sort((a, b) => new Date(b.time) - new Date(a.time)).map((r) => (
        <div key={r.id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 8 }}>
          <strong>{r.name}</strong> — <em>{new Date(r.time).toLocaleString()}</em>
          <p>{r.review}</p>
        </div>
      ))}
    </div>
  )
}
