import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../config";
export default function Register() {
  const nav = useNavigate();
  const [f, setF] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const change = (e) => setF({ ...f, [e.target.name]: e.target.value });
  async function submit(e) {
    e.preventDefault();
    const r = await fetch(`${API_BASE}/api/auth/signup/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });
    const d = await r.json();
    if (r.ok) {
      localStorage.setItem("token", d.token);
      localStorage.setItem("username", d.username);
      nav("/");
      window.location.reload();
    } else setMsg(JSON.stringify(d));
  }
  return (
    <main className="page">
      <div className="form-box">
        <h1>Sign-up</h1>
        <form onSubmit={submit}>
          <label>
            Username
            <input
              className="form-control"
              name="username"
              value={f.username}
              onChange={change}
              required
            />
          </label>
          <label>
            First Name
            <input
              className="form-control"
              name="first_name"
              value={f.first_name}
              onChange={change}
              required
            />
          </label>
          <label>
            Last Name
            <input
              className="form-control"
              name="last_name"
              value={f.last_name}
              onChange={change}
              required
            />
          </label>
          <label>
            Email
            <input
              className="form-control"
              type="email"
              name="email"
              value={f.email}
              onChange={change}
              required
            />
          </label>
          <label>
            Password
            <input
              className="form-control"
              type="password"
              name="password"
              value={f.password}
              onChange={change}
              required
            />
          </label>
          <button className="btn btn-primary mt-3" type="submit">
            Register
          </button>
        </form>
        {msg && <div className="alert alert-danger mt-3">{msg}</div>}
      </div>
    </main>
  );
}
