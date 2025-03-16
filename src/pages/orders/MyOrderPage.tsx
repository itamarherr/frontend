import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { orders_api, DatabaseOrder, OrderResponse } from "../../api/Orders-api";
import OrderDetails from "./OrderDetails";
import useFetch from "../../hooks/useFetch";
import { showErrorDialog, showSuccessDialog } from "../../dialogs/dialogs";

const MyOrderPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fetchMyOrder = useCallback(async () => {
    const jwt = localStorage.getItem("token");
    if (!jwt) {
      showErrorDialog("Authentication failed. Please log in again.");
      navigate("/login");
      throw new Error("Authentication failed.");
    }
    return await orders_api.getMyOrder();
  }, [navigate]);

  const {
    data: myOrder,
    loading,
    error,
    refetch,
  } = useFetch<OrderResponse>(fetchMyOrder);
  useEffect(() => {
    refetch();
  }, [refetch]);


  if (loading) return <p>Loading...</p>;
  if (error || !myOrder || Array.isArray(myOrder)) {
    return (
      <div className="order-details-box text-center">
        <h2 className="text-2xl font-bold">
          You haven't placed any orders yet.
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Explore our services and place your first order.
        </p>
        <button onClick={() => navigate("/")} className="button mt-4">
          Go to Homepage
        </button>
      </div>
    );
  }


  const formattedOrder: OrderResponse = {
    ...myOrder,
    dateForConsultancy: myOrder.dateForConsultancy
      ? new Date(myOrder.dateForConsultancy).toISOString().split("T")[0]
      : "",
  };
  return (
    <div>
      <h1 className="font-bold text-4xl mb-6 mt-12 text-center">
        Thanks for choosing our service
      </h1>
      <h2 className="font-bold text-3xl mb-6 mt-12 text-center">
        Your Order has been sent
      </h2>
      <div>
        <OrderDetails myOrder={formattedOrder} />
      </div>
    </div>
  );
};

export default MyOrderPage;
