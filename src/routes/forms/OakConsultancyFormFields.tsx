import { Field, ErrorMessage, Form } from "formik";
import { useEffect } from "react";
import Spinner from "../../Components/Spinner";
import { calculateTotalPrice } from "../../utils/calculateTotalPrice";
import React from "react";
import { useFormikContext } from "formik";
import { OrderFormData } from "../../api/Orders-api";

interface OaKConsultancyFormFieldsProps {
  isLoading: boolean;
  error: string | null; // ✅ Allow null to prevent errors
  values: any; // ✅ Temporarily use `any` to prevent blocking progress
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}
const OaKConsultancyFormFields: React.FC<OaKConsultancyFormFieldsProps> = ({ 
  isLoading, error, values, setFieldValue 
}) => {
  useEffect(() => {
    const price = calculateTotalPrice(
      values.consultancyType,
      values.numberOfTrees,
      values.isPrivateArea
    );

    if (values.totalPrice !== price) {
      setFieldValue("totalPrice", price);
    }
  }, [
    values.consultancyType,
    values.numberOfTrees,
    values.isPrivateArea,
    setFieldValue,
  ]);
  return (
    <Form className="max-w-lg mx-auto p-6 rounded-lg shadow-lg mt-8 border">
      <h1 className="font-bold text-4xl mb-6 mt-12 text-center text-gray-800 dark:text-gray-100">
        Order Oak Consultancy Form
      </h1>
      <h2 className="text-xl mb-6 text-center text-gray-600 dark:text-gray-300">
        Fill out the form to order the Oak Consultancy
      </h2>

      {isLoading && <Spinner title="Processing..." />}
      {error && (
        <p className="text-red-500 dark:text-red-400 text-center font-semibold">
          {typeof error === "string" ? error : "An unexpected error occurred"}
        </p>
      )}


      <Field type="hidden" name="productId" value={1} />

      <div className="mb-5">
        <label htmlFor="consultancyType" className="block font-semibold mb-1">
          Consultancy Type
        </label>
        <Field as="select" name="consultancyType" className="input">
          <option value="">Select Consultancy Type</option>
          <option value="BeforeConstruction">Before Construction</option>
          <option value="Dislocations">Dislocations</option>
          <option value="TreesIllness">Trees Illness</option>
        </Field>
        <ErrorMessage
          name="consultancyType"
          component="div"
          className="text-red-500 dark:text-red-400 text-sm mt-1"
        />
      </div>

      <div className="mb-5">
        <label htmlFor="numberOfTrees" className="block font-semibold mb-1">
          Number of Trees
        </label>
        <Field type="number" name="numberOfTrees" className="input" />
        <ErrorMessage
          name="numberOfTrees"
          component="div"
          className="text-red-500 dark:text-red-400 text-sm mt-1"
        />
      </div>

      <div className="mb-5 flex items-center">
        <Field type="checkbox" name="isPrivateArea" />
        <label htmlFor="isPrivateArea" className="font-semibold">
          Is this a private area?
        </label>
        <ErrorMessage
          name="isPrivateArea"
          component="div"
          className="text-red-500 dark:text-red-400 text-sm ml-2"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="dateForConsultancy"
          className="block font-semibold mb-1"
        >
          Date for Consultancy
        </label>
        <Field
          type="date"
          name="dateForConsultancy"
          className="input"
          onChange={(e) => setFieldValue("dateForConsultancy", e.target.value)}
        />
        <ErrorMessage
          name="dateForConsultancy"
          component="div"
          className="text-red-500 dark:text-red-400 text-sm mt-1"
        />
      </div>

      <div className="mb-5">
        <label className="block font-semibold mb-1">Total Price</label>
        <Field type="number" name="totalPrice" className="input" readOnly />
      </div>
      <div className="mb-5">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">
          Consultancy Location Address
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className="block font-semibold mb-1">
              City
            </label>
            <Field name="city" type="text" id="city" className="input" />
          </div>
          <div className="flex-1">
            <label htmlFor="street" className="block font-semibold mb-1">
              Street
            </label>
            <Field name="street" type="text" id="street" className="input" />
          </div>
          <div className="w-1/4">
            <label htmlFor="number" className="block font-semibold mb-1">
              Number
            </label>
            <Field name="number" type="number" id="number" className="input" />
          </div>
          <div className="flex space-x-2 mt-1">
            <ErrorMessage
              name="city"
              component="div"
              className="text-red-500 dark:text-red-400 text-sm mt-1"
            />
            <ErrorMessage
              name="street"
              component="div"
              className="text-red-500 dark:text-red-400 text-sm mt-1"
            />
            <ErrorMessage
              name="number"
              component="div"
              className="text-red-500 dark:text-red-400 text-sm mt-1"
            />
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-md disabled:bg-green-500/50"
        >
          Submit
        </button>
      </div>
    </Form>
  );
};
export default OaKConsultancyFormFields;
