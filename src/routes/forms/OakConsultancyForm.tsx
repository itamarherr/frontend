import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Spinner from "../../Components/Spinner";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
// import { services_api } from "../../api/Products-api";
import { orders_api, OrderFormData } from "../../api/Orders-api";
// import { OrderFormData } from "../../api/Products-api";
import axios from "axios";

const OakConsultancyForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [totalPrice, setTotalPrice] = useState(0);
  // const { values, setFieldValue } = useFormikContext();
  const navigate = useNavigate();
  const showSuccessDialog = (message) => {
    alert(message);
    return Promise.resolve();
  };
  const calculateTotalPrice = (consultancyType, numberOfTrees, isPrivate) => {
    let basePrice = 1000;
    if (consultancyType === "BeforeConstruction") basePrice = basePrice;
    if (consultancyType === "Dislocations") basePrice = 1500;
    if (consultancyType === "TreesIllness") basePrice = 1800;

    let treeMultiplier = 1.0;
    if (numberOfTrees > 1 && numberOfTrees <= 5) treeMultiplier = 1.2;
    if (numberOfTrees > 5 && numberOfTrees <= 10) treeMultiplier = 1.3;
    if (numberOfTrees > 10) treeMultiplier = 1.5;

    const privateAreaMultiplier = isPrivate ? 1.0 : 1.2;

    return basePrice * treeMultiplier * privateAreaMultiplier;
  }

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
    setSubmitting(false);
    return;
  }
  let userId;
  try {
    const tokenParts = jwt.split(".");
    const payload = JSON.parse(window.atob(tokenParts[1].replace("-", "+").replace("_", "/")));
    userId = payload.userId;
    const requestData: OrderFormData = {
      id: 0,
      userId: userId,
      productId: values.productId,
      // imageUrl: "string",
      adminNotes: values.adminNotes,
      totalPrice: values.totalPrice,
      additionalNotes: values.additionalNotes,
      numberOfTrees: values.numberOfTrees,
      city: values.city,
      street: values.street,
      number: values.number,
      consultancyType: values.consultancyType,
      isPrivateArea: values.isPrivateArea,
      dateForConsultancy: values.dateForConsultancy,
      createdAt: new Date().toISOString(),
      userEmail: values.userEmail,
      statusType: values.statusType,
      serviceType: "Oak Consultancy",
    };

    await orders_api.createOrder(jwt, requestData);
    await showSuccessDialog(
      "Oke Consultancy order was created successfully"
    ).then(() => {
      navigate("/MyOrderPage");
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

const initialValues: OrderFormData = {
  productId: 1,
  // imageUrl: "https://picsum.photos/id/1/200/300", 
  adminNotes: "",
  totalPrice: 0,
  additionalNotes: "NotesTest",
  numberOfTrees: 1,
  city: "Unknown City",
  street: "Unknown Street",
  number: 1,
  consultancyType: 0,
  isPrivateArea: false,
  dateForConsultancy: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
  createdAt: new Date().toISOString(),
  // statusType: {value="pending"},
  statusType: 1,
  userEmail: "dror2@gmail.com",
  serviceType: "Test Service",
  id: 0,
  userId: ""
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


return (
  <Formik<OrderFormData>
    initialValues={initialValues}
    onSubmit={handleSubmit}
  // validationSchema={validationSchema}
  >
    {({ values, setFieldValue }) => {
        useEffect(() => {
          const price = calculateTotalPrice(values.consultancyType, values.numberOfTrees, values.isPrivateArea);
          setFieldValue("totalPrice", price);
        }, [values.consultancyType, values.numberOfTrees, values.isPrivateArea, setFieldValue]);
        return (
          <Form className="flex flex-col items-center ">
            <h1 className="font-bold text-4xl mb-6 mt-12 text-center">Order Oak Consultancy Form</h1>
            <h2 className="text-2xl mb-12 text-center">Fill out the form to order the Oak Consultancy</h2>

            {isLoading && <Spinner title="Processing..." />}
            {error && <p className="text-red-500">{error}</p>}

          <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
            {/* <label htmlFor="email">Email</label> */}
            <Field
              name="email"
              type="hidden"
              id="email"
              className="rounded-md hover:border-2 border-2 px-2 py-2"
            />
            <ErrorMessage name="email" component="div" className="text-red-500" />
          </div>

          {/* Product ID Hidden Field */}
          <div><Field type="hidden" name="productId" value={1} /></div>

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

          <div className="ffont-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
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
              className="bg-green-500 disabled:bg-green-500/50 w-1/2 block text-center hover:bg-green-700 text-white font-bold py-2 px-16 rounded my-4"
            >
              Submit 
            </button>
          </div>
        </Form>
    );
    }}
  </Formik>
);
};
export default OakConsultancyForm;
