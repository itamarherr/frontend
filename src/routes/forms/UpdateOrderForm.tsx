import { useState, useEffect } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorDialog, showSuccessDialog } from "../../dialogs/dialogs";
import { string } from "yup";
import { Value } from "sass";
import { orders_api, OrderFormData } from "../../api/Orders-api";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import OaKConsultancyFormFields from "./OakConsultancyFormFields";

const UpdateOrderForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderFormData, setOrderFormData] = useState<OrderFormData | null>(
    null
  );
  const { id } = useParams<{ id: string }>();
  const orderId = id ? parseInt(id, 10) : undefined;
  const navigate = useNavigate();

  console.log("Order Form Data:", orderFormData);

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      const jwt = localStorage.getItem("token");

      if (!jwt) {
        showErrorDialog("Authentication failed");
        setError("Authentication failed");
        navigate("/login");
        return;
      }
      console.log("Order Form Data:", orderFormData);
      try {
        const response = orderId
        ? await orders_api.getOrderById(jwt, orderId)
        : await orders_api.getMyOrderForUpdate(jwt); 
          setOrderFormData(response.data);
        } catch (error) {
          console.error("Error fetching order:", error);
          setError(error);
          showErrorDialog("Failed to fetch order details");
          navigate("/MyOrderPage");
        } finally {
          setIsLoading(false);
        } 
      };
    fetchOrder();
  }, [navigate, orderId]);

  const handleSubmit = async (
    values: OrderFormData,
    { setSubmitting }: any
  ) => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      showErrorDialog("Authentication failed. Please log in again.");
      setError("Authentication failed");
      setIsLoading(false);
      setSubmitting(false);
      return;
    }

    try {

      if (orderId) {
         await orders_api.updateOrder(jwt, values);
      } else {
          await orders_api.updateMyOrder(jwt, values); 
      }
      
      await showSuccessDialog("Order updated successfully");
      if (orderId) {
        navigate("/OrdersList");
     } else {
      navigate("/MyOrderPage");
     }
     
    } catch (error) {
      console.error("Error updating order:", error);
      showErrorDialog("Failed to update order. Please try again.");
      setError("Failed to update order. Please try again.");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  // Wait until the order data is loaded to render the form
  if (!orderFormData) {
    return <div>Loading...</div>;
  }

  return (
    <Formik<OrderFormData>
      initialValues={orderFormData}
      onSubmit={handleSubmit}
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

export default UpdateOrderForm;
