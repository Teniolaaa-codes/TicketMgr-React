import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // 🆕 added Navigate
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import TicketMan from "./pages/TicketMan";

// ProtectedRoute component
function ProtectedRoute({ element }) {
  const session = localStorage.getItem("ticketapp_session");
  return session ? element : <Navigate to="/auth/login" replace />;
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        {/* Protected routes */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/tickets" element={<ProtectedRoute element={<TicketMan />} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
