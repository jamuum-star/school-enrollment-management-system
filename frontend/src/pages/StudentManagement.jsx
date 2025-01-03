import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBars, FaUserGraduate, FaUser, FaBook, FaCog, FaSignOutAlt } from 'react-icons/fa';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    fullName: '',
    dateOfBirth: '',
    grade: '',
    contactInformation: {
      parentName: '',
      parentPhoneNumber: '',
      parentEmail: ''
    },
    address: '',
    documents: [],
    enrollmentStatus: 'Pending'
  });
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Failed to fetch students. Please try again later.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/students', newStudent);
      setStudents([...students, response.data]);
      setNewStudent({
        fullName: '',
        dateOfBirth: '',
        grade: '',
        contactInformation: {
          parentName: '',
          parentPhoneNumber: '',
          parentEmail: ''
        },
        address: '',
        documents: [],
        enrollmentStatus: 'Pending'
      });
      setError('');
    } catch (error) {
      console.error('Error creating student:', error);
      setError('Failed to add student. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800  text-white p-5 lg:w-64 w-full lg:h-auto lg:fixed lg:overflow-y-auto ${
          sidebarOpen ? "block" : "hidden"
        } lg:block`}
      >
        <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
        <nav>
          <ul className="space-y-4 h-screen">
            <li className="flex items-center space-x-3 hover:bg-orange-500 p-2 rounded-lg">
              <FaUserGraduate className="sidebar-icon" />
              <a href="/dashboard" className="sidebar-link">
                Dashboard
              </a>
            </li>
            <li className="flex items-center space-x-3 hover:bg-orange-500 p-2 rounded-lg">
              <FaUser className="sidebar-icon" />
              <a href="/users" className="sidebar-link">
                Users
              </a>
            </li>
            <li className="flex items-center space-x-3 hover:bg-orange-500 p-2 rounded-lg">
              <FaBook className="sidebar-icon" />
              <a href="/courses" className="sidebar-link">
                Courses
              </a>
            </li>
            <li className="flex items-center space-x-3 hover:bg-orange-500 p-2 rounded-lg">
              <FaUserGraduate className="sidebar-icon" />
              <a href="/students" className="sidebar-link">
                Students
              </a>
            </li>
            <li className="flex items-center space-x-3 hover:bg-orange-500 p-2 rounded-lg">
              <FaCog className="sidebar-icon" />
              <a href="/settings" className="sidebar-link">
                Settings
              </a>
            </li>
            <li className="flex items-center space-x-3 hover:bg-orange-500 p-2 rounded-lg">
              <FaSignOutAlt className="sidebar-icon" />
              <a href="/" className="sidebar-link">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Hamburger Icon for Mobile View */}
      <div className="lg:hidden p-4">
        <FaBars
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-2xl cursor-pointer"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white lg:ml-64">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-semibold text-orange-500">
            Student Management
          </h1>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-orange-500">
            Add New Student
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-2">
              <input
                type="text"
                placeholder="Full Name"
                value={newStudent.fullName}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, fullName: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <input
                type="date"
                placeholder="Date of Birth"
                value={newStudent.dateOfBirth}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, dateOfBirth: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Grade"
                value={newStudent.grade}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, grade: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Parent Name"
                value={newStudent.contactInformation.parentName}
                onChange={(e) =>
                  setNewStudent({
                    ...newStudent,
                    contactInformation: {
                      ...newStudent.contactInformation,
                      parentName: e.target.value,
                    },
                  })
                }
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Parent Phone Number"
                value={newStudent.contactInformation.parentPhoneNumber}
                onChange={(e) =>
                  setNewStudent({
                    ...newStudent,
                    contactInformation: {
                      ...newStudent.contactInformation,
                      parentPhoneNumber: e.target.value,
                    },
                  })
                }
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <input
                type="email"
                placeholder="Parent Email"
                value={newStudent.contactInformation.parentEmail}
                onChange={(e) =>
                  setNewStudent({
                    ...newStudent,
                    contactInformation: {
                      ...newStudent.contactInformation,
                      parentEmail: e.target.value,
                    },
                  })
                }
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Address"
                value={newStudent.address}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, address: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded"
            >
              Add Student
            </button>
          </form>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-orange-500">
            Students List
          </h2>
          {students.length === 0 ? (
            <p className="text-gray-500">No students found.</p>
          ) : (
            <ul className="list-disc pl-5">
              {students.map((student) => (
                <li key={student._id} className="mb-2">
                  {student.fullName} - {student.grade}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default StudentManagement;