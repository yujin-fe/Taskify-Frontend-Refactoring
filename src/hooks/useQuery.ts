import axios from 'axios';
import { useEffect, useState } from 'react';

interface UseQueryType<TData, TParams = object> {
  fetchFn: (params?: TParams) => Promise<TData>;
  params?: TParams;
}

const useQuery = <TData, TParams = object>({ fetchFn, params }: UseQueryType<TData, TParams>) => {
  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchFn(params);
        setData(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params]);

  return { data, isLoading, error };
};

export default useQuery;
