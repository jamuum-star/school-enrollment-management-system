import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const StudentsTable = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await fetch('/api/students');
    const data = await response.json();
    setStudents(data);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/students/${id}`, { method: 'DELETE' });
    fetchStudents(); // Refresh the table
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4">Students List</h3>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2">Full Name</th>
            <th className="px-4 py-2">Grade</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id} className="border-b">
              <td className="px-4 py-2">{student.fullName}</td>
              <td className="px-4 py-2">{student.grade}</td>
              <td className="px-4 py-2">
                <Link to={`/students/edit/${student._id}`} className="text-blue-500 hover:text-blue-700 mr-2">
                  <FaEdit />
                </Link>
                <button onClick={() => handleDelete(student._id)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
