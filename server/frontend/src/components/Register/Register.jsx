import React, { useState } from "react";

// Source copy kept at the path required by the capstone submission rubric.
export default function Register() {
  const [form, setForm] = useState({ username: "", first_name: "", last_name: "", email: "", password: "" });
  return (
    <form aria-label="Sign-up">
      <input name="username" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input name="first_name" placeholder="First Name" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
      <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  );
}
