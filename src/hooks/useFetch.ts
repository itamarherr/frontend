import { useEffect, useState } from "react";
import { users_api } from "../api/Users-api";

const useFetch = (apiCall) => {
 
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        apiCall()
          .then((res) => setData(res))  // Ensure it's res.data if needed
          .catch((err) => setError(err))
          .finally(() => setLoading(false));
      }, []);
      return { data, loading, error, refetch: () => apiCall().then(setData).catch(setError) };
};
export default useFetch;