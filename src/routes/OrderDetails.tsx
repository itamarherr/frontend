import React from "react";
import { orders_api, DatabaseOrder, OrderResponse } from "../api/Orders-api";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { showErrorDialog, showSuccessDialog } from "../dialogs/dialogs";

interface OrderDetailsProps {
  myOrder: OrderResponse;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ myOrder }) => {
  const navigate = useNavigate();

  const handleUpdateClick = () => {
    if (myOrder.id) {
      console.log(`User Order that the admin want to update: ${myOrder.id}`);
      navigate(`/Orders/${myOrder.id}`);
    } else {
      console.log("User updating their own order.");
      navigate("/my-orders/for-update");
    }
  };
  const handleDeleteClick = async () => {
    try {
      if (myOrder.id) {
        await orders_api.deleteOrder(myOrder.id);
      } else {
        await orders_api.deleteMyOrder();
      }
      await showSuccessDialog("Your order has been deleted successfully.");

      if (myOrder.id) {
        navigate("/OrdersList");
      } else {
        navigate("/");
      }
     
    } catch (error) {
      showErrorDialog("Failed to delete the order. Please try again.");
    }
  };

  return (
    <>
      {myOrder && (
        <div className="max-w-lg mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg mt-8">
          <h3 className="text-xl font-bold mb-4">Order Details</h3>
          <p className="mb-2">
            <strong>User name:</strong> {myOrder.userName}
          </p>
          <p className="mb-2">
            <strong>User Email:</strong> {myOrder.userEmail}
          </p>

          <p className="mb-2">
            <strong>serviceType:</strong> {myOrder.serviceType}
          </p>
          <p className="mb-2">
            <strong>Type Of Consultancy:</strong> {myOrder.consultancyType}
          </p>
          <p className="mb-2">
            <strong>Number of trees:</strong> {myOrder.numberOfTrees}
          </p>
          <p className="mb-2">
            <strong>isPrivateArea:</strong>{" "}
            {myOrder.isPrivateArea ? "Yes" : "No"}
          </p>

          <p className="mb-2">
            <strong>dateForConsultancy:</strong>
            {""}
            {new Date(myOrder.dateForConsultancy).toLocaleDateString()}
          </p>

          <p className="mb-2">
            <strong>Order Creat at:</strong>{" "}
            {new Date(myOrder.createdAt).toLocaleDateString()}
          </p>

          <p className="mb-2">
            <strong>status:</strong> {myOrder.statusType}
          </p>

          <div className="max-w-lg mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg mt-8">
            <h2 className="text-l font-bold">Consultancy location address:</h2>
            <p className="mb-2">
              <strong>city:</strong> {myOrder.city}
            </p>
            <p className="mb-2">
              <strong>street:</strong> {myOrder.street}
            </p>
            <p className="mb-2">
              <strong>number:</strong> {myOrder.number}
            </p>
          </div>
          <p className="mb-2">
            <strong>total price:</strong> {myOrder.totalPrice}
          </p>
          <div className="flex justify-end">
            <button
              onClick={handleUpdateClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-14"
            >
              Update Order
            </button>
            <button
              onClick={handleDeleteClick}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Delete Order
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
