import { useState, useEffect, useCallback } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorDialog, showSuccessDialog } from "../../dialogs/dialogs";
import { string } from "yup";
import { Value } from "sass";
import { orders_api, OrderFormData } from "../../api/Orders-api";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import OaKConsultancyFormFields from "./OakConsultancyFormFields";
import useFetch from "../../hooks/useFetch";

const UpdateOrderForm = () => {
  const { id } = useParams<{ id: string }>();
  console.log(`extract id: " ${id}` )
  const navigate = useNavigate();
  const orderId = id ? parseInt(id, 10) : undefined;

  const fetchOrder = useCallback(async () => {
    console.log(`id: " ${orderId}${id}` )
    if (orderId) {
      if (isNaN(orderId)) {
        throw new Error("Order Id is missing");
      }
      return await orders_api.getOrderById(orderId);
    } else {
      return await orders_api.getMyOrderForUpdate();
    }
  }, [orderId, id]);

  const {
    data: orderFormData,
    loading,
    error,
  } = useFetch<OrderFormData>(fetchOrder);

  const handleSubmit = async (
    values: OrderFormData,
    { setSubmitting }: any
  ) => {
    try {
      console.log("Submitting order update:", values);
      let response;
      if (orderId) {
        response = await orders_api.updateOrder(values);
      } else {
        response = await orders_api.updateMyOrder(values);
      }
      console.log("Update response:", response);
      if (response === null) {
        throw new Error("Failed to update order, empty response.");
      }
      await showSuccessDialog("Order updated successfully.");

      if (orderId) {
        navigate(`/AdminOrderDetailsPage/${orderId}`, { state: { refetch: true } });
      } else {
        navigate("/MyOrderPage", { state: { refetch: true } });
      }
    } catch (error) {
      console.error("Error updating order:", error);
      showErrorDialog("Failed to update order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading order details...</div>;
  if (error)
    return <p className="text-red-500">Failed to load order: {error}</p>;
  if (!orderFormData) return <p>No order found.</p>;

  return (
    <Formik<OrderFormData>
      initialValues={orderFormData}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <OaKConsultancyFormFields
          isLoading={isSubmitting}
          error={error}
          values={values}
          setFieldValue={setFieldValue}
        />
      )}
    </Formik>
  );
};

export default UpdateOrderForm;
