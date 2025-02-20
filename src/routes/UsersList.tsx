import React, { useState, useEffect, useCallback} from "react";
import { users_api, UpdateUserData } from "../api/Users-api";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { showErrorDialog, showSuccessDialog } from "../dialogs/dialogs";
import { array } from "yup";

const UsersList: React.FC = () => {
  const fetchUsers = useCallback(() => users_api.getAllUsers(), []);
  const { data: users, loading,  error } = useFetch(fetchUsers);
  // const users = Array.isArray(data) ? data : [];
  const navigate = useNavigate();

  if (loading) return <div className="text-center">Loading users...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;
  if (!users || users.length === 0) return <div className="text-center">No users found</div>;

 
  const handleRowClick = (userId: string) => {
    if (window.confirm("Do you want to view this user?")) {
      navigate(`/AdminUserProfilePage/${userId}`);
    }
  };

  return (
    <div className="p-6 min-h-screen form-container">
      <h1 className="text-2xl font-bold mb-6 text-center">UsersList</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg border border-green-700 dark:border-green-500">
      <table className="w-full border-collapse bg-white dark:bg-green-950 text-gray-900 dark:text-green-100">
        <thead className="bg-gray-200 dark:bg-green-800">
          <tr>
            <th className="px-4 py-2 border">UserName</th>
            <th className="px-4 py-2 border">FirstName</th>
            <th className="px-4 py-2 border">LastName</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">PhoneNumber</th>
            <th className="px-4 py-2 border">ImageUrl</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user) => (
            <tr key={user.id}
                className="cursor-pointer hover:bg-gray-200 dark:hover:bg-green-700 transition-all"
                 onClick={() => handleRowClick(user.id)}
              >
              <td className="px-4 py-2 text-center border">{user.userName}</td>
              <td className="px-4 py-2 text-center border">{user.firstName}</td>
              <td className="px-4 py-2 text-center border">{user.lastName}</td>
              <td className="px-4 py-2 text-center border">{user.email || "No email available"}</td>
              <td className="px-4 py-2 text-center border">{user.phoneNumber}</td>
              <td className="px-4 py-2 text-center border">
                {user.imageUrl ? (
                  <img
                    src={`https://localhost:7129${user.imageUrl}`}
                    alt={`${user.userName}'s profile`}
                    className="w-16 h-16 rounded-full object-cover border border-gray-300 dark:border-green-500"
                  />
                ) : (
                  <span className="italic text-gray-500 dark:text-green-300">No image</span>
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

export default UsersList;




