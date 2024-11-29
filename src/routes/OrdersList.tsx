import React, { useState, useEffect } from "react";
import { orders_api, OrderData } from "../api/Orders-api";

const OrdersList: React.FC = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const jwt = localStorage.getItem("jwt") || "";
      const response = await orders_api.getOrders(jwt, {
        page: 1,
        pageSize: 10,
        sortBy: "createAt",
        descending: true,
      });
      console.log("Full Response:", response);
      console.log("Response Data:", response.data);
      console.log("Response Type:", typeof response.data);

      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      setError("Feild to fetch ordes");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  if (loading) {
    return <div>Loading orders...</div>;
  }
  if (error) {
    return <div>error: {error}</div>;
  }
  return (
    <div className="order-list-container">
      <h2>Order List</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>CreateAt</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>order.id</td>
              <td>order.userId</td>
              <td>{new Date(order.createAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default OrdersList;
