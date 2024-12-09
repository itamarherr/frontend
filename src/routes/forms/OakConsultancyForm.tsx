import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Spinner from "../../Components/Spinner";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import { services_api } from "../../api/Products-api";
import { orders_api, OrderFormData } from "../../api/Orders-api";
// import { OrderFormData } from "../../api/Products-api";
import axios from "axios";

const OakConsultancyForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const showSuccessDialog = (message) => {
    alert(message);
    return Promise.resolve();
  };

  const showErrorDialog = (message) => {
    alert(message);
    return Promise.resolve();
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      showErrorDialog("Authentication failed. Please log in again.");
      setIsLoading(false);
      return;
    }
    let userId;
    try {
      const tokenParts = jwt.split(".");
      const base64Url = tokenParts[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      const payload = JSON.parse(window.atob(base64));
      userId = payload.userId;
      const requestData: OrderFormData = {
        id: values.id || 0,
        name: "Oak Consultancy",
        productId: values.productId,
        numberOfTrees: values.numberOfTrees,
        city: values.city,
        street: values.street,
        number: values.number,
        imageUrl: values.imageUrl || "",
        consultancyType: values.consultancyType,
        isPrivateArea: values.isPrivateArea,
        dateForConsultancy: values.dateForConsultancy,
        editing:  false,
        userId: values.userId,
        additionalNotes: values.additionalNotes || "",
        totalPrice: parseFloat(values.totalPrice),
        status: "pending", // Assuming a default status, can be updated later
        orderDate: new Date(),
      };

      await orders_api
        .createOrder(jwt, requestData)
          await showSuccessDialog("Forest survey order was created successfully").then(() => {
            navigate("/EcoConsultancyPage");
        });
       } catch(error) {
        console.error("Error while creating order:", error);
        showErrorDialog("Failed to create forest survey order. Please try again.");
        }finally {
          setIsLoading(false);
          setSubmitting(false);
        }
  };

  const initialValues = {
    name: "Oak Consultancy",
    numberOfTrees: 0,
    city: "",
    street: "",
    number: 0,
    imageUrl: "",
    consultancyType: "Before Construction",
    isPrivateArea: true,
    dateForConsultancy: new Date(),
    editing: true,
    totalPrice: 0,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    numberOfTrees: Yup.number()
      .required("Number of trees is required")
      .min(1, "At least one tree is required"),
    city: Yup.string().required("City is required"),
    street: Yup.string().required("Street is required"),
    number: Yup.number()
      .required("Street number is required")
      .min(1, "Street number must be positive"),
    imageUrl: Yup.string().url("Image URL must be a valid URL").optional(),
    consultancyType: Yup.string().optional(),
    isPrivateArea: Yup.boolean().required("Please specify if this is a private area"),
    dateForConsultancy: Yup.date()
      .required("Consultancy date is required")
      .min(new Date(), "Consultancy date cannot be in the past"),
    editing: Yup.boolean().required(),
    totalPrice: Yup.number()
      .required("Total price is required")
      .min(0, "Total price must be positive"),
    status: Yup.string()
      .oneOf(["Pending", "Completed"], "Status must be either Pending or Completed")
      .required("Order status is required"),
    orderDate: Yup.date()
      .required("Order date is required")
      .max(new Date(), "Order date cannot be in the future"),
    additionalNotes: Yup.string().optional(),
  });
  
  const CustomFileInput = ({ field, form, ...props }) => {
    const handleChange = (event) => {
      const file = event.currentTarget.files[0];
      form.setFieldValue(field.name, file);
    };

    return <input type="file" onChange={handleChange} {...props} />;
  };
  return (
    <Formik 
    initialValues={initialValues} 
    onSubmit={handleSubmit}
    validationSchema={validationSchema}
    >
      {({ values }) => (
        <>
          <h1 className="font-bold text-4xl mb-6 mt-12 text-center">
            Order oak Cosultancy Form
          </h1>
          <h2 className="text-2xl mb-12 text-center">
            {" "}
            fill the form to order the oke consultancy you wont
          </h2>
          <Form className="flex flex-col item-center">
            {isLoading && <Spinner title="Processing..." />}
            {error && <p className="test-red-500">{error}</p>}

            <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
              <label htmlFor="consultancyType">Consultancy Type</label>
              <Field
                name="consultancyType"
                as="select"
                id="consultancyType"
                CalssName="rounded-md hover:border-2 border-2 px-2 py-2"
              >
                <option value="">Select Consultancy Type</option>
                <option value="Before Construction">Before Construction</option>
                <option value="Dislocations">Dislocations</option>
                <option value="Trees Illness">Trees Illness</option>
              </Field>
              <ErrorMessage
                name="consultancyType"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
              <label htmlFor="numberOfTrees">Number Of Trees</label>
              <Field
                name="numberOfTrees"
                type="number"
                id="numberOfTrees"
                className="rounded-md hover:border-2 border-2 px-2 py-2"
              />
              <ErrorMessage
                name="numberOfTrees"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
              <div className="flex items-center">
                <Field
                  name="isPrivateArea"
                  type="checkbox"
                  id="isPrivateArea"
                  className="mr-2"
                />
                <label htmlFor="isPrivateArea">Is this Private Area?</label>
              </div>
              <ErrorMessage
                name="isPrivateArea"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
              <label htmlFor="imageUrl" className="block">
                Upload Image
              </label>
              <div className="flex items-center space-x-4">
                <Field
                  name="imageUrl"
                  type="file"
                  id="imageUrl"
                  accept="image/*"
                  className="block w-full text-sm text-slate-500
                file:mr-4 file:rounded-full file:border-0
                file:text-sm file:font-medium
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
                  component={CustomFileInput}
                />
              </div>
            </div>

            <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
              <label htmlFor="dateOfAffiliation">Date of Affiliation</label>
              <Field
                name="dateOfAffiliation"
                type="date"
                id="dateOfAffiliation"
                className="rounded-md hover:border-2 border-2 px-2 py-2"
              />
              <ErrorMessage
                name="dateOfAffiliation"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
              <div className="mb-2">
                <h3 className="text-xl font-semibold mb-2">
                  Consultancy Location Address
                </h3>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <label htmlFor="city" className="block text-sm mb-1">
                      City
                    </label>
                    <Field
                      name="city"
                      type="text"
                      id="city"
                      className="w-full rounded-md border-2 px-2 py-1"
                    />
                  </div>

                  <div className="flex-1">
                    <label htmlFor="street" className="block text-sm mb-1">
                      Street
                    </label>
                    <Field
                      name="street"
                      type="text"
                      id="street"
                      className="w-full rounded-md border-2 px-2 py-1"
                    />
                  </div>

                  <div className="flex-grow-0 w-1/4">
                    <label htmlFor="number" className="block text-sm mb-1">
                      Number
                    </label>
                    <Field
                      name="number"
                      type="number"
                      id="number"
                      className="w-full rounded-md border-2 px-2 py-1"
                    />
                  </div>
                </div>

                <div className="flex space-x-2 mt-1">
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-500 text-sm flex-1"
                  />
                  <ErrorMessage
                    name="street"
                    component="div"
                    className="text-red-500 text-sm flex-1"
                  />
                  <ErrorMessage
                    name="number"
                    component="div"
                    className="text-red-500 text-sm flex-grow-0 w-1/4"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                disabled={isLoading}
                type="submit"
                className="bg-green-500 disabled:bg-green-500/50 w-1/2 block text-center hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-4"
                onClick={() => console.log("Button clicked!")}>
                Submit Consultancy
              </button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};
export default OakConsultancyForm;
