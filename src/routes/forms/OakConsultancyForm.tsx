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
        userId: values.userId,
        productId: 1,
        // imageUrl: "string",
        adminNotes: "string",
        totalPrice: 1,
        additionalNotes: "string",
        numberOfTrees: values.numberOfTrees,
        city: values.city,
        street: values.street,
        number: values.number,
        consultancyType: values.consultancy,
        isPrivateArea: true,
        dateForConsultancy: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        userEmail: "Test",
        status: 1,
        serviceType: "Oak Consultancy",
      };

      await orders_api.createOrder(jwt, requestData);
      await showSuccessDialog(
        "Oke Consultancy order was created successfully"
      ).then(() => {
        navigate("/OakConsultancyPage");
      });
    } catch (error) {
      console.error("Error while creating order:", error);
      showErrorDialog(
        "Failed to create Oke Consultancy order. Please try again."
      );
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const initialValues = {
    userId: 1, 
  productId: 1, 
  // imageUrl: "https://picsum.photos/id/1/200/300", 
  adminNotes: "", 
  totalPrice: 0,
  additionalNotes: "NotesTest",
  numberOfTrees: 1,
  city: "Unknown City",
  street: "Unknown Street",
  number: 1, 
  consultancyType: 1,
  isPrivateArea: true,
  dateForConsultancy: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
  createdAt: new Date().toISOString(), 
  status: 1, 
  userEmail: "dror2@gmail.com",
  serviceType: "Test Service", 
  };

  // const validationSchema = Yup.object({
  //   userId: Yup.string().required("User ID is required"),
  //   productId: Yup.string().required("Product ID is required"),
  //   // imageUrl: Yup.string().url("Must be a valid URL").required("Image URL is required"),
  //   adminNotes: Yup.string().optional(), // New field
  //   totalPrice: Yup.number()
  //     .required("Total price is required")
  //     .min(0, "Total price must be positive"),
  //   additionalNotes: Yup.string().optional(),
  //   numberOfTrees: Yup.number()
  //     .required("Number of trees is required")
  //     .min(1, "At least one tree is required"),
  //   city: Yup.string().required("City is required"),
  //   street: Yup.string().required("Street is required"),
  //   number: Yup.string()
  //     .matches(/^\d+$/, "Street number must be numeric")
  //     .required("Street number is required"),
  //   consultancyType: Yup.number().required("Consultancy type is required"), // Numeric as backend expects
  //   isPrivateArea: Yup.boolean().required(
  //     "Please specify if this is a private area"
  //   ),
  //   dateForConsultancy: Yup.date()
  //     .required("Consultancy date is required")
  //     .min(new Date(), "Consultancy date cannot be in the past"),
  //     createdAt: Yup.date().required("Created date is required"),
  //     status: Yup.number()
  //     .oneOf([1, 2], "Invalid status")  // Assuming 1 = Pending, 2 = Completed
  //     .required("Status is required"),
  //   serviceType: Yup.string().required("Service type is required"), // New field
  // });

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
      // validationSchema={validationSchema}
    >
      {({ values, errors }) => (
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

              Email Field
        <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
          <label htmlFor="email">Email</label>
          <Field
            name="email"
            type="email"
            id="email"
            className="rounded-md hover:border-2 border-2 px-2 py-2"
          />
          <ErrorMessage name="email" component="div" className="text-red-500" />
        </div>

        {/* User ID Field */}
        <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
          <label htmlFor="userId">User ID</label>
          <Field
            name="userId"
            type="number"
            id="userId"
            className="rounded-md hover:border-2 border-2 px-2 py-2"
          />
          <ErrorMessage name="userId" component="div" className="text-red-500" />
        </div>

        {/* Product ID Hidden Field */}
        <div><Field type="hidden" name="productId" value={1} /></div>

            <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
              <label htmlFor="consultancyType">Consultancy Type</label>
              <Field
                name="consultancyType"
                as="select"
                id="consultancyType"
                CalssName="rounded-md hover:border-2 border-2 px-2 py-2"
              >
                <option value="">Select Consultancy Type</option>
                <option value="1">Before Construction</option>
                <option value="2">Dislocations</option>
                <option value="3">Trees Illness</option>
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
            {/* <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
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
            </div> */}
            <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
              <label htmlFor="dateForConsultancy">dateForConsultancy</label>
              <Field
                name="dateForConsultancy"
                type="date"
                id="dateForConsultancy"
                className="rounded-md hover:border-2 border-2 px-2 py-2"
              />
              <ErrorMessage
                name="dateForConsultancy"
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

              >
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
