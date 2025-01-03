import React, { useState, useEffect } from "react";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({ fullName: "", email: "", role: "" });

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch users.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle user deletion
  const handleDelete = async (userId) => {
    try {
      await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "DELETE",
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      setError("Failed to delete user.");
    }
  };

  // Handle user update
  const handleEdit = (user) => {
    setEditingUser(user._id);
    setUpdatedUser({ fullName: user.fullName, email: user.email, role: user.role });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${editingUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      if (response.ok) {
        const updated = await response.json();
        setUsers(users.map((user) => (user._id === updated._id ? updated : user)));
        setEditingUser(null);
      } else {
        setError("Failed to update user.");
      }
    } catch (error) {
      setError("Failed to update user.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Users Management</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Full Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Role</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border border-gray-300 p-2">
                  {editingUser === user._id ? (
                    <input
                      type="text"
                      value={updatedUser.fullName}
                      onChange={(e) => setUpdatedUser({ ...updatedUser, fullName: e.target.value })}
                      className="border border-gray-300 rounded p-1"
                    />
                  ) : (
                    user.fullName
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  {editingUser === user._id ? (
                    <input
                      type="email"
                      value={updatedUser.email}
                      onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                      className="border border-gray-300 rounded p-1"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  {editingUser === user._id ? (
                    <select
                      value={updatedUser.role}
                      onChange={(e) => setUpdatedUser({ ...updatedUser, role: e.target.value })}
                      className="border border-gray-300 rounded p-1"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Parent">Parent</option>
                      <option value="Student">Student</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  {editingUser === user._id ? (
                    <>
                      <button
                        onClick={handleUpdate}
                        className="text-white bg-green-500 px-4 py-1 rounded hover:bg-green-700 transition mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingUser(null)}
                        className="text-white bg-gray-500 px-4 py-1 rounded hover:bg-gray-700 transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-white bg-yellow-500 px-4 py-1 rounded hover:bg-yellow-700 transition mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-white bg-red-500 px-4 py-1 rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersTable;