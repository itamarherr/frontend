import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUserProfile } from "../api/auth-api";
import UserProfileDetails from "../Components/UserProfileDetails";
import useFetch from "../hooks/useFetch";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserProfile = async () => {
      const jwt = localStorage.getItem("token");
      if (!jwt) {
        console.log("Jwt not found");
        navigate("/login");
        return;
      }
      try {
        const response = await getCurrentUserProfile(jwt);
        setUser(response.data);
        console.log("User Details:", response.data);
      } catch (error) {
        console.log("Error fatching profile", error);
      } finally {
        console.log("Profile fetched");
      }
    };
    fetchUserProfile();
  }, [navigate]);

  function handleUpdateClick() {
    navigate("/UserSettingsPage");
  }
  const handleDeleteClick = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      // Call API to delete user
      console.log("Account deleted");
      navigate("/goodbye");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-lg mt-8 bg-white text-black border border-gray-300 dark:bg-green-900 dark:text-green-100 dark:border-green-700">
      {user ? (
        <>
          <UserProfileDetails user={user} />
          <button
            className="px-4 py-2 rounded-md bg-green-700 text-green-100 hover:bg-green-800 dark:bg-green-600 dark:text-green-100 dark:hover:bg-green-700"
            onClick={handleUpdateClick}
          >
            Update My Profile
          </button>
          <button
            style={{ marginLeft: "10px" }}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
            onClick={handleDeleteClick}
          >
            Delete My Account
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserProfilePage;
