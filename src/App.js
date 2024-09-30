import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Achievements from "./components/Achievements";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4 text-white">
          <div className="flex justify-between items-center">
            <ul className="flex space-x-4">
              <li>
                <a href="/about" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="/achievements" className="hover:underline">
                  Achievements
                </a>
              </li>
            </ul>
            <div>
              <a href="/login" className="hover:underline">
                Login
              </a>
            </div>
          </div>
        </nav>

        <div className="p-6">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/about" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
