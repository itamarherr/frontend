import { Formik, useFormikContext } from "formik";
import UserRegistrationFormFields from "../forms/UserRegistrationFormFields";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Spinner from "../../ui/Spinner";
import { updateUserProfile, getCurrentUserProfile } from "../../api/auth-api"; // Simulated API service
import { showSuccessDialog } from "../../dialogs/dialogs";

const UserSettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "First Name must contain at least 2 characters")
      .max(20, "First Name cannot exceed 20 characters")
      .required("This field is required"),
    lastName: Yup.string()
      .min(2, "Last Name must contain at least 2 characters")
      .max(20, "Last Name cannot exceed 20 characters")
      .required("This field is required"),
    email: Yup.string().email("Bad Email!"),
    username: Yup.string()
      .min(2, "UserName must contain at least 2 characters")
      .max(20, "UserName cannot exceed 20 characters")
      .required("This field is required"),
    password: Yup.string()
      .nullable()
      .min(8, "Password must contain at least 8 characters")
      .max(20, "Password cannot exceed 20 characters")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,30}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      )
      .required("This field is required"),
    confirmPassword: Yup.string()
      .when("password", {
        is: (password) => password?.length > 0,
        then: (schema) => schema.required("confirme Password is required"),
        otherwise: (schema) => schema.notRequired(),
      })
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("This field is required"),
    phone: Yup.string()
      .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number")
      .required("This field is required"),
    image: Yup.mixed()
      .test(
        "required",
        "Profile image is required",
        (value) => value instanceof File
      ) // ✅ Required check first
      .test("fileSize", "File is too large (Max: 2MB)", (value) => {
        if (!value || !(value instanceof File)) return true; // ✅ Skip if no file
        return value.size <= 2 * 1024 * 1024;
      })
      .test("fileType", "Unsupported file format", (value) => {
        if (!value || !(value instanceof File)) return true; // ✅ Skip if no file
        return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
      }),
  });
  const initialValues = {
    id: "",
    email: "",
    userName: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
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
          username: response.data.userName || "",
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          phone: response.data.phoneNumber || "",
          image: response.data.imageUrl || null,
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch user details");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDetails();
  }, [navigate]);
  useEffect(() => {
    if (userDetails) {
      console.log("Updated User Details:", userDetails);
    }
  }, [userDetails]);
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
      if (
        values.phone !== undefined &&
        values.phone !== null &&
        values.phone !== ""
      ) {
        formData.append("PhoneNumber", values.phone);
      }

      if (values.image) formData.append("image", values.image);

      for (let [key, value] of formData.entries()) {
        console.log(`FormData entry - ${key}:`, value);
      }

      if (!values.phone) {
        formData.append("phoneNumber", ""); // ✅ Ensures `null` isn't sent
      }

      await updateUserProfile(jwt, formData);
      await showSuccessDialog("Profile updated successfully");
      navigate("/");
    } catch (error: any) {
      console.error("Error during profile update:", error);
      setError(
        error.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) return <Spinner title="Loading user details..." />;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <div className=" items-center">
      <section>
        {userDetails && (
          <Formik
            enableReinitialize
            initialValues={userDetails}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              // Check for empty required fields before submitting
              const emptyFields = Object.entries(values).filter(
                ([key, value]) => {
                  return key !== "image" && (value === "" || value === null);
                }
              );

              if (emptyFields.length > 0) {
                setError("All fields must be filled out before submitting.");
                setSubmitting(false);
                return;
              }

              updateProfile(values);
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <h1 className="text-4xl font-bold text-center mb-6">
                  User Settings
                </h1>
                <h2 className="text-2xl mb-12 text-center">
                  Update your profile details
                </h2>
                <UserRegistrationFormFields
                  isLoading={isLoading}
                  error={error}
                />
                <button
                  type="submit"
                  className="bg-green-500 disabled:bg-blue-500/50 w-1/2 text-white font-bold px-4 py-2 mt-4 rounded"
                >
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

// return (
//   <div className=" items-center">
//     <section>
//       {userDetails && (
//         <Formik
//           enableReinitialize
//           initialValues={userDetails}
//           validationSchema={validationSchema}
//           onSubmit={(values) => updateProfile(values)}
//         >
//           {({ handleSubmit }) => (
//             <form onSubmit={handleSubmit}>
//               <h1 className="text-4xl font-bold text-center mb-6">
//                 User Settings
//               </h1>
//               <h2 className="text-2xl mb-12 text-center">
//                 Update your profile details
//               </h2>
//               <UserRegistrationFormFields
//                 isLoading={isLoading}
//                 error={error}
//               />
//               <button
//                 type="submit"
//                 className="bg-green-500 disabled:bg-blue-500/50 w-1/2 text-white font-bold px-4 py-2 mt-4 rounded"
//               >
//                 Save Changes
//               </button>
//             </form>
//           )}
//         </Formik>
//       )}
//     </section>
//   </div>
// );
