import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VendorDashboard from "../components/vendor/VendorDashboard";
import Dashboard from "./Dashboard";
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");


  // handle submit
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:3000/user/login", formData ,
      {withCredentials : true}
    );

    if (res.status === 200 || res.data.token) {
      setMessage("Login successful! Redirecting...");
      if (res.data.role === "vendor") {
      navigate("/vendorDashboard");
    } else {
      navigate("/dashboard");
    }
    } else {
      setMessage(res.data.message || "Invalid credentials");
    }
  } catch (error) {
    if (error.response) {
      // Server ne error bheja (4xx, 5xx)
      setMessage(error.response.data.message || "Login failed");
    } else {
      // Network ya koi aur error
      setMessage("Server error");
    }
  }
};
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Login
        </h2>

        {message && (
          <p className="text-center mb-4 text-sm text-red-500">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => {setFormData({...formData, email : e.target.value})}}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password : e.target.value})}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
