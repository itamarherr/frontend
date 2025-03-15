import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Spinner from "../../ui/Spinner";
import { dialog, showErrorDialog, showSuccessDialog } from "../../dialogs/dialogs";
import { auth } from "../../api/auth-api";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const navigate = useNavigate();
  const { login } = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string().email("Bad Email!").required("The email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must contain at least 8 characters")
      .max(20, "Password cannot exceed 20 characters")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,30}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
  });

  const initialValues = {
    email: "",
    password: "",
  };
  console.log("Initial Values:", initialValues);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={(o) => {
        setIsLoading(true);
        auth
          .login(o.email, o.password)
          .then((response) => {
            showSuccessDialog("Login Successful").then(() => {
              login(response.data.token);

              navigate("/");
            });
          })
          .catch((error) => {
            showErrorDialog("Login Failed");
          })
          .finally(() => {
            setIsLoading(false);
          });
      }}
    >
      <Form className="flex flex-col items-center">
        {isLoading && <Spinner title="WaitUp!" />}
        {error && <p className="text-red-500">{error}</p>}
        <h1 className="text-4xl font-bold text-center mb-6">Login Form</h1>
          <h2 className="text-2xl mb-12 text-center">
            Fill out the form to Login
          </h2>
        <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
          <label htmlFor="email">Email Address</label>
          <Field
            name="email"
            type="email"
            id="email"
            autoComplete="new-email" 
            className="rounded-md hover:border-2 border-2 px-2 py-2"
          />
          <ErrorMessage name="email" component="div" className="text-red-500" />
        </div>

        <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
          <label htmlFor="password">Password</label>
          <Field
            name="password"
            type="password"
            id="password"
            autoComplete="new-password" 
            className="rounded-md hover:border-2 border-2 px-2 py-2"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500"
          />
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="button mt-6 item-center w-1/2"
        >
          login
        </button>
      </Form>
    </Formik>
  );
};

export default login;
