import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Dealership from './pages/Dealership'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Register from './pages/Register'
import ReviewForm from './pages/ReviewForm'
import Navbar from './components/Navbar'
import { setToken } from './api'

function App() {
  const [token, setTokenState] = useState(localStorage.getItem('token'))
  const [user, setUserState] = useState(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })

  useEffect(() => {
    setToken(token)
  }, [token])

  function onLogin(tokenVal, userData) {
    localStorage.setItem('token', tokenVal)
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData))
    }
    setTokenState(tokenVal)
    setUserState(userData || null)
  }

  function onLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setTokenState(null)
    setUserState(null)
  }

  return (
    <div>
      <Navbar token={token} user={user} onLogout={onLogout} />
      <Routes>
        <Route path="/" element={<Home token={token} user={user} />} />
        <Route path="/dealership/:id" element={<Dealership token={token} />} />
        <Route path="/login" element={<Login onLogin={onLogin} />} />
        <Route path="/signup" element={<Signup onLogin={onLogin} />} />
        <Route path="/register" element={<Register onLogin={onLogin} />} />
        <Route path="/review/:dealershipId" element={<ReviewForm token={token} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
