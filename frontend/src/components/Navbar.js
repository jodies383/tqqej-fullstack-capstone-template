import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
export default function Navbar() {
  const nav = useNavigate();
  const user = localStorage.getItem("username");
  async function logout() {
    const token = localStorage.getItem("token");
    await fetch(`${API_BASE}/api-auth/logout/`, {
      method: "POST",
      headers: { Authorization: `Token ${token}` },
    });
    localStorage.clear();
    nav("/");
    window.location.reload();
  }
  return (
    <nav className="navbar navbar-dark" style={{ background: "#173f5f" }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          Dealership Review Portal
        </Link>
        <div>
          <Link className="text-white mx-2" to="/">
            Home
          </Link>
          <Link className="text-white mx-2" to="/about">
            About Us
          </Link>
          <Link className="text-white mx-2" to="/contact">
            Contact Us
          </Link>
          {user ? (
            <>
              <span className="text-white mx-2">Logged in: {user}</span>
              <button className="btn btn-outline-light btn-sm" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="text-white mx-2" to="/login">
                Login
              </Link>
              <Link className="text-white mx-2" to="/register">
                Sign-up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
