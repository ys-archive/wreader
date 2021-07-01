import useSWR from 'swr';
import axios from 'axios';
import { BASE_URL } from '@env';

export const useGetSWR = path => {
  if (typeof fetcher !== 'function') {
    throw new Error('fetcher must be function');
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const fetcher = () => axios.get(`${BASE_URL}${path}`).then(res => res.data);

  const { data, mutate, error } = useSWR(path, fetcher);
  return {
    data,
    isLoading: !error && !data,
    error,
    mutate,
  };
};
