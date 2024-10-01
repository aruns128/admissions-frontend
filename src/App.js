import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Dashboard from "./components/common/Dashboard";
import Users from "./components/users/Users"; // Create this component
import Students from "./components/students/Students"; // Create this component
import ProtectedRoute from "./components/helpers/ProtectedRoute"; // Import the ProtectedRoute
import Unauthorized from "./components/helpers/Unauthorized";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Wrap the Route with ProtectedRoute */}
        <Route
          path="/users"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]} // Specify allowed roles
              element={<Users />} // Users component should only be accessed by admin
            />
          }
        />
        <Route path="/students" element={<Students />} />{" "}
        <Route path="/unauthorized" element={<Unauthorized />} />{" "}
        {/* Route for Students */}
      </Routes>
    </Router>
  );
}

export default App;
