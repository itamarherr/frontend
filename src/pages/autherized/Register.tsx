import { Formik } from "formik";
import { useEffect } from "react";
import { useFormikContext } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Spinner from "../../ui/Spinner";
import { showErrorDialog, showSuccessDialog } from "../../dialogs/dialogs";
import { auth } from "../../api/auth-api";
import { useNavigate } from "react-router-dom";
import UserRegistrationFormFields from "../forms/UserRegistrationFormFields";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
 
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First Name is required")
      .min(2, "First Name must contain at least 2 characters")
      .max(20, "First Name cannot exceed 20 characters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .min(2, "Last Name must contain at least 2 characters")
      .max(20, "Last Name cannot exceed 20 characters"),
    email: Yup.string().email("Bad Email!").required("The email is required"),
    username: Yup.string()
      .required("UserName is required")
      .min(2, "UserName must contain at least 2 characters")
      .max(20, "UserName cannot exceed 20 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must contain at least 8 characters")
      .max(20, "Password cannot exceed 20 characters")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,30}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password is requierd")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
      image: Yup.mixed()
      .required("Profile image is required") 
      .test("fileSize", "File is too large (Max: 2MB)", (value) => {
        if (!value || !(value instanceof File)) return false; 
        return value.size <= 2 * 1024 * 1024; 
      })
      .test("fileType", "Unsupported file format", (value) => {
        if (!value || !(value instanceof File)) return false; 
        return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
      }),
  });

  const initialValues = {
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
    image: null as File | null,
    password: "",
    confirmPassword: "",
  };
  const handleSubmit = async (values: typeof initialValues) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("Email", values.email);
    formData.append("Username", values.username);
    formData.append("Password", values.password);
    formData.append("FirstName", values.firstName);
    formData.append("LastName", values.lastName);
    if (values.phone) formData.append("PhoneNumber", values.phone);
    if (values.image) {
      formData.append("image", values.image);
    } else {
      showErrorDialog("Profile image is required");
      setIsLoading(false);
      return;
    }

    try {
      await auth.register(formData);
      await showSuccessDialog("Registration successful");
      navigate("/login");
    } catch {
      showErrorDialog("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };
  const ResetFormOnMount = () => {
    const { resetForm } = useFormikContext();
    useEffect(() => {
      resetForm(); 
    }, []);
    return null;
  };
  return (
    <Formik
    key={JSON.stringify(initialValues)} 
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
    
      {({ handleSubmit }) => (
       <>
        <ResetFormOnMount />
        <form onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold text-center mb-6">Register Form</h1>
          <h2 className="text-2xl mb-12 text-center">
            Fill out the form to register
          </h2>
          <UserRegistrationFormFields isLoading={isLoading} error={error} />
         <div className="flex justify-center">
         <button
            type="submit"
            className="button mt-6 item-center w-1/2"
          >
            Register
          </button>
         </div>
         
        </form>
        </>
      )}
    </Formik>
  );
};

export default Register;
