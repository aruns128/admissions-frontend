import React, { useState, useEffect } from "react";
import Layout from "../common/Layout";
import api from "../../utils/api";

function User() {
  const [users, setUsers] = useState([]); // Updated to fetch users from API
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "agent", // Default role
  });
  const [isEditing, setIsEditing] = useState(false); // To track if we are updating
  const [editUserId, setEditUserId] = useState(null); // Track the user being edited
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Delete confirmation visibility
  const [userToDelete, setUserToDelete] = useState(null); // Track user to delete

  // Fetch users from the API when the component loads
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data); // Assuming the API returns the users in data
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission for creating or updating users
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update user logic can go here (if applicable)
    } else {
      try {
        const response = await api.post("/auth/register", formData);
        setUsers([...users, response.data]); // Add new user to the state
        setShowModal(false); // Close modal after successful creation
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
    setFormData({ name: "", email: "", password: "", role: "agent" });
  };

  // Handle editing a user
  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setFormData({ ...userToEdit });
    setIsEditing(true);
    setEditUserId(id);
    setShowModal(true);
  };

  // Handle deleting a user with confirmation
  const confirmDelete = (id) => {
    setUserToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/users/${userToDelete}`); // Assuming delete endpoint is `/admin/users/:id`
      setUsers(users.filter((user) => user.id !== userToDelete));
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Open modal for creating a new user
  const openCreateModal = () => {
    setFormData({ name: "", email: "", password: "", role: "agent" });
    setIsEditing(false);
    setShowModal(true);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>
        <div className="flex justify-end mb-4">
          <button
            onClick={openCreateModal}
            className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
          >
            Create User
          </button>
        </div>

        {/* Table for displaying users */}
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(user.id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for create/edit user */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg max-w-3xl w-full">
              <h2 className="text-xl font-bold mb-4">
                {isEditing ? "Edit User" : "Create User"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="agent">Agent</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-500 text-white p-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                  >
                    {isEditing ? "Update User" : "Create User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete confirmation modal */}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-4">Delete Confirmation</h2>
              <p>Are you sure you want to delete this user?</p>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="bg-gray-500 text-white p-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default User;
