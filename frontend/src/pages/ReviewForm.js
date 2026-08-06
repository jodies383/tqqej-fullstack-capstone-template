import React, { useState } from 'react'
import api from '../api'
import { useNavigate, useParams } from 'react-router-dom'

export default function ReviewForm({ token }) {
  const { dealershipId } = useParams()
  const [name, setName] = useState('')
  const [review, setReview] = useState('')
  const [purchase, setPurchase] = useState(false)
  const [purchase_date, setPurchaseDate] = useState('')
  const navigate = useNavigate()

  function submit(e) {
    e.preventDefault()
    api
      .post('/api/reviews/', { name, dealership: dealershipId, review, purchase, purchase_date })
      .then(() => navigate(`/dealership/${dealershipId}`))
      .catch((err) => alert('Failed to submit review'))
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Write a Review</h2>
      <form onSubmit={submit}>
        <div>
          <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <textarea placeholder="Review" value={review} onChange={(e) => setReview(e.target.value)} />
        </div>
        <div>
          <label>
            <input type="checkbox" checked={purchase} onChange={(e) => setPurchase(e.target.checked)} /> Purchase
          </label>
        </div>
        {purchase && (
          <div>
            <input type="date" value={purchase_date} onChange={(e) => setPurchaseDate(e.target.value)} />
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
