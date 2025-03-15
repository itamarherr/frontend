import React, { useState, useEffect, useCallback } from "react";
import { users_api, UpdateUserData } from "../../api/Users-api";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { showErrorDialog, showSuccessDialog } from "../../dialogs/dialogs";
import { array } from "yup";
import { debounce } from "lodash";

const UsersList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  // const [filteredUsers, setFilteredUsers] = useState([]);
  // const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await users_api.getAllUsers();
        console.log("🔍 Users Data:", data);
        setUsers(data || []);
        // setSearchResults(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        // setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleSearchSubmit = async () => {
    if (!searchQuery.trim()) return; // Prevent empty queries

    setSearchLoading(true);
    setSearchError(null);
    try {
      const results = await users_api.searchUsers(searchQuery);
      setSearchResults(results || []);
      console.log(results);
      if (results.length === 1) {
        // If only one user found, navigate directly to their profile
        navigate(`/AdminUserProfilePage/${results[0].id}`);
      }
    } catch (error) {
      showErrorDialog("Error searching users.");
      console.error("Search API error:", error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };
  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchQuery(e.target.value);
  // };

  //   const filteredResults = users.filter((user) =>
  //     ["userName", "firstName", "lastName", "email", "phoneNumber"].some(
  //       (key) =>
  //         user[key as keyof UpdateUserData]
  //           ?.toLowerCase()
  //           .includes(query.toLowerCase())
  //     )
  //   );
  //   setSearchResults(filteredResults);
  // };

  // // Trigger API call when searchQuery updates
  // useEffect(() => {
  //   const search = async () => {
  //     if (!searchQuery.trim()) {
  //       setFilteredUsers(users); // Reset users when empty
  //       return;
  //     }
  //     try {
  //       const results = await users_api.searchUsers(searchQuery);
  //       setFilteredUsers(results);
  //     } catch (error) {
  //       showErrorDialog("Error searching users. Please try again.");
  //       console.error("Error searching users:", error);
  //     }
  //   };

  //   const debounceSearch = setTimeout(search, 500);
  //   return () => clearTimeout(debounceSearch);
  // }, [searchQuery, users]);

  // const applyFilter = (filterValue: string) => {
  //   setFilter(filterValue);

  //   let updatedUsers = users || [];

  //   if (filterValue) {
  //     updatedUsers = updatedUsers.filter(user =>
  //       user.role?.toLowerCase() === filterValue.toLowerCase()
  //     );
  //   }

  //   if (searchQuery.trim() !== "") {
  //     updatedUsers = updatedUsers.filter(user =>
  //       user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       user.email.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //   }

  //   setFilteredUsers(updatedUsers);
  // };

  // const handleRowClick = (userId: string) => {
  //   if (window.confirm("Do you want to view this user?")) {
  //     navigate(`/AdminUserProfilePage/${userId}`);
  //   }
  // };

  // if (loading) return <div className="text-center">Loading users...</div>;
  // if (error)
  //   return <div className="text-center text-red-500">Error: {error}</div>;
  // if (!filteredUsers || filteredUsers.length === 0)
  //   return <div className="text-center">No users found</div>;
  // console.log("🔍 Users State in Component:", users);
  // if (!users) return <div className="text-center">Loading...</div>; // Wait until users is set
  // if (users.length === 0)
  //   return <div className="text-center">No users found</div>;

  const handleResultClick = (userId: string) => {
    navigate(`/AdminUserProfilePage/${userId}`);
    setSearchQuery("");
    setSearchResults([]);
  };

  const filteredUsers =
  users?.filter(
    (user) =>
      (user.userName?.toLowerCase() ?? "").includes(
        filterQuery.toLowerCase()
      ) ||
      (user.email?.toLowerCase() ?? "").includes(filterQuery.toLowerCase()) ||
      (user.firstName?.toLowerCase() ?? "").includes(
        filterQuery.toLowerCase()
      ) ||
      (user.lastName?.toLowerCase() ?? "").includes(filterQuery.toLowerCase()) ||
      (user.phoneNumber?.toLowerCase() ?? "").includes(filterQuery.toLowerCase())
  ) || [];

  // const handleRowClick = (userId: string) => {
  //   if (window.confirm("Do you want to view this user?")) {
  //     navigate(`/AdminUserProfilePage/${userId}`);
  //   }
  // };

  return (
    <div className="p-6 min-h-screen form-container">
      <h1 className="text-2xl font-bold mb-6 text-center">UsersList</h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search for user profile..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-2 py-1"
        />
      </div>
      <button
        onClick={handleSearchSubmit}
        className="bg-blue-500 text-white px-4 py-2 ml-2"
      >
        Search
      </button>
      {/* <div className="flex justify-center mb-4">
        <select
          value={filter}
          onChange={(e) => applyFilter(e.target.value)}
          className="ml-4 border px-2 py-1"
        >
          <option value="">All Roles</option>
          <option value="admin">Admins</option>
          <option value="user">Regular Users</option>
          <option value="guest">Guest</option>
        </select>
      </div> */}

      {searchLoading && <p>Searching...</p>}
      {searchError && <p className="text-red-500">{searchError}</p>}
      {searchResults.length > 0 && (
        <div className="absolute w-full bg-white border rounded-lg shadow-lg">
          {searchResults.map((user) => (
            <div
              key={user.id}
              className="block p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => navigate(`/AdminUserProfilePage/${user.id}`)}
            >
              {user.userName} - {user.email}
            </div>
          ))}
        </div>
      )}

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Filter users..."
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      {loading ? (
        <p>Loading users...</p>
      ) : (
      <div className="overflow-x-auto shadow-lg rounded-lg border border-green-700 dark:border-green-500">
        <table className="w-full border-collapse bg-white dark:bg-green-950 text-gray-900 dark:text-green-100">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">UserName</th>
              <th className="px-4 py-2 border">FirstName</th>
              <th className="px-4 py-2 border">LastName</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">PhoneNumber</th>
              <th className="px-4 py-2 border">ImageUrl</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="cursor-pointer hover:bg-gray-200 dark:hover:bg-green-700 transition-all"
                onClick={() => handleResultClick(user.id!)}
              >
                <td className="px-4 py-2 text-center border">
                  {user.userName}
                </td>
                <td className="px-4 py-2 text-center border">
                  {user.firstName}
                </td>
                <td className="px-4 py-2 text-center border">
                  {user.lastName}
                </td>
                <td className="px-4 py-2 text-center border">
                  {user.email || "No email available"}
                </td>
                <td className="px-4 py-2 text-center border">
                  {user.phoneNumber}
                </td>
                <td className="px-4 py-2 text-center border">
                  {user.imageUrl ? (
                    <img
                      src={`https://localhost:7129${user.imageUrl}`}
                      alt={`${user.userName}'s profile`}
                      className="w-16 h-16 rounded-full object-cover border border-gray-300 dark:border-green-500"
                    />
                  ) : (
                    <span className="italic text-gray-500 dark:text-green-300">
                      No image
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
      {filteredUsers.length === 0 && !loading && (
        <div className="text-center">No users found</div>
      )}
    </div>
  );
};

export default UsersList;
