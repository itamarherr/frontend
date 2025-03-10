import { useState, useEffect, useCallback } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorDialog, showSuccessDialog } from "../../dialogs/dialogs";
import * as Yup from "yup";
import { Value } from "sass";
import { orders_api, OrderFormData } from "../../api/Orders-api";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import OaKConsultancyFormFields from "./OakConsultancyFormFields";
import useFetch from "../../hooks/useFetch";

const UpdateOrderForm = () => {
  const { id } = useParams<{ id: string }>();
  console.log(`Extracted ID from useParams: ${id}`);
  const navigate = useNavigate();
  const orderId = id ? parseInt(id, 10) : undefined;
  console.log(`Parsed Order ID: ${orderId}`);
  
  
  const fetchOrder = useCallback(async () => {
    console.log(`📢 Fetching Order for ID: ${orderId}`);  // ✅ Check the ID
    console.log(`🛠 Calling API: ${orderId ? "getOrderById" : "getMyOrderForUpdate"}`);
    console.log(`id: " ${orderId}`);
    if (orderId) {
      if (isNaN(orderId)) {
        console.error("❌ Invalid Order ID, aborting fetch!");
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


  useEffect(() => {
    console.log("📝 Order Data Fetched:", orderFormData);  // ✅ Confirm data received
    console.log("❗ Fetch Error:", error); // ✅ If there's an error, log it
  }, [orderFormData, error]);

  
  
      const handleSubmit = async (
        values: Partial<OrderFormDataWithFormattedDate>,
        { setSubmitting }: any
    ) => {
        try {
            console.log("Submitting order update:", values);
    
            // ✅ Ensure required fields exist
            const updatedValues: Partial<OrderFormData> = {
                userId: values.userId ?? "", // ✅ Ensure userId is always a string
                productId: values.productId ?? 0,
                userName: values.userName ?? "",
                userEmail: values.userEmail ?? "",
                totalPrice: values.totalPrice ?? 0,
                numberOfTrees: values.numberOfTrees ?? 0,
                city: values.city ?? "",
                street: values.street ?? "",
                number: values.number ?? 0,
                additionalNotes: values.additionalNotes ?? "",
                adminNotes: values.adminNotes ?? "",
                dateForConsultancy: new Date(values.dateForConsultancy || new Date()), 
                consultancyType: Number(values.consultancyType) || 1,  
                isPrivateArea: values.isPrivateArea ?? false,
                createdAt: new Date(values.createdAt || new Date()).toISOString(),
                statusType: Number(values.statusType) || 1,
                serviceType: values.serviceType ?? "Standard",
            };
    
            let response;
            if (orderId) { // ✅ Admin updating a specific order
                const adminUpdateValues: OrderFormData = {
                    id: orderId, // ✅ Ensure ID is included
                    userId: updatedValues.userId, // ✅ Ensure userId is included
                    productId: updatedValues.productId ?? 0,
                    userName: updatedValues.userName ?? "",
                    userEmail: updatedValues.userEmail ?? "",
                    totalPrice: updatedValues.totalPrice ?? 0,
                    numberOfTrees: updatedValues.numberOfTrees ?? 0,
                    city: updatedValues.city ?? "",
                    street: updatedValues.street ?? "",
                    number: updatedValues.number ?? 0,
                    additionalNotes: updatedValues.additionalNotes ?? "",
                    adminNotes: updatedValues.adminNotes ?? "",
                    dateForConsultancy: updatedValues.dateForConsultancy,
                    consultancyType: updatedValues.consultancyType,
                    isPrivateArea: updatedValues.isPrivateArea,
                    createdAt: updatedValues.createdAt,
                    statusType: updatedValues.statusType,
                    serviceType: updatedValues.serviceType,
                };
    
                console.log("📢 Sending Admin Update Request:", adminUpdateValues);
                response = await orders_api.updateOrder(adminUpdateValues);
            } else { // ✅ Regular user updating their latest order
                console.log("📢 Sending User Update Request:", updatedValues);
                response = await orders_api.updateMyOrder(updatedValues); // ✅ No `id` sent
            }
    
            console.log("✅ API Response:", response);
    
            // ✅ Fix: Handle empty responses properly
            if (response === undefined || response === null) {
                console.warn("⚠️ Warning: API returned an empty response. This might be expected.");
            }
            await showSuccessDialog("Order updated successfully.");

            // ✅ Navigate based on role
            navigate(orderId ? `/AdminOrderDetailsPage/${orderId}` : "/MyOrderPage", {
                state: { refetch: true },
            });
        } catch (error) {
            console.error("❌ Error updating order:", error);
            showErrorDialog("Failed to update order. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };
  
 
  const formattedOrderData: Partial<OrderFormDataWithFormattedDate> =
  !orderFormData || Array.isArray(orderFormData) // ✅ Prevent array issues
    ? {} // ✅ If no data, return empty object
    : {
        ...orderFormData,
        
        // ✅ Fix: Check if it's already a string, otherwise convert it
        dateForConsultancy:
          typeof orderFormData.dateForConsultancy === "string"
            ? orderFormData.dateForConsultancy
            : orderFormData.dateForConsultancy instanceof Date
            ? orderFormData.dateForConsultancy.toISOString().split("T")[0] // ✅ Convert only if it's a Date
            : "", // Default if missing

        // ✅ Fix: Ensure `createdAt` stays a string
        createdAt:
          typeof orderFormData.createdAt === "string"
            ? orderFormData.createdAt // ✅ Already a string, keep it
            : orderFormData.createdAt
            ? new Date(orderFormData.createdAt).toISOString() // ✅ Convert if valid
            : new Date().toISOString(), // ✅ Default to current time if missing
      };

  const validationSchema = Yup.object({
    numberOfTrees: Yup.number()

      .min(1, "Number of trees must contain at least 1")
      .max(30, "Number of trees cannot exceed 30 characters"),
      dateForConsultancy: Yup.string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD expected)")
      .required("Date is required"),
    city: Yup.string().max(50, "city name cennot exceed 50 characters"),
    street: Yup.string().max(50, "Street name cennot exceed 50 characters"),
    number: Yup.number().min(1, "Street number must be positive"),
  });

  if (loading) return <div>Loading order details...</div>;
  if (error)
    return <p className="text-red-500">Failed to load order: {error}</p>;
  if (!orderFormData || Object.keys(orderFormData).length === 0) return <p>No order found.</p>;

  type OrderFormDataWithFormattedDate = Omit<OrderFormData, "dateForConsultancy"> & {
    dateForConsultancy: string; // Ensure it's always a string here
  };

  return (
    <Formik<Partial<OrderFormDataWithFormattedDate>>
  initialValues={formattedOrderData}
  validationSchema={validationSchema}
  enableReinitialize={true}
  onSubmit={handleSubmit} // ✅ Now TypeScript is happy!
>
     {({ values, setFieldValue, isSubmitting }) => (
        <OaKConsultancyFormFields
          isLoading={isSubmitting}
          error={error || ""}
          values={values} // ✅ Prevents type issues for now
          setFieldValue={setFieldValue}
        />
      )}
    </Formik>
  );
};

export default UpdateOrderForm;
