import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { users_api } from "../api/Users-api";
import UserProfileDetails from "../Components/UserProfileDetails";
import useFetch from "../hooks/useFetch";
import { showErrorDialog, showSuccessDialog } from "../dialogs/dialogs";

const AdminUserProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserById = async () => {
      if (!id) {
        console.error("User ID is missing!");
        setError("User ID is missing.");
        return;
      }
      try {
        const response = await users_api.getUserById(id);
        console.log("Admin fetched user details:", response);
        setUser(response);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserById();
  }, [id]); // 

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>No user data found.</p>;

  const handleDeleteClick = async () => {
    try {
      await users_api.deleteUser(id);
      await showSuccessDialog("User deleted successfully!");
      navigate("/usersList");
    } catch (error) {
      console.error("Error deleting user:", error);
      showErrorDialog("Failed to delete user. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white shedow-md rounded-lg">
      
          <UserProfileDetails user={user} />
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleDeleteClick}
          >
            Delete User
          </button>
    </div>
  );
};

export default AdminUserProfilePage;
