import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api, { setToken } from '../api'

export default function Register({ onLogin }) {
  const [form, setForm] = useState({ username: '', first_name: '', last_name: '', email: '', password: '' })
  const navigate = useNavigate()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    api.post('/api/auth/signup/', form).then((res) => {
      const token = res.data.token
      setToken(token)
      onLogin(token)
      navigate('/')
    }).catch(() => alert('Registration failed'))
  }

  return (
    <div style={{ padding: 24, maxWidth: 420 }}>
      <h2>Create account</h2>
      <form onSubmit={handleSubmit}>
        <div><input name="username" placeholder="Username" onChange={handleChange} required /></div>
        <div><input name="first_name" placeholder="First Name" onChange={handleChange} /></div>
        <div><input name="last_name" placeholder="Last Name" onChange={handleChange} /></div>
        <div><input name="email" type="email" placeholder="Email" onChange={handleChange} /></div>
        <div><input name="password" type="password" placeholder="Password" onChange={handleChange} required /></div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
