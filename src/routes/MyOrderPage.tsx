import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { orders_api,  DatabaseOrder } from "../api/Orders-api";
import OrderDetails from "./OrderDetails";

const MyOrderPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [order, setOrder] = useState<DatabaseOrder | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const jwt = localStorage.getItem("jwt") || "";
      const response = await orders_api.getOrderById(jwt, 1);
      setOrder(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="font-bold text-4xl mb-12 mt-12 text-center">
        Thenks for your choose to use our service
      </h1>
      <h2 className="font-bold text-2xl mb-12 mt-12 text-center">
        Your Order has send
      </h2>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {order && <OrderDetails order={order} />}{" "}
        {/* Pass order to the OrderDetails component */}
      </div>
      {/* <button
        className="bg-green-500 
         text-white font-bold py-2 px-4 rounded 
         hover:bg-green-600 focus:outline-none focus:ring-2 
         focus:ring-green-500 focus:ring-opacity-50
         ml-20 mr-20 mb-11"
         onClick={handelClick}
         >
            WHTCH YOUR ORDER
    </button>
    <button
        className="bg-green-500 
         text-white font-bold py-2 px-4 rounded 
         hover:bg-green-600 focus:outline-none focus:ring-2 
         focus:ring-green-500 focus:ring-opacity-50
         ml-20 mr-20 mb-11"
         >
            UPDATE YOUR ORDER
    </button>
    <button
        className="bg-green-500 
         text-white font-bold py-2 px-4 rounded 
         hover:bg-green-600 focus:outline-none focus:ring-2 
         focus:ring-green-500 focus:ring-opacity-50
         ml-20 mr-20 mb-11"
         >
            DELETE YOUR ORDER
    </button>
*/}
    </>
  );
};

export default MyOrderPage;
