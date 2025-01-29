import React, { useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { orders_api } from "../api/Orders-api";
import  OrderDetails from  "./OrderDetails";
import useFetch from "../hooks/useFetch";
import { showErrorDialog, showSuccessDialog } from "../dialogs/dialogs";

const AdminOrderDetailsPage: React.FC = () => {
    const { id } = useParams();
    console.log("Order ID from useParams:", id);
    const navigate = useNavigate();
  const fetchOrderById = useCallback(async () =>{
    if(!id || isNaN(Number(id))) {
      throw new Error("Order ID is missing");
    } 
    return await orders_api.getOrderById(Number(id));
  }, [id]);
    const {
      data: order,
      loading,
      error,
      refetch,
    } = useFetch(fetchOrderById);
  
    useEffect(() => {
        if (!id || isNaN(Number(id))) {
          showErrorDialog("Invalid order ID.");
          navigate("/OrdersList");
          return;
        }
        refetch();
      }, [id, refetch]);
      
    // const handleDeleteClick = async () => {
    //   try {
    //     await orders_api.deleteOrder(Number(id));
    //     showSuccessDialog("Order deleted successfully.");
    //     navigate("/OrdersList");
    //   } catch (error) {
    //     console.error("Error deleting order", error);
    //     showErrorDialog("Failed to delete order. Please try again.");
    //   }
    // };
  
    useEffect(() => {
      refetch(); // Ensure fresh data when component mounts
    }, [refetch]);
  
    return (
      <div className="p-6 bg-white shadow-md rounded-lg">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {order ? (
          <>
            <OrderDetails myOrder={order} />
            {/* <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDeleteClick}
              >
                Delete Order
              </button>
            </div> */}
          </>
        ) : (
          <p>No order data found.</p>
        )}
      </div>
    );
  };
  
  export default AdminOrderDetailsPage;