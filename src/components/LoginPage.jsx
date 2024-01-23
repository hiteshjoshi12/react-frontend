// LoginPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make a POST request to the login endpoint
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Parse the response to get the user ID
        const { userId } = await response.json();
        console.log("Login successful, userId:", userId);
        onLogin(userId); // Trigger the callback with the user ID
      } else {
        console.error("Login failed");
        // Handle login failure (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };
  return (
    <div className="min-h-screen bg-[#b254ff] text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl mx-auto text-center">
        <span className="text-4xl bold">Login to your account</span>
        <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
          <div className="h-2 bg-indigo-400 rounded-t-md"></div>
          <form onSubmit={handleSubmit} className="py-6 px-8">
            <label className="block font-semibold">Username or Email</label>
            <input
              type="text"
              placeholder="Username"
              className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="block mt-3 font-semibold">Password</label>
            <input
              type="password"
              placeholder="Password"
              className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
              value={password}
              autoComplete="on"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-between items-baseline">
              <button className="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600">
                Login
              </button>
              <Link to="/register">
                <button className="mt-4 mx-2 bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600">
                  Register
                </button>
              </Link>
              <a href="#" className="text-sm hover:underline">
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
