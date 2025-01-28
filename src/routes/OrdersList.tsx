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
import useFetch from "../hooks/useFetch";
import { useCallback } from "react";

const OrdersList: React.FC = () => {
  
  const fetchOrders = useCallback(() => {
    return orders_api.getOrders({
      page: 1,
      pageSize: 20,
      sortBy: "CreatedAt",
      descending: true,
    });
  }, []);
  const {
    data: ordersData,
    loading,
    error,
    refetch,
  } = useFetch<{ orders: DatabaseOrder[] }>(fetchOrders);
  const navigate = useNavigate();
  const handleRowClick = (orderId: number) => {
    console.log("Navigating to AdminOrderDetailsPage with orderId:", orderId);
    if (window.confirm("Do you want to view this user?")) {
      navigate(`/AdminOrderDetailsPage/${orderId}`);
    }
  };
  const handleUpdateClick = (id: number) => {
    navigate(`/Orders/${id}`);
  };
  const handleDeleteClick = async (orderId: number) => {
    try {
      await orders_api.deleteOrder(orderId);
      await showSuccessDialog("Order deleted successfully");
      // refetch();
    } catch (error) {
      console.error("Error deleting order:", error);
      showErrorDialog("Failed to delete order. Please try again.");
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!ordersData || ordersData.orders.length === 0) return <div>No orders found</div>;
  // if (loading) {
  //   return ordersData?.orders?.length === 0 ? (
  //     <div className="text-center">No orders found</div>
  //   ) : (
  //     <div className="flex items-center justify-center min-h-screen bg-gray-50">
  //       <div className="text-lg text-gray-700">Loading orders...</div>
  //     </div>
  //   );
  // }
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
            <th className="px-4 py-2">Update Button</th>
            <th className="px-4 py-2">Delete Button</th>
          </tr>
        </thead>
        <tbody>
            {ordersData.orders.map((order) => (
              <tr
                key={order.id}
                className="cursor-pointer hover:bg-gray-100 active:bg-gray-200 transition-all"
                 onClick={() => handleRowClick(order.id)}
              >
                <td className="px-4 py-2 text-center">{order.id}</td>
                <td className="px-4 py-2 text-center">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-center">
                  {order.userEmail || "No email available"}
                </td>
                <td className="px-4 py-2 text-center">{order.totalPrice}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleUpdateClick(order.id)}
                  >
                    Update
                  </button>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteClick(order.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default OrdersList;
