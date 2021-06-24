import useSWRNative from '@nandorojo/swr-react-native';

const fetcher = (...args) => axios.get(...args);

export const useLogin = (email, password) => {
  const { data, mutate, error } = useSWRNative('' /* fetcher */);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
