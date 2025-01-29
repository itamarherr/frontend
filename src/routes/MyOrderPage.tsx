import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { orders_api, DatabaseOrder, OrderResponse } from "../api/Orders-api";
import OrderDetails from "./OrderDetails";
import useFetch from "../hooks/useFetch";
import { showErrorDialog, showSuccessDialog } from "../dialogs/dialogs";

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

  // useEffect(() => {
  //   if(location.state?.refetch){
  //     refetch();
  //     navigate(".", { replace: true});
  //   }
  // }, [location.state, refetch, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!myOrder) return <p>No order found</p>;
  return (
    <div>
      <h1 className="font-bold text-4xl mb-6 mt-12 text-center">
        Thanks for choosing our service
      </h1>
      <h2 className="font-bold text-3xl mb-6 mt-12 text-center">
        Your Order has been sent
      </h2>
      <div>
        <OrderDetails myOrder={myOrder} />
      </div>
    </div>
  );
};

export default MyOrderPage;
