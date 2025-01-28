import React from "react";

const BASE_URL = "https://localhost:7129";
const UserProfileDetails = ({ user }) => {
  const imageUrl = user.imageUrl ? `${BASE_URL}${user.imageUrl}` : null;
  return (
    <div className="max-w-lg mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg mt-8">
      <h1 className="text-xl font bold md-4">{user.userName}'s Profile </h1>
      <p className="mb-2">
        <strong>Email:</strong> {user.email}{" "}
      </p>
      <p className="mb-2">
        <strong>First Name:</strong> {user.firstName}{" "}
      </p>
      <p className="mb-2">
        <strong>Last Name:</strong> {user.lastName}{" "}
      </p>
      <p className="mb-2">
        <strong>Phone Number:</strong> {user.phoneNumber}{" "}
      </p>
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
