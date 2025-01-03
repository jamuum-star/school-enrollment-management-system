// PasswordReset.js
import React, { useState } from 'react';

const PasswordReset = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic
    console.log(email);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-3 mb-4 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">
            Submit
          </button>
        </form>
        <p className="mt-4 text-center">
          Remembered your password? <a href="/login" className="text-blue-600">Back to Login</a>
        </p>
      </div>
    </div>
  );
};

export default PasswordReset;
