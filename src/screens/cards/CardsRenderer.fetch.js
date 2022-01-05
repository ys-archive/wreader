import { useEffect } from "react";

import { useStoreActions } from "easy-peasy";
import { actData } from "../../store/actions";

import {
  useFetchD0,
  useFetchD1,
  useFetchD2,
  useFetchD3,
  useFetchD4,
  useFetchD5,
  useFetchD6,
  useFetchD7,
  useFetchD8,
  useFetchD9,
} from "../../hooks";

const initStates = () => {
  const updateHasNew = useStoreActions(actData.updateHasNew);

  return {
    updateHasNew,
  };
};

const FetchBeforeRender = () => {
  const { updateHasNew } = initStates();

  useEffect(() => {
    updateHasNew({ d0: true });
  }, []);

  useFetchD0();
  useFetchD1();
  useFetchD2();
  useFetchD3();
  useFetchD4();
  useFetchD5();
  useFetchD6();
  useFetchD7();
  useFetchD8();
  useFetchD9();
};

export default FetchBeforeRender;
