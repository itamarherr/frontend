import React, { useState, useEffect } from "react";
import { orders_api, DatabaseOrder } from "../api/Orders-api";



const OrdersList: React.FC = () => {
  const [orders, setOrders] = useState<DatabaseOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const jwt = localStorage.getItem("jwt") || "";
      const response = await orders_api.getOrders(jwt, {
        page: 1,
        pageSize: 20,
        sortBy: "CreatedAt",
        descending: true,
      });
      console.log("Fetched orders:", response.data);
 
      setOrders(response.data);
      setLoading(false); 
    } catch (err) {
      if (err.response) {
        console.error("Error fetching orders:", err.response.data);  // Log full response
      } else {
        console.error("Network or other error:", err);
      }
      setError("Feild to fetch ordres");
      setLoading(false);
    }
  };
  useEffect(() => {
    // This runs only once when the component mounts to fetch data
    const fetchData = async () => {
      await fetchOrders();
    };
    fetchData();
  }, []); 
  useEffect(() => {
    // This runs every time orders change, logging updated orders
    console.log("Updated orders:", orders);
  }, [orders]);

  if (loading) {
    return(
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg text-gray-700">Loading orders...</div>
      </div>
    )
  }
  if (error) {
    return(
    <div className="flex items-center justify-center min-h-screen bg-red-50">
    <div className="text-lg text-red-600">{error}</div>
  </div>
    )
  }
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Order List</h2>
      <table className="table-auto w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">CreatedAt</th>
          </tr>
        </thead>
        <tbody>
       
          {Array.isArray(orders) && orders.length > 0 ? (
          orders.map((order) => (
            <tr key={order.id}>
              <td className="px-4 py-2 text-center">{order.id}</td>
              <td className="px-4 py-2 text-center">{order.userEmail}</td>
              <td className="px-4 py-2 text-center">
                {new Date(order.createdAt).toLocaleDateString()}
                </td>
            </tr>
          ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center">No orders found</td>
              </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default OrdersList;
