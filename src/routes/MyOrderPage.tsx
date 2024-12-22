import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { orders_api, DatabaseOrder, OrderResponse } from "../api/Orders-api";
import OrderDetails from "./OrderDetails";
import axios from "axios";

const isTokenExpired = (token) => {
  const { exp } = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
  return Date.now() >= exp * 1000; // Compare current time with exp
};
const MyOrderPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [myOrder, setMyOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrder = async () => {
      try {
        const jwt = localStorage.getItem("token");
        if (!jwt || isTokenExpired(jwt)) {
          return navigate("/login");
        }
        const response = await orders_api.getMyOrder(jwt);

        console.log(response.data);
        setMyOrder(response.data);
      } catch (err) {
        setError("Failed to fetch your last order. Please try again later.");
        if (
          axios.isAxiosError(err) &&
          (err.response?.status === 401 || err.response?.status === 404)
        ) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrder();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!myOrder) return <p>No order found</p>;
  return (

    <div>
      <h1 className="font-bold text-4xl mb-6 mt-12 text-center">Thanks for choosing our service</h1>
      <h2 className="font-bold text-3xl mb-6 mt-12 text-center">Your Order has been sent</h2>
    <div>
      
      <OrderDetails myOrder={myOrder} />
    </div>
    </div>

  );
};

export default MyOrderPage;
