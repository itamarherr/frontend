import React from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

const EcoSurveyForm = () => {
  const initialValues = {
    area: "",
    areaSize: "",
    surveyPurpose: "",
    surveytype: "",
  };

  const validationSchema = Yup.object().shape({
    area: Yup.string().required("Name is required"),
    uareasize: Yup.string().required("Username is required"),
    surveyPurpose: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    surveyType: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        // Handle form submission here

        // ...
        setSubmitting(false);
      }}
    >
      <Form className="flex flex-col items-center mt-20">
        <h1 className="text-center font-bold text-2xl">
          Eco Survey Request Form
        </h1>
        {/* {isLoading && <Spinner/>}
     {error && <p className='text0red-500'>{error}</p>} */}
        <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg">
          <label className="px-2 py-2 mt-4" htmlFor="Survey Type">
            Survey Type
          </label>
          <Field
            as="select"
            name="Survey Type"
            type="name"
            id="Survey Type"
            className="rounded-md active:border-2 border-green-300 hover:border-green-500 border-2 px-1 py-2"
          >
            <option value="" label="Select survey type" />
            <option value="ecological" label="Ecological Survey" />
            <option value="soil" label="Soil Survey" />
            <option value="biodiversity" label="Biodiversity Survey" />
            <option value="forest" label="Forest Survey" />
          </Field>
          <ErrorMessage
            name="Survey Type"
            component="div"
            className="text-red-500"
          />
        </div>
        <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg">
          <div className="font-extralight form-group flex flex-col gap-2 w-full mx-auto text-lg">
            <label className="px-2 py-2 mt-4" htmlFor="Area">
              Area
            </label>
            <Field
              name="Area"
              type="name"
              id="Area"
              className="rounded-md active:border-2 border-green-300 hover:border-green-500 border-2 px-1 py-2"
            />
            <ErrorMessage
              name="Area"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="font-extralight form-group flex flex-col gap-2 w-full mx-auto text-lg">
            <label className="px-2 py-2 mt-4" htmlFor="Aera Size">
              Aera Size
            </label>
            <Field
              name="Aera Size"
              type="name"
              id="Aera Size"
              className="rounded-md active:border-2 border-green-300 hover:border-green-500 border-2 px-1 py-2"
            />
            <ErrorMessage
              name="Aera Size"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="font-extralight form-group flex flex-col gap-2 w-full mx-auto text-lg">
            <label className="px-2 py-2 mt-4" htmlFor="Survey Purpose">
              Survey Purpose
            </label>
            <Field
              name="survey Purpose"
              type="name"
              id="Survey Purpose"
              className="rounded-md active:border-2 border-green-300 hover:border-green-500 border-2 px-1 py-2"
            />
            <ErrorMessage
              name="survey Purpose"
              component="div"
              className="text-red-500"
            />
          </div>

          <label className="px-2 py-2 mt-4" htmlFor="Survey Format Type">
            Survey Format Type
          </label>
          <Field
            name="Survey Format Type"
            type="name"
            id="Survey Format Type"
            className="rounded-md active:border-2 border-green-300 hover:border-green-500 border-2 px-1 py-2"
          />
          <ErrorMessage
            name="Survey Format Type"
            component="div"
            className="text-red-500"
          />
        </div>

        <button
          // disabled={isLoading}
          type="submit"
          className="rounded-md bg-green-800 disabled:bg-green-800/50 hover:bg-green-600 w-1/2 mx-auto flex text-center hover:bg-green-900e text-white font-bold py-2 px-4 mt-7 border"
        >
          Register
        </button>
      </Form>
    </Formik>
  );
};

export default EcoSurveyForm;
