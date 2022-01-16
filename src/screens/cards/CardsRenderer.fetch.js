import { useEffect } from "react";

import { useStoreActions } from "easy-peasy";
import { actDataFetch } from "../../store/actions";

const useFetchBeforeRender = () => {
  const fetchCategory = useStoreActions(actDataFetch.fetchCategory);

  useEffect(() => {
    console.log("start fetching!");
    fetchCategory();
  }, []);
};

export default useFetchBeforeRender;
