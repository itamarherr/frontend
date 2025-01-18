import { useEffect, useState } from "react";
import { users_api } from "../api/Users-api";

const useFetch = <T = any>(apiCall: () => Promise<{ data: T }>) => {
 
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        const fetchData = async () => {
            try{
                setLoading(true);
                const response = await apiCall();
                console.log("Fetched data:", response.data);
                setData(response.data);
               setLoading(false);
        }
        catch(err: any) {
            setError(err?.response?.data?.message || err.message);
            setLoading(false);
        }
    };
    fetchData();
    }, [apiCall]);
    return {loading, data, error}
}

export default useFetch;