import { Field, ErrorMessage, Form } from "formik";
import { useEffect } from "react";
import Spinner from "../../Components/Spinner";
import { calculateTotalPrice } from "../../utils/calculateTotalPrice";
import React from 'react'

 const OaKConsultancyFormFields = ({ isLoading, error, values, setFieldValue }) => {

  useEffect(() => {
    const price = calculateTotalPrice(values.consultancyType, values.numberOfTrees, values.isPrivateArea);
    setFieldValue("totalPrice", price);
  }, [values.consultancyType, values.numberOfTrees, values.isPrivateArea, setFieldValue]);

  return (
     <Form className="flex flex-col items-center">
      <h1 className="font-bold text-4xl mb-6 mt-12 text-center">Order Oak Consultancy Form</h1>
      <h2 className="text-2xl mb-12 text-center">Fill out the form to order the Oak Consultancy</h2>

      {isLoading && <Spinner title="Processing..." />}
      {error && (
  <p className="text-red-500">
    {typeof error === "object" && error.message
      ? error.message
      : typeof error === "string"
      ? error
      : "An unexpected error occurred"}
  </p>
)}

      <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
        <Field name="email" type="hidden" id="email" className="rounded-md hover:border-2 border-2 px-2 py-2" />
        <ErrorMessage name="email" component="div" className="text-red-500" />
      </div>

      <Field type="hidden" name="productId" value={1} />

      <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
        <label htmlFor="consultancyType">Consultancy Type</label>
        <Field as="select" name="consultancyType" className="rounded-md hover:border-2 border-2 px-2 py">
          <option value="">Select Consultancy Type</option>
          <option value="BeforeConstruction">Before Construction</option>
          <option value="Dislocations">Dislocations</option>
          <option value="TreesIllness">Trees Illness</option>
        </Field>
        <ErrorMessage name="consultancyType" component="div" className="text-red-500" />
      </div>

      <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
        <label htmlFor="numberOfTrees">Number of Trees</label>
        <Field type="number" name="numberOfTrees" className="rounded-md hover:border-2 border-2 px-2 py" />
        <ErrorMessage name="numberOfTrees" component="div" className="text-red-500" />
      </div>

      <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
        <div className="flex items-center">
          <Field type="checkbox" name="isPrivateArea" />
          <label htmlFor="isPrivateArea" className="ml-2">Is this a private area?</label>
        </div>
        <ErrorMessage name="isPrivateArea" component="div" className="text-red-500" />
      </div>

      <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
        <label htmlFor="dateForConsultancy">Date for Consultancy</label>
        <Field type="date" name="dateForConsultancy" className="rounded-md hover:border-2 border-2 px-2 py-2" />
        <ErrorMessage name="dateForConsultancy" component="div" className="text-red-500" />
      </div>

      <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
        <label>Total Price</label>
        <Field type="number" name="totalPrice" className="rounded-md hover:border-2 border-2 px-2 py-2" readOnly />
      </div>

      <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
        <div className="mb-2">
          <h3 className="text-xl font-semibold mb-2">Consultancy Location Address</h3>
          <div className="flex space-x-2">
            <div className="flex-1">
              <label htmlFor="city" className="block text-sm mb-1">City</label>
              <Field name="city" type="text" id="city" className="w-full rounded-md border-2 px-2 py-1" />
            </div>
            <div className="flex-1">
              <label htmlFor="street" className="block text-sm mb-1">Street</label>
              <Field name="street" type="text" id="street" className="w-full rounded-md border-2 px-2 py-1" />
            </div>
            <div className="flex-grow-0 w-1/4">
              <label htmlFor="number" className="block text-sm mb-1">Number</label>
              <Field name="number" type="number" id="number" className="w-full rounded-md border-2 px-2 py-1" />
            </div>
          </div>
          <div className="flex space-x-2 mt-1">
            <ErrorMessage name="city" component="div" className="text-red-500 text-sm flex-1" />
            <ErrorMessage name="street" component="div" className="text-red-500 text-sm flex-1" />
            <ErrorMessage name="number" component="div" className="text-red-500 text-sm flex-grow-0 w-1/4" />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-green-500 disabled:bg-green-500/50 w-1/2 block text-center hover:bg-green-700 text-white font-bold py-2 px-16 rounded my-4"
        >
          Submit
        </button>
      </div>
    </Form>
  );
};
export default OaKConsultancyFormFields;
