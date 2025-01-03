import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSignOutAlt,
  FaUserGraduate,
  FaUser,
  FaBook,
  FaUserTie,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/courses");
      const data = await response.json();
      setCourses(data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch courses.");
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({ name: course.name, description: course.description });
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/courses/${id}`, { method: "DELETE" });
      setCourses(courses.filter((course) => course._id !== id));
    } catch (error) {
      setError("Failed to delete course.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCourse) {
      try {
        const response = await fetch(`/api/courses/${editingCourse._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const updatedCourse = await response.json();
        setCourses(
          courses.map((course) =>
            course._id === updatedCourse._id ? updatedCourse : course
          )
        );
        setEditingCourse(null);
        setFormData({ name: "", description: "" });
      } catch (error) {
        setError("Failed to update course.");
      }
    } else {
      try {
        const response = await fetch("/api/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const newCourse = await response.json();
        setCourses([...courses, newCourse]);
        setFormData({ name: "", description: "" });
      } catch (error) {
        setError("Failed to add course.");
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white h-screen p-5 lg:w-64 w-full lg:h-auto lg:fixed lg:overflow-y-auto">
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

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100 min-h-screen lg:ml-64">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-semibold">Courses Management</h1>
          <button
            onClick={() => setEditingCourse(null)}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 flex items-center"
          >
            <FaPlus className="mr-2" /> Add New Course
          </button>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Course Name</th>
                <th className="border border-gray-300 p-2">Description</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id} className="text-center">
                  <td className="border border-gray-300 p-2">{course.name}</td>
                  <td className="border border-gray-300 p-2">
                    {course.description}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleEdit(course)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <form onSubmit={handleSubmit} className="mt-6">
          <h2 className="text-xl font-bold mb-4">
            {editingCourse ? "Edit Course" : "Add New Course"}
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700">Course Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {editingCourse ? "Update Course" : "Add Course"}
          </button>
          {editingCourse && (
            <button
              onClick={() => setEditingCourse(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Courses;
