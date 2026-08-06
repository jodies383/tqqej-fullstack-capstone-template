import React, { useState } from 'react'
import api, { setToken } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function submit(e) {
    e.preventDefault()
    api
      .post('/api-token-auth/', { username, password })
      .then((res) => {
        const token = res.data.token
        const user = res.data.user
        setToken(token)
        onLogin(token, user)
        navigate('/')
      })
      .catch((err) => alert('Login failed'))
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
