import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { users_api } from "../api/Users-api";
import UserProfileDetails from "../Components/UserProfileDetails";
import useFetch from "../hooks/useFetch";
import { showErrorDialog, showSuccessDialog } from "../dialogs/dialogs";

const AdminUserProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchUserById = useCallback(() =>{
    if(!id) throw new Error("User ID is missing");
    return users_api.getUserById(id);
  },[id]);

  const {
    data: user,
    loading,
    error,
    refetch,
  } = useFetch(fetchUserById);

  const handleDeleteClick = async () => {
    try {
      await users_api.deleteUser(id);
      await showSuccessDialog("User deleted successfully!");
      navigate("/usersList");
    } catch (error) {
      console.error("Error deleting user", error);
      showErrorDialog("Failed to delete user. Please try again");
    }
  };
  return (
    <div className="p-6 bg-white shedow-md rounded-lg">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {user ? (
        <>
          <UserProfileDetails user={user} />
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleDeleteClick}
          >
            Delete User
          </button>
        </>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
};

export default AdminUserProfilePage;
