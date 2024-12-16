import React from 'react'
import { orders_api,  DatabaseOrder } from "../api/Orders-api";

interface OrderDetailsProps {
  order: DatabaseOrder; 
}

const OrderDetails: React.FC<OrderDetailsProps> = ( { order}) => {
  return (
    <>
    {order && (
        <div className="max-w-lg mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg mt-8">
          <h3 className="text-xl font-bold mb-4">Order Details</h3>
          <p className="mb-2"><strong>Order ID:</strong> {order.id}</p>
          <p className="mb-2"><strong>User Email:</strong> {order.userEmail}</p>
          <p className="mb-2"><strong>Status:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
          <div className="flex justify-end">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Edit Order
            </button>
          </div>
        </div>
      )}
      </>
  )
}

export default OrderDetails;