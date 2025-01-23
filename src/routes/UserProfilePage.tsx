import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getCurrentUserProfile } from '../api/auth-api'; 
import UserProfileDetails from '../Components/UserProfileDetails';
import useFetch from '../hooks/useFetch';

const UserProfilePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserProfile = async () => {
            const jwt = localStorage.getItem("token");
            if(!jwt){
                console.log("Jwt not found");
                navigate("/login");
                return;
            }
            try{
                const response = await getCurrentUserProfile(jwt);
                setUser(response.data);
                console.log("User Details:", response.data);

            } catch(error){
                console.log("Error fatching profile", error);
            } finally {
                console.log("Profile fetched");
            }
            
        };
        fetchUserProfile();
    }, [navigate]);

    function handleUpdateClick() {
        navigate("UserSettingsPage");
    }
    const handleDeleteClick = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (confirmDelete) {
          // Call API to delete user
          console.log("Account deleted");
          navigate("/goodbye");
        }
      };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
     {user ? (
        <>
        <UserProfileDetails user={user} />
        <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleUpdateClick}
      >
        Update My Profile
      </button>
      <button
      className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      onClick={handleDeleteClick}
>
  Delete My Account
</button>
      </>
    ) :(
         <p>Loading...</p>
        )}
    </div>
  )
}

export default UserProfilePage;