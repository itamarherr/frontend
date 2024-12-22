import React from "react";
import { orders_api, DatabaseOrder, OrderResponse } from "../api/Orders-api";

interface OrderDetailsProps {
  myOrder:OrderResponse;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ myOrder }) => {
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
            <strong>Type Of Consultancy:</strong> {myOrder.consultancyTypeString}
          </p>
       
          <p className="mb-2">
            <strong>isPrivateArea:</strong> {myOrder.isPrivateArea? "Yes" : "No"}
          </p>
        
          {/* <p className="mb-2">
            <strong>Status:</strong> {myOrder.status}
          </p> */}
         
          <p className="mb-2">
            <strong>dateForConsultancy:</strong>{""}
            {new Date(myOrder.dateForConsultancy).toLocaleDateString()}
          </p>
          <p className="mb-2">
            <strong>Order Creat at:</strong>{" "}
            {new Date(myOrder.createdAt).toLocaleDateString()}
          </p>
          <p className="mb-2">
            <strong>status:</strong> {myOrder.statusTypeString}
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
         
          <div className="flex justify-end">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Edit Order
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
