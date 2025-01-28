import { ErrorMessage } from 'formik';
import { useEffect, useState, useCallback } from "react";
import { users_api } from "../api/Users-api";

const useFetch = <T>(apiCall: () => Promise<T>) => {
 
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        let ismounted = true;

        const fetchData = async () => {
            setLoading(true);
            try{
                const response = await  apiCall();
                console.log("API Response:", response);
                if(ismounted){
                    setData(response);
                    setError(null);
                }
            }
            catch(err: any)
            {if(ismounted){
                console.error("API Error:", err);
                setError(err.message || "An error occured");
            }
                

            } finally{
                if(ismounted){
                    setLoading(false);
                }
            }
      };
      fetchData();

      return () => {
        ismounted = false;
      };
      }, [apiCall]);
      const refetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await apiCall();
          setData(response);
        } catch (err: any) {
          setError(err.message || "An error occurred");
        } finally {
          setLoading(false);
        }
      }, [apiCall]);
      return { data, loading, error, refetch };
    };
export default useFetch;