import React, { useState } from 'react';
import axios from 'axios';

const StudentRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    grade: '',
    contactInfo: {
      parentName: '',
      phone: '',
      email: '',
    },
    address: '',
    enrollmentStatus: 'Pending',
    documents: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to the server
      const response = await axios.post('http://localhost:3000/api/students/register', formData);
      console.log('Response:', response); // Log the response (optional)
      alert('Student registered successfully');
      
      // Reset the form after successful registration
      setFormData({
        fullName: '',
        dateOfBirth: '',
        grade: '',
        contactInfo: {
          parentName: '',
          phone: '',
          email: '',
        },
        address: '',
        enrollmentStatus: 'Pending',
        documents: [],
      });
    } catch (error) {
      console.error('Error registering student:', error);
      alert('Error registering student');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Full Name"
      />
      <input
        type="date"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
      />
      <input
        type="text"
        name="grade"
        value={formData.grade}
        onChange={handleChange}
        placeholder="Grade"
      />
      <input
        type="text"
        name="contactInfo.parentName"
        value={formData.contactInfo.parentName}
        onChange={handleChange}
        placeholder="Parent's Name"
      />
      <input
        type="text"
        name="contactInfo.phone"
        value={formData.contactInfo.phone}
        onChange={handleChange}
        placeholder="Phone"
      />
      <input
        type="email"
        name="contactInfo.email"
        value={formData.contactInfo.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
      />
      <button type="submit">Register Student</button>
    </form>
  );
};

export default StudentRegistrationForm;
