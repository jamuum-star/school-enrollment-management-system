

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from '../images/10.png';

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "Student", // Default role
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong.");
        return;
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-[#F5EFBD] via-[#59B8C3] to-[#2D8BA5]">
      <div className="flex bg-white p-12 rounded-xl shadow-xl max-w-5xl w-full space-x-12">
        <div className="w-1/2">
          <img
            src={image}
            alt="Registration"
            className="w-full h-full object-cover rounded-l-xl shadow-lg"
          />
        </div>
        <div className="w-1/2 p-8 flex flex-col justify-center items-center bg-gradient-to-r from-[#d8a63a] to-[#be8642] text-white rounded-r-xl">
          <h1 className="text-4xl text-center font-extrabold mb-6">Create an Account</h1>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-[420px]">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium">Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-4 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D8BA5] bg-white text-black"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D8BA5] bg-white text-black"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D8BA5] bg-white text-black"
                placeholder="Enter a strong password"
                required
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium">Role:</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-4 border-b-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D8BA5] bg-white text-black"
              >
                <option value="Student" className="text-black">Student</option>
                <option value="Parent" className="text-black">Parent</option>
                <option value="Admin" className="text-black">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#2D8BA5] text-white font-semibold rounded-lg hover:bg-[#184b5c] transition duration-200 ease-in-out"
            >
              Register
            </button>
          </form>
          <div className="text-center mt-6">
            <Link to="/login" className="text-white hover:underline">
              Already have an account? Login here.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;