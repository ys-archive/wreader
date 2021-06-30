import useSWR from 'swr';
import axios from 'axios';
import { BASE_URL } from '@env';

const fetcher = path => axios.get(`${BASE_URL}${path}`).then(res => res.data);

export const fetchAllComments = () => {
  const { data, error } = useSWR('', fetcher);
  return {
    data,
    isLoading: !error && !data,
    error,
  };
};
