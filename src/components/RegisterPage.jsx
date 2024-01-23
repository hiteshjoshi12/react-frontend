import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
    } catch (error) {
      console.error("Error during registration", error);
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#b254ff] text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl mx-auto text-center">
        <span className="text-4xl bold">Register</span>
        <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
          <div className="h-2 bg-indigo-400 rounded-t-md"></div>
          <form onSubmit={handleSubmit} className="py-6 px-8">
            <label className="block font-semibold">Username or Email</label>
            <input
              type="text"
              placeholder="Email"
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
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
