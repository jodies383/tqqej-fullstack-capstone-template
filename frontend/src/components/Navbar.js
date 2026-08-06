import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ token, onLogout }) {
  return (
    <nav style={{ padding: 10, borderBottom: '1px solid #ddd' }}>
      <Link to="/">Home</Link>
      {' | '}
      {token ? (
        <>
          <button onClick={onLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          {' | '}
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  )
}
