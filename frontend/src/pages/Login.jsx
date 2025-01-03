import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import image from "../images/7.jpg"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  // Handle form submission (login)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Input Validation
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(""); 

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data);
        // Correct navigation after login
        navigate("/Dashboard"); // Navigate to /dashboard instead of /login/Dashboard.jsx
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r bg-orange-400 ">
      <div className="flex bg-white rounded-xl shadow-lg max-w-4xl w-full">
        {/* Image Section */}
        <div className="w-1/2">
          <img
            src={image}
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-l-xl"
          />
        </div>

        {/* Form Section */}
        <div className="w-1/2 p-8 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Login</h1>

          {/* Error Message */}
          {error && <div className="text-orange-500 text-center mb-4">{error}</div>}

          <form className="mt-4 w-full max-w-sm" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-800 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-800 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="flex justify-between mb-6">
              <a href="/PasswordResetForm" className="text-gray-800 hover:text-orange-500">
                Forgot Password?
              </a>
              <a href="/register" className="text-orange-500 hover:text-gray-800">
                Don't have an account? Register
              </a>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;