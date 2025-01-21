import { Formik, useFormikContext } from "formik";
import UserRegistrationFormFields from "./forms/UserRegistrationFormFields";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Spinner from "../Components/Spinner";
import { updateUserProfile, getCurrentUserProfile } from "../api/auth-api"; // Simulated API service
import { showSuccessDialog } from "../dialogs/dialogs";

const UserSettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Bad Email!").required("The email is required"),
    username: Yup.string().required().min(2).max(20),
    password: Yup.string()
      .required()
      .min(8)
      .max(20)
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,30}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "Passwords must match"),
    phone: Yup.string()
      .nullable()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  });
  const initialValues = {
    id: "",
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
    image: null as File | null,
    password: "",
    confirmPassword: "",
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      const jwt = localStorage.getItem("token");
      if (!jwt) {
        setError("Authentication failed");
        navigate("/login");
        return;
      }
      try {
        const response = await getCurrentUserProfile(jwt);
        console.log("User Details:", response.data);
        setUserDetails({
            id: response.data.id || "",
            email: response.data.email || "",
            username: response.data.username || "",
            firstName: response.data.firstName || "",
            lastName: response.data.lastName || "",
            phone: response.data.phone || "",
            image: null,
            password: "",
            confirmPassword: "",
          });
        console.log("User Details:", userDetails);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch user details");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDetails();
  }, [navigate]);

  const updateProfile = async (values: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const jwt = localStorage.getItem("token");
      if (!jwt) {
        setError("User not authenticated");
        return;
      }
      console.log("Updated Profile Values before submission:", values);
    
      const formData = new FormData();
      formData.append("Id", values.id);
      formData.append("Email", values.email);
      formData.append("Username", values.username);
      formData.append("FirstName", values.firstName);
      formData.append("LastName", values.lastName);
      formData.append("PhoneNumber", values.phone);
      if (values.image) formData.append("image", values.image);
  
      for (let [key, value] of formData.entries()) {
        console.log(`FormData entry - ${key}:`, value);
      }
      await updateUserProfile(jwt, values);
      await showSuccessDialog("Profile updated successfully");
      navigate("/");
    } catch (error: any) {
      console.error("Error during profile update:", error);
      setError(error.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) return <Spinner title="Loading user details..." />;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div className=" items-center">
      <section >    
        {userDetails && (
        <Formik
        enableReinitialize
        initialValues={userDetails}
        validationSchema={validationSchema}
        onSubmit={(values) => updateProfile(values)}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <h1 className="text-4xl font-bold text-center mb-6">User Settings</h1>
            <h2 className="text-2xl mb-12 text-center">Update your profile details</h2>
            <UserRegistrationFormFields isLoading={isLoading} error={error} />
            <button type="submit" className="bg-green-500 disabled:bg-blue-500/50 w-1/2 text-white font-bold px-4 py-2 mt-4 rounded">
              Save Changes
            </button>
          </form>
        )}
      </Formik>
        )}
      </section>
    </div>
  );
};

export default UserSettingsPage;
