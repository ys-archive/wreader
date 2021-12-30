import useSWR from 'swr';
import axios from 'axios';
import { BASE_URL } from '@env';

export const useGetSWR = (path, param = undefined) => {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const fetcher = () =>
    axios
      .get(`${path}`, { ...param })
      .then(res => res.data)
      .catch(console.error);

  const { data, mutate, error } = useSWR(path, fetcher);
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
};
