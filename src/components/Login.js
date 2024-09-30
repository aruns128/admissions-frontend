import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

// Function to fetch a random quote
const fetchQuote = async () => {
  try {
    const response = await fetch(
      "https://api.quotable.io/random?tags=education"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return `${data.content} - ${data.author}`; // Return the quote content
  } catch (error) {
    console.error("Failed to fetch quote", error);
    return "Education is the most powerful weapon which you can use to change the world. – Nelson Mandela";
  }
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [quote, setQuote] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();
  const { login } = useAuth();

  // Function to get a new quote
  const getQuote = async () => {
    const randomQuote = await fetchQuote();
    setQuote(randomQuote);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      getQuote(); // Fetch a quote on component mount

      const intervalId = setInterval(() => {
        getQuote(); // Fetch a new quote every 2 minutes
      }, 120000); // 120000 milliseconds = 2 minutes

      return () => clearInterval(intervalId); // Clear the interval on component unmount
    }
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, role } = response.data; // Assuming your API returns the token and role

      login(token, role); // Pass the role to the login function
      setIsLoggedIn(true); // Set login status to true
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section: Quotes */}
      {!isLoggedIn && (
        <div className="w-1/2 hidden lg:flex flex-col justify-center items-center bg-blue-100 p-6">
          <h2 className="text-3xl font-bold mb-4">Inspiration</h2>
          <p className="text-lg text-center italic">{quote}</p>
        </div>
      )}

      {/* Right Section: Login Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-white shadow-lg">
        <form onSubmit={handleSubmit} className="max-w-md w-full p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
