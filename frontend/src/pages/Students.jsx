import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();

  // Fetch students from the API
  useEffect(() => {
    fetch("/api/students")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        return response.json();
      })
      .then((data) => setStudents(data))
      .catch((err) => setError(err.message));
  }, []);

  // Delete a student
  const deleteStudent = (id) => {
    fetch(`/api/students/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete student");
        }
        setStudents(students.filter((student) => student.id !== id));
      })
      .catch((err) => setError(err.message));
  };

  // Handle adding a new student (navigate to form page)
  const addStudent = (newStudent) => {
    fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStudent),
    })
      .then((response) => response.json())
      .then((data) => {
        setStudents([...students, data]); // Add new student to state
      })
      .catch((error) => {
        setError("Failed to add student. Please try again later.");
      });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Students</h2>

      {/* Display error message if there's an error */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <table className="min-w-full table-auto border-collapse bg-gray-50">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Email
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2 text-sm text-gray-700">
                  {student.name}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {student.email}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  <button className="text-blue-500 hover:text-blue-700 mx-2">
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteStudent(student.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add New Student Button */}
      <button
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        onClick={addStudent}
      >
        <FaPlus className="inline mr-2" /> Add New Student
      </button>
    </div>
  );
};

export default Students;
