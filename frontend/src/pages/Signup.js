import React, { useState } from 'react'
import api, { setToken } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Signup({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  function submit(e) {
    e.preventDefault()
    api
      .post('/api/auth/signup/', { username, password, email })
      .then((res) => {
        const token = res.data.token
        const user = res.data.user
        setToken(token)
        onLogin(token, user)
        navigate('/')
      })
      .catch((err) => alert('Signup failed'))
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <div>
          <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}
