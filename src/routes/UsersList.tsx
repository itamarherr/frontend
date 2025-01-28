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

  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!users || users.length === 0) return <div>No users found</div>;

 
  const handleRowClick = (userId: string) => {
    if (window.confirm("Do you want to view this user?")) {
      navigate(`/AdminUserProfilePage/${userId}`);
    }
  };

  return (
    <div className="P-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">UsersList</h1>
      <table>
        <thead>
          <tr>
            <th className="px-4 py-2">UserName</th>
            <th className="px-4 py-2">FirstName</th>
            <th className="px-4 py-2">LastName</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">PhoneNumber</th>
            <th className="px-4 py-2">ImageUrl</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user) => (
            <tr key={user.id}
                className="cursor-pointer hover:bg-gray-100 active:bg-gray-200 transition-all"
                 onClick={() => handleRowClick(user.id)}
              >
              <td className="px-4 py-2 text-center">{user.userName}</td>
              <td className="px-4 py-2 text-center">{user.firstName}</td>
              <td className="px-4 py-2 text-center">{user.lastName}</td>
              <td className="px-4 py-2 text-center">
                {user.email || "No email available"}
              </td>
              <td className="px-4 py-2 text-center">{user.phoneNumber}</td>
              <td className="px-4 py-2 text-center">
                {user.imageUrl ? (
                  <img
                    src={`https://localhost:7129${user.imageUrl}`}
                    alt={`${user.userName}'s profile`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  "No image available"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;




