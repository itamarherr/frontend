import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUserProfile } from "../../api/auth-api";
import UserProfileDetails from "../users/UserProfileDetails";
import useFetch from "../../hooks/useFetch";

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const[error, setError] = useState(null);
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
        if (!response || !response.data) {
          throw new Error("Invalid response from server");
        }
        console.log("User Details:", response.data);
        setUser(response.data);
        console.log("User Details:", response.data);
      } catch (error) {
        console.log("Error fatching profile", error);
        setError("Failed to load profile. Please try again.");
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
    <div className="user-details-box">
      
      {user && <UserProfileDetails user={user} />} 
          <button
            className=" mt-5 px-4 py-2 rounded-md bg-green-700 text-green-100 hover:bg-green-800 dark:bg-green-600 dark:text-green-100 dark:hover:bg-green-700"
            onClick={() => navigate("/UserSettingsPage")}
          >
            Update My Profile
          </button>
          <button
            style={{ marginLeft: "10px" }}
            className="mt-5 px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
            onClick={handleDeleteClick}
          >
            Delete My Account
          </button>
    </div>
  );
};

export default UserProfilePage;
