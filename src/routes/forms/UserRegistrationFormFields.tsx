import React from "react";
import { ErrorMessage, Form, Field, useFormikContext } from "formik";
import Spinner from "../../Components/Spinner";

interface UserRegistrationFormFieldsProps {
  isLoading: boolean;
  error?: string | { message: string };
}
const UserRegistrationFormFields: React.FC<UserRegistrationFormFieldsProps> = ({
    isLoading,
    error
}) => {
  let formikContext;
  try {
    formikContext = useFormikContext<{
      email: string;
      username: string;
      firstName: string;
      lastName: string;
      phone?: string | null;
      image?: File | null;
      password: string;
      confirmPassword: string;
    }>();
  } catch (e) {
    console.error("Error: useFormikContext is not inside Formik provider", e);
    return <p className="text-red-500">An unexpected error occurred</p>;
  }
  const { values, setFieldValue } = formikContext;
 
  return (
    <Form className=" mb-10 mt-10 max-w-3xl mx-auto bg-white dark:bg-gray-900 text-black dark:text-white p-8 rounded-xl shadow-lg">
      
      {isLoading && <Spinner title="Processing..." />}
      {error && (
         <p className="text-red-500 dark:text-red-400 text-center font-semibold">
          {typeof error === "object" && "message" in error
            ? (error as { message: string }).message
            : typeof error === "string"
            ? error
            : "An unexpected error occurred"}
        </p>
      )}
      <div className="mb-5">
        <label htmlFor="username" className="block font-semibold mb-1">User Name</label>
        <Field
          name="username"
          type="text"
          id="username"
        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white focus:ring focus:ring-green-300 dark:focus:ring-green-500"
        />
        <ErrorMessage
          name="username"
          component="div"
          className="text-red-500 dark:text-red-400 text-sm mt-1"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-5">
      <div>
        <label htmlFor="firstName" className="block font-semibold mb-1">First Name</label>
        <Field
          name="firstName"
          type="text"
          id="firstName"
           className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white focus:ring focus:ring-green-300 dark:focus:ring-green-500"
        />
        <ErrorMessage
          name="firstName"
          component="div"
          className="text-red-500 dark:text-red-400 text-sm mt-1"
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block font-semibold mb-1" >Last Name</label>
        <Field
          name="lastName"
          type="text"
          id="lastName"
         className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white focus:ring focus:ring-green-300 dark:focus:ring-green-500"
         />
        <ErrorMessage
          name="lastName"
          component="div"
          className="text-red-500 dark:text-red-400 text-sm mt-1"
        />
      </div>
      </div>



      <div className="mb-5">
        <label htmlFor="email" className="block font-semibold mb-1">Email Address</label>
        <Field
          name="email"
          type="email"
          id="email"
         className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white focus:ring focus:ring-green-300 dark:focus:ring-green-500"
        />
        <ErrorMessage name="email" component="div"  className="text-red-500 dark:text-red-400 text-sm mt-1" />
      </div>

      <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
        <label htmlFor="phone" className="block font-semibold mb-1">Phone number</label>
        <Field
          name="phone"
          type="text"
          id="phone"
         className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white focus:ring focus:ring-green-300 dark:focus:ring-green-500"
        />
        <ErrorMessage name="phone" component="div"  className="text-red-500 dark:text-red-400 text-sm mt-1"/>
      </div>

      <div className="mb-5">
        <label htmlFor="image" className="block font-semibold mb-1">Profile Image</label>
        <Field name="image">
          {({ field, form }) => (
            <input
              type="file"
              id="image"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white focus:ring focus:ring-green-300 dark:focus:ring-green-500"
              accept="image/*"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const file = event.currentTarget.files?.[0] || null;
                form.setFieldValue(field.name, file);          
            }}
            />
          )}
        </Field>
        <ErrorMessage name="image" component="div"  className="text-red-500 dark:text-red-400 text-sm mt-1" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
        <label htmlFor="password" className="block font-semibold mb-1">Password</label>
        <Field
          name="password"
          type="password"
          id="password"
         className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white focus:ring focus:ring-green-300 dark:focus:ring-green-500"
        />
        <ErrorMessage
          name="password"
          component="div"
          className="text-red-500 dark:text-red-400 text-sm mt-1"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block font-semibold mb-1">Confirm Password</label>
        <Field
          name="confirmPassword"
          type="password"
          id="confirmPassword"
         className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white focus:ring focus:ring-green-300 dark:focus:ring-green-500"
        />
        <ErrorMessage
          name="confirmPassword"
          component="div"
          className="text-red-500 dark:text-red-400 text-sm mt-1"
        />
      </div>
      </div>
    </Form>
  );
};

export default UserRegistrationFormFields;
