import { useState, useEffect, useCallback } from "react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorDialog, showSuccessDialog } from "../../dialogs/dialogs";
import * as Yup from "yup";
import { Value } from "sass";
import { orders_api, OrderFormData } from "../../api/Orders-api";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import OaKConsultancyFormFields from "../../pages/forms/OakConsultancyFormFields";
import useFetch from "../../hooks/useFetch";

const UpdateOrderForm = () => {
  const { id } = useParams<{ id: string }>();
  console.log(`Extracted ID from useParams: ${id}`);
  const navigate = useNavigate();
  const orderId = id ? parseInt(id, 10) : undefined;
  console.log(`Parsed Order ID: ${orderId}`);
  
  
  const fetchOrder = useCallback(async () => {
    console.log(`id: " ${orderId}`);
    if (orderId) {
      if (isNaN(orderId)) {
        console.error(" Invalid Order ID, aborting fetch!");
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
    console.log(" Order Data Fetched:", orderFormData);  
    console.log(" Fetch Error:", error); 
  }, [orderFormData, error]);


      const handleSubmit = async (
        values: Partial<OrderFormDataWithFormattedDate>,
        { setSubmitting }: any
    ) => {
        try {
            console.log("Submitting order update:", values);

            const updatedValues: Partial<OrderFormData> = {
                userId: values.userId ?? "", 
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
                dateForConsultancy: new Date(new Date().setDate(new Date().getDate() + 1)),
                consultancyType: Number(values.consultancyType) || 1,  
                isPrivateArea: values.isPrivateArea ?? false,
                createdAt: new Date(values.createdAt || new Date()).toISOString(),
                statusType: Number(values.statusType) || 1,
                serviceType: values.serviceType ?? "Standard",
            };
    
            let response;
            if (orderId) { 
                const adminUpdateValues: OrderFormData = {
                    id: orderId, 
                    userId: updatedValues.userId, 
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
    
                console.log(" Sending Admin Update Request:", adminUpdateValues);
                response = await orders_api.updateOrder(adminUpdateValues);
            } else { 
                console.log(" Sending User Update Request:", updatedValues);
                response = await orders_api.updateMyOrder(updatedValues); 
            }
    
          
            if (response === undefined || response === null) {
                console.warn(" Warning: API returned an empty response. This might be expected.");
            }
            await showSuccessDialog("Order updated successfully.");

            // ✅ Navigate based on role
            navigate(orderId ? `/AdminOrderDetailsPage/${orderId}` : "/MyOrderPage", {
                state: { refetch: true },
            });
        } catch (error) {
            console.error(" Error updating order:", error);
            showErrorDialog("Failed to update order. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };
  
 
  const formattedOrderData: Partial<OrderFormDataWithFormattedDate> =
  !orderFormData || Array.isArray(orderFormData) 
    ? {} 
    : {
        ...orderFormData,
        
     
        dateForConsultancy:
          typeof orderFormData.dateForConsultancy === "string"
            ? orderFormData.dateForConsultancy
            : orderFormData.dateForConsultancy instanceof Date
            ? orderFormData.dateForConsultancy.toISOString().split("T")[0] 
            : "", // Default if missing


        createdAt:
          typeof orderFormData.createdAt === "string"
            ? orderFormData.createdAt 
            : orderFormData.createdAt
            ? new Date(orderFormData.createdAt).toISOString() 
            : new Date().toISOString(), 
      };

  const validationSchema = Yup.object({
    consultancyType: Yup.string()
    .required("Consultancy type is required")
    .oneOf(["BeforeConstruction", "Dislocations", "TreesIllness"], "Please select a valid consultancy type"),
    numberOfTrees: Yup.number()

      .min(1, "Number of trees must contain at least 1")
      .max(30, "Number of trees cannot exceed 30 characters"),
      dateForConsultancy: Yup.date()
      .required("Date For Consultancy is required")
      .min(new Date(), "Date for consultancy must be in the future"),
    city: Yup.string().max(50, "city name cennot exceed 50 characters").required("City name must be provided"),
    street: Yup.string().max(50, "Street name cennot exceed 50 characters").required("Street name must be provided"),
    number: Yup.number().min(1, "Street number must be positive").required("Street number must be provided"),
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
  onSubmit={handleSubmit} 
>
     {({ values, setFieldValue, isSubmitting }) => (
        <OaKConsultancyFormFields
          isLoading={isSubmitting}
          error={error || ""}
          values={values} 
          setFieldValue={setFieldValue}
        />
      )}
    </Formik>
  );
};

export default UpdateOrderForm;
