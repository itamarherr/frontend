import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Spinner from "../../Components/Spinner";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { orders_api, OrderFormData } from "../../api/Orders-api";
import { calculateTotalPrice } from "../../utils/calculateTotalPrice";
import { showErrorDialog, showSuccessDialog } from "../../dialogs/dialogs";
import OaKConsultancyFormFields from "./OakConsultancyFormFields";
import useFetch from "../../hooks/useFetch";

const OakConsultancyForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const handleSubmit = async (
    values: OrderFormData,
    { setSubmitting }: any
  ) => {
    setIsLoading(true);

    let userId: string;

    try {
      const jwt = localStorage.getItem("token");
      if (!jwt) throw new Error("Authentication failed. Please log in again.");
  
      const tokenParts = jwt.split(".");
      const base64Url = tokenParts[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(window.atob(base64));
      
      const USER_ID_CLAIM = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
      const userId = payload[USER_ID_CLAIM];
  
      if (!userId) throw new Error("userId not found in JWT payload");
  
      const requestData: OrderFormData = {
        ...values,
        id: 0,  
        userId,  // Pass extracted userId
        createdAt: new Date().toISOString(),
        serviceType: "Oak Consultancy",
      };
  
      await orders_api.createOrder(requestData);
      await showSuccessDialog("Oak Consultancy order was created successfully.");
      navigate("/MyOrderPage");
  
    } catch (error) {
      console.error("Error while creating order:", error);
      showErrorDialog(error.message || "Failed to create Oak Consultancy order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
    const validationSchema = Yup.object({
      consultancyType: Yup.string()
        .required(" Consultancy type is required"),
        numberOfTrees: Yup.number()
        .required("Number of trees is required")
        .min(1, "Number of trees must contain at least 1")
        .max(30, "Number of trees cannot exceed 30 characters"),
        dateForConsultancy: Yup.date()
        .required("Date For Consultancy is required")
        .min(new Date(), "Date for consultancy must be in the future"),
        city: Yup.string()
        .required("city is required")
        .max(50, "city name cennot exceed 50 characters"),
        street: Yup.string()
        .required("Street name is required")
        .max(50, "Street name cennot exceed 50 characters"),
        number: Yup.number()
        .min(1, "Street number must be positive"),
    });

  const initialValues: OrderFormData = {
    productId: 1,
    userName:"",
    // imageUrl: "https://picsum.photos/id/1/200/300",
    adminNotes: "",
    totalPrice: 0,
    additionalNotes: "NotesTest",
    numberOfTrees: 1,
    city: "",
    street: "",
    number: 1,
    consultancyType: 0,
    isPrivateArea: false,
    dateForConsultancy: new Date(
      new Date().setDate(new Date().getDate() + 1)
    ),
    createdAt: new Date().toISOString(),
    // statusType: {value="pending"},
    statusType: 1,
    userEmail: "",
    serviceType: "Test Service",
    id: 0,
    userId: "0c95394c-6656-4f98-adc0-fd4d350701a1",
  };

  return (
    <Formik<OrderFormData>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <OaKConsultancyFormFields
          isLoading={isSubmitting}
          error={error}
          values={values}
          setFieldValue={(field, value) => {
            if (field === "dateForConsultancy") {
              setFieldValue(field, new Date(value));
            } else {
              setFieldValue(field, value);
            }
          }}
        />
      )}
    </Formik>
  );
};
export default OakConsultancyForm;
