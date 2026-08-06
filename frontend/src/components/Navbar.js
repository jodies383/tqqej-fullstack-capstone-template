import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ token, user, onLogout }) {
  return (
    <nav style={{ padding: 10, borderBottom: '1px solid #ddd' }}>
      <Link to="/">Home</Link>
      {' | '}
      <Link to="/about.html">About</Link>
      {' | '}
      <Link to="/contact.html">Contact</Link>
      {' | '}
      {token ? (
        <>
          <span>Welcome, {user?.username || 'member'}!</span>
          {' | '}
          <button onClick={onLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          {' | '}
          <Link to="/signup">Signup</Link>
          {' | '}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  )
}
