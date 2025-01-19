import React, { useState, useEffect } from "react";
import { users_api, UpdateUserData } from "../api/Users-api";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
const UsersList: React.FC = () => {
  const { loading, data: users, error } = useFetch(users_api.getAllUsers);
  const navigate = useNavigate();
  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  handleUpdateClick = () => {
    navigate("/Users/:id");
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
            <th className="px-4 py-2">Update Butoon</th>
            <th className="px-4 py-2">Delete Butoon</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
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
              <td className="px-4 py-2 text-center">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  // onClick={() => UpdateUserData(user.id)}
                >
                  Update
                </button>
              </td>
              <td className="px-4 py-2 text-center">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  // onClick={() => UpdateUserData(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
