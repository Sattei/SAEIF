import React, { useState, useEffect } from "react";

const API = process.env.REACT_APP_API || "";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const currentAdminId = localStorage.getItem("userId");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch users");
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePromote = async (userId) => {
    if (
      !window.confirm("Are you sure you want to promote this user to admin?")
    ) {
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/users/promote/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to promote user");

      fetchUsers();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleDemote = async (userId) => {
    if (
      !window.confirm("Are you sure you want to demote this admin to a member?")
    ) {
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/users/demote/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to demote user");

      fetchUsers();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b text-left">Email</th>
              <th className="px-6 py-3 border-b text-left">Role</th>
              <th className="px-6 py-3 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 border-b">{user.email}</td>
                <td className="px-6 py-4 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.role === "admin"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4 border-b space-x-2">
                  {/* --- THIS IS THE FIX --- */}
                  {/* Show "Promote" if the role is 'member' */}
                  {user.role === "member" && (
                    <button
                      onClick={() => handlePromote(user._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600"
                    >
                      Promote to Admin
                    </button>
                  )}
                  {/* ------------------------ */}

                  {user.role === "admin" && user._id !== currentAdminId && (
                    <button
                      onClick={() => handleDemote(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                    >
                      Demote to Member
                    </button>
                  )}
                  {user._id === currentAdminId && (
                    <span className="text-xs text-gray-500">(This is you)</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManager;
