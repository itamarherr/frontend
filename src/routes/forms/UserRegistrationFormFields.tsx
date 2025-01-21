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
    <Form className="flex flex-col items-center">
      
      {isLoading && <Spinner title="Processing..." />}
      {error && (
        <p className="text-red-500">
          {typeof error === "object" && "message" in error
            ? (error as { message: string }).message
            : typeof error === "string"
            ? error
            : "An unexpected error occurred"}
        </p>
      )}
      <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
        <label htmlFor="username">User Name</label>
        <Field
          name="username"
          type="text"
          id="username"
          className="rounded-md hover:border-2 border-2 px-2 py-2"
        />
        <ErrorMessage
          name="username"
          component="div"
          className="text-red-500"
        />
      </div>
      <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
        <label htmlFor="firstName">First Name</label>
        <Field
          name="firstName"
          type="text"
          id="firstName"
          className="rounded-md hover:border-2 border-2 px-2 py-2"
        />
        <ErrorMessage
          name="firstName"
          component="div"
          className="text-red-500"
        />
      </div>
      <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
        <label htmlFor="lastName">Last Name</label>
        <Field
          name="lastName"
          type="text"
          id="lastName"
          className="rounded-md hover:border-2 border-2 px-2 py-2"
        />
        <ErrorMessage
          name="lastName"
          component="div"
          className="text-red-500"
        />
      </div>
      <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
        <label htmlFor="email">Email Address</label>
        <Field
          name="email"
          type="email"
          id="email"
          className="rounded-md hover:border-2 border-2 px-2 py-2"
        />
        <ErrorMessage name="email" component="div" className="text-red-500" />
      </div>

      <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
        <label htmlFor="phone">Phone number</label>
        <Field
          name="phone"
          type="text"
          id="phone"
          className="rounded-md hover:border-2 border-2 px-2 py-2"
        />
        <ErrorMessage name="phone" component="div" className="text-red-500" />
      </div>

      <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
        <label htmlFor="image">Profile Image</label>
        <Field name="image">
          {({ field, form }) => (
            <input
              type="file"
              id="image"
              className="rounded-md hover:border-2 border-2 px-2 py-2"
              accept="image/*"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const file = event.currentTarget.files?.[0] || null;
                form.setFieldValue(field.name, file);          
            }}
            />
          )}
        </Field>

        <ErrorMessage name="image" component="div" className="text-red-500" />
      </div>

      <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
        <label htmlFor="password">Password</label>
        <Field
          name="password"
          type="password"
          id="password"
          className="rounded-md hover:border-2 border-2 px-2 py-2"
        />
        <ErrorMessage
          name="password"
          component="div"
          className="text-red-500"
        />
      </div>

      <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <Field
          name="confirmPassword"
          type="password"
          id="confirmPassword"
          className="rounded-md hover:border-2 border-2 px-2 py-2"
        />
        <ErrorMessage
          name="confirmPassword"
          component="div"
          className="text-red-500"
        />
      </div>

    
    </Form>
  );
};

export default UserRegistrationFormFields;
