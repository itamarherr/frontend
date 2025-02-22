import React, { useState, useEffect, useCallback } from "react";
import Spinner from "../Components/Spinner";
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

const OrdersList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
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
  } = useFetch<OrdersApiResponse>(fetchOrders);
  const navigate = useNavigate();

  const filteredOrders =
    ordersData?.orders.filter(
      (order) =>
        order.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.statusTypeString
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        order.consultancyTypeString
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        order.id.toString().includes(searchQuery) ||
        order.totalPrice.toString().includes(searchQuery) ||
        new Date(order.createdAt).toLocaleDateString().includes(searchQuery)
    ) || [];

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
      refetch();
    } catch (error) {
      console.error("Error deleting order:", error);
      showErrorDialog("Failed to delete order. Please try again.");
    }
  };

  // if (loading) return <div className="text-center">Loading orders...</div>;
  // if (error)
  //   return (
  //     <div className="text-center text-red-500 dark:text-red-400">
  //       Error: {error}
  //     </div>
  //   );
  // if (!ordersData || ordersData.orders.length === 0)
  //   return <div className="text-center">No orders found</div>;
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
    <div className="p-4 min-h-screen form-container">
      <h2 className="text-2xl font-bold mb-4">Order List</h2>

      <input
        type="text"
        placeholder="filter orders..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg dark:border-green-500"
      />
      {loading && <Spinner title="WaitUp!" />}
      {error && <div className="text-center text-red-500">Error</div>}
      {filteredOrders.length === 0 && (
        <div className="text-center">No matches found</div>
      )}

      {!loading && (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-green-700 dark:border-green-500">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-green-800">
                <th className="px-4 py-2 border">Order ID</th>
                <th className="px-4 py-2 border">Created Date</th>
                <th className="px-4 py-2 border">User Email</th>
                <th className="px-4 py-2 border">City</th>
                <th className="px-4 py-2 border">Status</th>{" "}
                <th className="px-4 py-2 border">Consultancy Type</th>{" "}
                <th className="px-4 py-2 border">Total Price</th>
                <th className="px-4 py-2 border">Update & Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="cursor-pointer hover:bg-gray-200 dark:hover:bg-green-700 transition-all"
                  onClick={() => handleRowClick(order.id)}
                >
                  <td className="px-4 py-2 text-center border">{order.id}</td>
                  <td className="px-4 py-2 text-center border">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-center border">
                    {order.userEmail}
                  </td>
                  <td className="px-4 py-2 text-center border">{order.city}</td>{" "}
               
                  <td className="px-4 py-2 text-center border">
                    {order.statusTypeString}
                  </td>{" "}
                
                  <td className="px-4 py-2 text-center border">
                    {order.consultancyTypeString}
                  </td>
                  <td className="px-4 py-2 text-center border">
                    {order.totalPrice}
                  </td>
                  <td className="px-4 py-2 text-center border">
                    <div className="flex gap-2 justify-center">
                      <button
                        className="bg-green-500 dark:bg-green-700 text-white px-3 py-1 rounded hover:bg-green-600 dark:hover:bg-green-800 transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateClick(order.id);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 dark:bg-red-700 text-white px-3 py-1 rounded hover:bg-red-600 dark:hover:bg-red-800 transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(order.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default OrdersList;
