// import React, { useState, useEffect, useCallback } from "react";
// import Spinner from "../Components/Spinner";
// import {
//   orders_api, DatabaseOrder, SearchOrderResponse, OrdersApiResponse} from "../api/Orders-api";
// // import { handleUpdateClick, handleDeleteClick } from "../OrderDetails";
// // import {handleDeleteClick, handleUpdateClick} from "./OrderDetails";
// import { useNavigate } from "react-router-dom";
// import { showErrorDialog, showSuccessDialog } from "../dialogs/dialogs";
// import useFetch from "../hooks/useFetch";

// const OrdersList: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const[searchResults, setSearchResults] = useState<SearchOrderResponse[]>([]);
//   const[searchloading, setSearchLoading] = useState(false);
//   const[searchError, setSearchError] = useState<string | null>(null);
//   const [ordersData, setOrdersData] = useState<OrdersApiResponse | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const data = await orders_api.getOrders({
//           page: 1,
//           pageSize: 20,
//           sortBy: "CreatedAt",
//           descending: true,
//         });
//         setOrdersData(data);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   const handelSearchSubmit = async() => {
//   if(!searchQuery.trim()) return;
//   setSearchLoading(true);
//     setSearchError(null);
//     try {
//       const results = await orders_api.searchOrders(searchQuery); // 🔎 Call your API
//       setSearchResults(results);
//     } catch (err) {
//       console.error("Search error:", err);
//       setSearchError("Failed to fetch results.");
//       setSearchResults([]);
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   const handleResultClick = (orderId: number) => {
//     navigate(`/AdminOrderDetailsPage/${orderId}`);
//     setSearchQuery(""); // Clear input
//     setSearchResults([]);
//   };

//   const fetchOrders = useCallback(() => {
//     return orders_api.getOrders({
//       page: 1,
//       pageSize: 20,
//       sortBy: "CreatedAt",
//       descending: true,
//     });
//   }, []);
//   const {
//     data: ordersData,
//     loading,
//     error,
//     refetch,
//   } = useFetch<OrdersApiResponse>(fetchOrders);
//   const navigate = useNavigate();

//   const filteredOrders =
//     ordersData?.orders.filter(
//       (order) =>
//         order.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         order.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         order.statusTypeString
//           .toLowerCase()
//           .includes(searchQuery.toLowerCase()) ||
//         order.consultancyTypeString
//           .toLowerCase()
//           .includes(searchQuery.toLowerCase()) ||
//         order.id.toString().includes(searchQuery) ||
//         order.totalPrice.toString().includes(searchQuery) ||
//         new Date(order.createdAt).toLocaleDateString().includes(searchQuery)
//     ) || [];

//   const handleRowClick = (orderId: number) => {
//     console.log("Navigating to AdminOrderDetailsPage with orderId:", orderId);
//     if (window.confirm("Do you want to view this user?")) {
//       navigate(`/AdminOrderDetailsPage/${orderId}`);
//     }
//   };
//   const handleUpdateClick = (id: number) => {
//     navigate(`/Orders/${id}`);
//   };

//   const handleDeleteClick = async (orderId: number) => {
//     try {
//       await orders_api.deleteOrder(orderId);
//       await showSuccessDialog("Order deleted successfully");
//       refetch();
//     } catch (error) {
//       console.error("Error deleting order:", error);
//       showErrorDialog("Failed to delete order. Please try again.");
//     }
//   };

//   // if (loading) return <div className="text-center">Loading orders...</div>;
//   // if (error)
//   //   return (
//   //     <div className="text-center text-red-500 dark:text-red-400">
//   //       Error: {error}
//   //     </div>
//   //   );
//   // if (!ordersData || ordersData.orders.length === 0)
//   //   return <div className="text-center">No orders found</div>;
//   // if (loading) {
//   //   return ordersData?.orders?.length === 0 ? (
//   //     <div className="text-center">No orders found</div>
//   //   ) : (
//   //     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//   //       <div className="text-lg text-gray-700">Loading orders...</div>
//   //     </div>
//   //   );
//   // }
//   return (
//     <div className="p-4 min-h-screen form-container">
//       <h2 className="text-2xl font-bold mb-4">Order List</h2>
//        <div className="relative mb-4">
//         <input
//           type="text"
//           placeholder="Search orders by ID, Email, or City..."
//           value={searchQuery}
//           onChange={handleSearchChange}
//           className="w-full p-2 border rounded-lg dark:border-green-500"
//         />
//         <button
//           onClick={handleSearchSubmit}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-500 text-white rounded"
//         >
//           Search
//         </button>
//       </div>

//       {searchLoading && <p>Searching...</p>}
//       {searchError && <p className="text-red-500">{searchError}</p>}
//       {searchResults.length > 0 && (
//         <div className="absolute w-full bg-white dark:bg-green-900 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
//           {searchResults.map((order) => (
//             <div
//               key={order.id}
//               className="block p-2 hover:bg-gray-200 dark:hover:bg-green-700 cursor-pointer"
//               onClick={() => handleResultClick(order.id)}
//             >
//               Order #{order.id} - {order.userEmail} ({order.statusTypeString})
//             </div>
//           ))}
//         </div>
//       )}

//       <input
//         type="text"
//         placeholder="filter orders..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className="w-full p-2 mb-4 border rounded-lg dark:border-green-500"
//       />
//       {loading && <Spinner title="WaitUp!" />}
//       {error && <div className="text-center text-red-500">Error</div>}
//       {filteredOrders.length === 0 && (
//         <div className="text-center">No matches found</div>
//       )}

//       {!loading && (
//         <div className="overflow-x-auto shadow-lg rounded-lg border border-green-700 dark:border-green-500">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-200 dark:bg-green-800">
//                 <th className="px-4 py-2 border">Order ID</th>
//                 <th className="px-4 py-2 border">Created Date</th>
//                 <th className="px-4 py-2 border">User Email</th>
//                 <th className="px-4 py-2 border">City</th>
//                 <th className="px-4 py-2 border">Status</th>{" "}
//                 <th className="px-4 py-2 border">Consultancy Type</th>{" "}
//                 <th className="px-4 py-2 border">Total Price</th>
//                 <th className="px-4 py-2 border">Update & Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredOrders.map((order) => (
//                 <tr
//                   key={order.id}
//                   className="cursor-pointer hover:bg-gray-200 dark:hover:bg-green-700 transition-all"
//                   onClick={() => handleRowClick(order.id)}
//                 >
//                   <td className="px-4 py-2 text-center border">{order.id}</td>
//                   <td className="px-4 py-2 text-center border">
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="px-4 py-2 text-center border">
//                     {order.userEmail}
//                   </td>
//                   <td className="px-4 py-2 text-center border">{order.city}</td>{" "}

//                   <td className="px-4 py-2 text-center border">
//                     {order.statusTypeString}
//                   </td>{" "}

//                   <td className="px-4 py-2 text-center border">
//                     {order.consultancyTypeString}
//                   </td>
//                   <td className="px-4 py-2 text-center border">
//                     {order.totalPrice}
//                   </td>
//                   <td className="px-4 py-2 text-center border">
//                     <div className="flex gap-2 justify-center">
//                       <button
//                         className="bg-green-500 dark:bg-green-700 text-white px-3 py-1 rounded hover:bg-green-600 dark:hover:bg-green-800 transition"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleUpdateClick(order.id);
//                         }}
//                       >
//                         Update
//                       </button>
//                       <button
//                         className="bg-red-500 dark:bg-red-700 text-white px-3 py-1 rounded hover:bg-red-600 dark:hover:bg-red-800 transition"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleDeleteClick(order.id);
//                         }}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };
// export default OrdersList;
import React, { useState, useEffect, useCallback } from "react";
import Spinner from "../Components/Spinner";
import {
  orders_api,
  SearchOrderResponse,
  OrdersApiResponse,
} from "../api/Orders-api";
import { useNavigate } from "react-router-dom";
import { showErrorDialog, showSuccessDialog } from "../dialogs/dialogs";

const OrdersList: React.FC = () => {
  const [filterQuery, SetFilterQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchOrderResponse[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [ordersData, setOrdersData] = useState<OrdersApiResponse | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch all orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orders_api.getOrders({
          page,
          pageSize,
          sortBy: "CreatedAt",
          descending: true,
        });
        setOrdersData(data);
        setTotalPages(Math.ceil(data.totalItems / pageSize));
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  // 🔎 Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // 🔎 Fetch search results from API
  const handleSearchSubmit = async () => {
    if (!searchQuery.trim()) return; // Ignore empty search
    setSearchLoading(true);
    setSearchError(null);

    try {
      const results = await orders_api.searchOrders(searchQuery); // 🔎 API call
      setSearchResults(results);
    } catch (err) {
      console.error("Search error:", err);
      setSearchError("Failed to fetch results.");
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // 🔹 Navigate to Order Details Page
  const handleResultClick = (orderId: number) => {
    navigate(`/AdminOrderDetailsPage/${orderId}`);
    setSearchQuery(""); // Clear input
    setSearchResults([]);
  };

  // 🔍 Filter Orders Locally (For filtering after initial fetch)
  const filteredOrders =
    ordersData?.orders.filter(
      (order) =>
        order.userEmail.toLowerCase().includes(filterQuery.toLowerCase()) ||
        order.city.toLowerCase().includes(filterQuery.toLowerCase()) ||
        order.statusTypeString
          .toLowerCase()
          .includes(filterQuery.toLowerCase()) ||
        order.consultancyTypeString
          .toLowerCase()
          .includes(filterQuery.toLowerCase()) ||
        order.id.toString().includes(filterQuery) ||
        order.totalPrice.toString().includes(filterQuery) ||
        new Date(order.createdAt).toLocaleDateString().includes(filterQuery)
    ) || [];

  return (
    <div className="p-4 min-h-screen form-container">
      <h2 className="text-2xl font-bold mb-4">Order List</h2>

      {/* 🔎 Search Box (Fetch from API) */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search orders by ID, Email, or City..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded-lg dark:border-green-500"
        />
        <button
          onClick={handleSearchSubmit}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>

      {/* 🔎 Show Search Results */}
      {searchLoading && <p>Searching...</p>}
      {searchError && <p className="text-red-500">{searchError}</p>}
      {searchResults.length > 0 && (
        <div className="absolute w-full bg-white dark:bg-green-900 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
          {searchResults.map((order) => (
            <div
              key={order.id}
              className="block p-2 hover:bg-gray-200 dark:hover:bg-green-700 cursor-pointer"
              onClick={() => handleResultClick(order.id)}
            >
              Order #{order.id} - {order.userEmail} ({order.statusTypeString})
            </div>
          ))}
        </div>
      )}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Filter orders..."
          value={filterQuery}
          onChange={(e) => SetFilterQuery(e.target.value)}
          className="w-full p-2 border rounded-lg dark:border-green-500"
        />
      </div>
      {/* 📝 Display All Orders */}
      {loading ? (
        <Spinner title="Loading orders..." />
      ) : (
        <>
          <div className="overflow-x-auto shadow-lg rounded-lg border border-green-700 dark:border-green-500">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 dark:bg-green-800">
                  <th className="px-4 py-2 border">Order ID</th>
                  <th className="px-4 py-2 border">Created Date</th>
                  <th className="px-4 py-2 border">User Email</th>
                  <th className="px-4 py-2 border">City</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Consultancy Type</th>
                  <th className="px-4 py-2 border">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="cursor-pointer hover:bg-gray-200 dark:hover:bg-green-700 transition-all"
                    onClick={() => handleResultClick(order.id)}
                  >
                    <td className="px-4 py-2 text-center border">{order.id}</td>
                    <td className="px-4 py-2 text-center border">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-center border">
                      {order.userEmail}
                    </td>
                    <td className="px-4 py-2 text-center border">
                      {order.city}
                    </td>
                    <td className="px-4 py-2 text-center border">
                      {order.statusTypeString}
                    </td>
                    <td className="px-4 py-2 text-center border">
                      {order.consultancyTypeString}
                    </td>
                    <td className="px-4 py-2 text-center border">
                      {order.totalPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 mx-2 bg-gray-300 text-black rounded-lg"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              ⬅️ Previous
            </button>
            <span className="px-4 py-2">
              Page {page} of {totalPages}
            </span>
            <button
              className="px-4 py-2 mx-2 bg-gray-300 text-black rounded-lg"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next ➡️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersList;
