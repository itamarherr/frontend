import React from "react";

const BASE_URL = "https://localhost:7129";
const DEFAULT_IMAGE = "/Uploads/default-profile.png"; 
const UserProfileDetails = ({ user }) => {
  if (!user) {
    return <p className="text-center text-gray-500">User data not available.</p>;
  }
  const imageUrl = user.imageUrl ? `${BASE_URL}${user.imageUrl}` : null;
  return (
    <div className="user-details-box">
      <h1 className="text-xl font bold md-4">{user.userName}'s Profile </h1>
      <p className="mb-2"><strong>Email:</strong> {user.email || "No email available"}</p>
      <p className="mb-2"><strong>First Name:</strong> {user.firstName || "N/A"}</p>
      <p className="mb-2"><strong>Last Name:</strong> {user.lastName || "N/A"}</p>
      <p className="mb-2"><strong>Phone Number:</strong> {user.phoneNumber || "N/A"}</p>
      <div className="mt-4 flex justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${user.userName}'s profile`}
            className="w-32 h-32 rounded-full object-cover border-4 border-4-gray-300 shadow-lg"
          />
        ) : (
          <p className="text-gray-500">"No image available"</p>
        )}
      </div>
    </div>
  );
};

export default UserProfileDetails;
