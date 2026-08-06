import React, { useEffect, useState } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'

export default function Home({ user }) {
  const [dealers, setDealers] = useState([])
  const [state, setState] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageInfo, setPageInfo] = useState({ count: 0, next: null, previous: null })

  useEffect(() => {
    fetchDealers(1)
  }, [])

  function fetchDealers(nextPage = page, queryState = state, querySearch = search) {
    const params = { page: nextPage }
    if (queryState && queryState !== 'all') params.state = queryState
    if (querySearch) params.search = querySearch

    api
      .get('/api/dealerships/', { params })
      .then((res) => {
        const results = res.data.results || res.data
        setDealers(Array.isArray(results) ? results : [])
        setPageInfo({
          count: res.data.count || results.length,
          next: res.data.next || null,
          previous: res.data.previous || null,
        })
        setPage(nextPage)
      })
      .catch((err) => console.error(err))
  }

  function onSubmit(e) {
    e.preventDefault()
    fetchDealers(1, state, search)
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Dealerships</h2>
      <p>{user ? `Signed in as ${user.username}` : 'Browse dealerships and review a branch.'}</p>
      <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input
          placeholder="Search name, city, or state"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={state} onChange={(e) => setState(e.target.value)}>
          <option value="all">Show all</option>
          <option value="CA">CA</option>
          <option value="TX">TX</option>
          <option value="FL">FL</option>
          <option value="NY">NY</option>
        </select>
        <button type="submit">Filter</button>
      </form>

      <p>{pageInfo.count} results</p>
      <table style={{ width: '100%', marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dealers.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.city}</td>
              <td>{d.state}</td>
              <td>
                <Link to={`/dealership/${d.id}`}>Details</Link>
                {user ? <> | <Link to={`/review/${d.id}`}>Review Dealer</Link></> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 12 }}>
        <button disabled={!pageInfo.previous} onClick={() => fetchDealers(page - 1, state, search)}>
          Previous
        </button>
        <span style={{ margin: '0 8px' }}>Page {page}</span>
        <button disabled={!pageInfo.next} onClick={() => fetchDealers(page + 1, state, search)}>
          Next
        </button>
      </div>
    </div>
  )
}
