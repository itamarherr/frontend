import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Spinner from "../../Components/Spinner";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { orders_api, OrderFormData } from "../../api/Orders-api";
import axios from "axios";
import { calculateTotalPrice } from "../../utils/calculateTotalPrice";
import { showErrorDialog, showSuccessDialog } from "../../dialogs/dialogs";
import OaKConsultancyFormFields from "./OakConsultancyFormFields";

const OakConsultancyForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const handleSubmit = async (
    values: OrderFormData,
    { setSubmitting }: any
  ) => {
    setIsLoading(true);

    const jwt = localStorage.getItem("token");
    if (!jwt) {
      showErrorDialog("Authentication failed. Please log in again.");
      setIsLoading(false);
      setSubmitting(false);
      return;
    }
    let userId: string;

    try {
      const tokenParts = jwt.split(".");
      const base64Url = tokenParts[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(window.atob(base64));

      const USER_ID_CLAIM =
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
      userId = payload[USER_ID_CLAIM];
      if (!userId) {
        throw new Error("userId not found in JWT payload");
      }
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
      setError(error);
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
    dateForConsultancy: new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toISOString(),
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
      onSubmit={handleSubmit}
      // validationSchema={validationSchema}
    >
      {({ values, setFieldValue }) => (
        <OaKConsultancyFormFields
          isLoading={isLoading}
          error={error}
          values={values}
          setFieldValue={setFieldValue}
        />
      )}
    </Formik>
  );
};
export default OakConsultancyForm;
