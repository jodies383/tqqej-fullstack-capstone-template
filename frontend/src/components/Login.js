import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../config";
export default function Login() {
  const nav = useNavigate();
  const [u, setU] = useState("demo"),
    [p, setP] = useState("demo1234"),
    [err, setErr] = useState("");
  async function submit(e) {
    e.preventDefault();
    const r = await fetch(`${API_BASE}/api-token-auth/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: u, password: p }),
    });
    const d = await r.json();
    if (r.ok) {
      localStorage.setItem("token", d.token);
      localStorage.setItem("username", u);
      nav("/");
      window.location.reload();
    } else setErr("Invalid username or password.");
  }
  return (
    <main className="page">
      <div className="form-box">
        <h1>Login</h1>
        <form onSubmit={submit}>
          <label>
            Username
            <input
              className="form-control"
              value={u}
              onChange={(e) => setU(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              className="form-control"
              type="password"
              value={p}
              onChange={(e) => setP(e.target.value)}
            />
          </label>
          <button className="btn btn-primary mt-3">Login</button>
        </form>
        {err && <p className="text-danger">{err}</p>}
      </div>
    </main>
  );
}
