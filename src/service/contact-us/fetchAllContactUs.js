import useSWR from 'swr';
import axios from 'axios';
import { BASE_URL } from '@env';

import { useGetSWR } from '../../hooks/useGetSWR';

export const fetchAllContactUs = path => {
  const { data, isLoading, error, mutate } = useGetSWR(path);
  return { data, isLoading, error, mutate };
};
