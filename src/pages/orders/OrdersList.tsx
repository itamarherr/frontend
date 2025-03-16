import React, { useState, useEffect, useCallback } from "react";
import Spinner from "../../ui/Spinner";
import {
  orders_api,
  SearchOrderResponse,
  OrdersApiResponse,
} from "../../api/Orders-api";
import { useNavigate } from "react-router-dom";

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
  //
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  
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

 
  const handleResultClick = (orderId: number) => {
    navigate(`/AdminOrderDetailsPage/${orderId}`);
    setSearchQuery(""); // Clear input
    setSearchResults([]);
  };

  
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
