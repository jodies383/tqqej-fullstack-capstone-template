import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Dealership from './pages/Dealership'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ReviewForm from './pages/ReviewForm'
import Navbar from './components/Navbar'
import { setToken } from './api'

function App() {
  const [token, setTokenState] = useState(localStorage.getItem('token'))

  useEffect(() => {
    setToken(token)
  }, [token])

  function onLogin(tokenVal) {
    localStorage.setItem('token', tokenVal)
    setTokenState(tokenVal)
  }

  function onLogout() {
    localStorage.removeItem('token')
    setTokenState(null)
  }

  return (
    <div>
      <Navbar token={token} onLogout={onLogout} />
      <Routes>
        <Route path="/" element={<Home token={token} />} />
        <Route path="/dealership/:id" element={<Dealership token={token} />} />
        <Route path="/login" element={<Login onLogin={onLogin} />} />
        <Route path="/signup" element={<Signup onLogin={onLogin} />} />
        <Route path="/review/:dealershipId" element={<ReviewForm token={token} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
