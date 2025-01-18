import React, { useState, useEffect } from "react";
import {
  orders_api,
  DatabaseOrder,
  OrdersApiResponse,
} from "../api/Orders-api";
// import { handleUpdateClick, handleDeleteClick } from "../OrderDetails";
// import {handleDeleteClick, handleUpdateClick} from "./OrderDetails";
import { useNavigate } from "react-router-dom";
import { showErrorDialog, showSuccessDialog } from "../dialogs/dialogs";


const OrdersList: React.FC = () => {
  const [orders, setOrders] = useState<DatabaseOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const jwt = localStorage.getItem("token");
      console.log("jwt:", jwt);
      if (!jwt) {
        throw new Error("No JWT token found in localStorage.");
      }
      const response = await orders_api.getOrders(jwt, {
        page: 1,
        pageSize: 20,
        sortBy: "CreatedAt",
        descending: true,
      });
      console.log("Fetched orders:", response.data);

      setOrders(response.data.orders);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        console.error("Error fetching orders:", err.response.data); // Log full response
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
   
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg text-gray-700">Loading orders...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  const handleUpdateClick = (id: number) => {
   navigate(`/Orders/${id}`);
  };
  const handleDeleteClick = (orderId: number)=> {   
      const jwt = localStorage.getItem("token");
      if(!jwt){
       console.log("jwt not found")
       return;
     }
       orders_api.deleteOrder(jwt, orderId)
       .then (() =>{
        fetchOrders();
     })
     .catch((error) => {
       console.error("Error deleting order:", error);
       showErrorDialog("Failed to delete order");
     });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Order List</h2>
      <table className="table-auto w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Created Date</th>
            <th className="px-4 py-2">User Email</th>
            <th className="px-4 py-2">Total Price</th>
            <th className="px-4 py-2">Update Butoon</th>
            <th className="px-4 py-2">Delete Butoon</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orders) && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-2 text-center">{order.id}</td>
                <td className="px-4 py-2 text-center">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-center">
                  {order.userEmail || "No email available"}
                </td>
                <td className="px-4 py-2 text-center">{order.totalPrice}</td>
                <td className="px-4 py-2 text-center">
                  <button className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() =>handleUpdateClick(order.id)}
                  >
                    Update
                  </button>
                </td>
                <td className="px-4 py-2 text-center">
                  <button className="bg-red-500 text-white px-2 py-1 rounded"
                   onClick={() => handleDeleteClick(order.id)}
                  >
                    Delete
                  </button> 
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default OrdersList;
