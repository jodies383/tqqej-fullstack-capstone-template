import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import DetailsPage from "./components/DetailsPage";
import ReviewPage from "./components/ReviewPage";
import Register from "./components/Register";
import Login from "./components/Login";
import About from "./components/About";
import Contact from "./components/Contact";
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/app" element={<MainPage />} />
        <Route path="/state/:state" element={<MainPage />} />
        <Route path="/dealer/:id" element={<DetailsPage />} />
        <Route path="/dealer/:id/review" element={<ReviewPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
