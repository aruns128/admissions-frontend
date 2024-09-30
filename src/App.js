import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users"; // Create this component
import Students from "./components/Students"; // Create this component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} /> {/* Route for Users */}
        <Route path="/students" element={<Students />} />{" "}
        {/* Route for Students */}
      </Routes>
    </Router>
  );
}

export default App;
