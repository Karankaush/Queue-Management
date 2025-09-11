import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isVendor = searchParams.get("vendor") === "true";

  

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
     role: isVendor ? "vendor" : "customer",
  });

  const [message, setMessage] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:3000/user/register", formData);

    if (res.status === 201 || res.status === 200) {
      setMessage("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setMessage(res.data.message || "Something went wrong");
    }
  } catch (error) {
    if (error.response) {
      // Backend se error aaya (e.g., validation fail, duplicate email, etc.)
      setMessage(error.response.data.message || "Registration failed");
    } else {
      // Network ya server crash type error
      setMessage("Server error");
    }
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          {isVendor ? "Vendor" : "Customer"} Registration
        </h2>

        {message && (
          <p className="text-center mb-4 text-sm text-red-500">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />

          {/* Hidden Role Field */}

          <input type="hidden" name="role" value={formData.role} />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />

          {/* Hidden Role Field */}
          <input type="hidden" name="role" value={formData.role} />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
