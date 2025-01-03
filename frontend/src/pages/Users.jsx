
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useHistory } from 'react-router-dom'; // If you're using React Router for navigation

const Users = () => {
  const [users, setUsers] = useState([]);
  const history = useHistory(); // Assuming you're using React Router

  useEffect(() => {
    // Fetch users from the API
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error)); // Handle errors
  }, []);

  const deleteUser = (id) => {
    // Send DELETE request to the server
    fetch(`/api/users/${id}`, { method: 'DELETE' })
      .then(() => setUsers(users.filter(user => user._id !== id))) // Use _id if you're using MongoDB
      .catch(error => console.error('Error deleting user:', error)); // Handle errors
  };

  const handleAddUser = () => {
    // Navigate to the Add User page or show a modal
    history.push('/add-user'); // Replace with the actual route for adding users
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Users</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}> {/* Use _id for MongoDB */}
              <td>{user.fullName}</td> {/* Assuming fullName is the correct field */}
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button><FaEdit /></button>
                <button onClick={() => deleteUser(user._id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAddUser}>
        <FaPlus /> Add New User
      </button>
    </div>
  );
};

export default Users;

