import { useEffect, useState } from "react";
import { users_api } from "../api/Users-api";

const useFetch = <T>(apiCall: () => Promise<T>) => {
 
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        apiCall()
          .then((res) => setData(res))  // Ensure it's res.data if needed
          .catch((err) => setError(err.message || "An error occurred"))
          .finally(() => setLoading(false));
      }, [apiCall]);
      return { 
        data,
        loading, 
        error, 
        refetch: async () => {
            setLoading(true);
            setError(null);
            try{
                const res = await apiCall();
                setData(res);
            }
            catch(err: any){
                setError(err.message || "An error occured");
            } finally{
                setLoading(false)
            }
        }
      };
    }
export default useFetch;