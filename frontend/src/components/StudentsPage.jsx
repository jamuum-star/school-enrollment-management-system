import React, { useState, useEffect } from 'react';
import { getAllStudents, createStudent, updateStudent, deleteStudent } from '../services/studentService';
import { FaEdit, FaTrash, FaBars, FaUserGraduate, FaUser, FaBook, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const StudentsPage = () => {
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
    enrollmentStatus: 'Pending'
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getAllStudents();
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Failed to fetch students. Please try again later.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingStudent) {
        await updateStudent(editingStudent._id, newStudent);
      } else {
        await createStudent(newStudent);
      }
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
        enrollmentStatus: 'Pending'
      });
      setEditingStudent(null);
      fetchStudents();
    } catch (error) {
      console.error('Error creating/updating student:', error);
      setError('Failed to save student. Please try again later.');
    }
  };

  const validateForm = () => {
    const { fullName, dateOfBirth, grade, contactInformation, address } = newStudent;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{7,15}$/;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const gradeRegex = /^[A-Fa-f0-9]+$/;

    if (!nameRegex.test(fullName)) {
      setError('Full Name must contain only letters and spaces.');
      return false;
    }
    if (!dateOfBirth || new Date(dateOfBirth) > new Date()) {
      setError('Valid Date of Birth is required.');
      return false;
    }
    if (!gradeRegex.test(grade)) {
      setError('Grade must be a valid grade.');
      return false;
    }
    if (!nameRegex.test(contactInformation.parentName)) {
      setError('Parent Name must contain only letters and spaces.');
      return false;
    }
    if (!phoneRegex.test(contactInformation.parentPhoneNumber)) {
      setError('Valid Parent Phone Number is required.');
      return false;
    }
    if (!emailRegex.test(contactInformation.parentEmail)) {
      setError('Valid Parent Email is required.');
      return false;
    }

    // Check for existing email
    const existingEmail = students.find(student => student.contactInformation.parentEmail === contactInformation.parentEmail);
    if (existingEmail && (!editingStudent || existingEmail._id !== editingStudent._id)) {
      setError('Parent Email already exists.');
      return false;
    }

    if (!address) {
      setError('Address is required.');
      return false;
    }
    setError('');
    return true;
  };

  const handleEdit = (student) => {
    setNewStudent(student);
    setEditingStudent(student);
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
      setError('Failed to delete student. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white h-screen p-5 lg:w-64 w-full lg:h-auto lg:fixed lg:overflow-y-auto ${
          sidebarOpen ? "block" : "hidden"
        } lg:block`}
      >
        <h2 className="text-2xl font-bold mb-6 text-orange-500">
          Admin Dashboard
        </h2>
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
          className="text-2xl cursor-pointer text-gray-800"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100 lg:ml-64">
        <h1 className="text-4xl font-semibold mb-8 text-orange-500">
          Students
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-4">
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
          <div className="mb-4">
            <input
              type="date"
              placeholder="Date of Birth"
              value={
                newStudent.dateOfBirth ||
                (editingStudent && editingStudent.dateOfBirth)
              }
              onChange={(e) =>
                setNewStudent({ ...newStudent, dateOfBirth: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
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
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            {editingStudent ? "Update Student" : "Add Student"}
          </button>
        </form>
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">
          Students List
        </h2>
        {students.length === 0 ? (
          <p className="text-gray-500">No students found.</p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Full Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date of Birth
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Grade
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Parent Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Parent Phone Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Parent Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(student.dateOfBirth).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.grade}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.contactInformation.parentName || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.contactInformation.parentPhoneNumber || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.contactInformation.parentEmail || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(student)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit className="text-lg" />
                      </button>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <FaTrash className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsPage;