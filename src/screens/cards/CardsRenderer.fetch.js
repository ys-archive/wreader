import { useEffect } from 'react';

import { useStoreActions } from 'easy-peasy';
import { actData } from '../../store/actions';

import {
  useCategoriesFetch,
  useChaptersFetch,
  useUserChaptersFetch,
  useNextFetch,
} from '../../hooks';

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
    updateHasNew({ d1: true });
    updateHasNew({ d2: true });
    updateHasNew({ d3: true });
    // const timer = setTimeout(() => {
    //   setTimeout(() => {
    //   }, 500);
    // }, 500);

    // return () => {
    //   if (timer) clearTimeout(timer);
    // };
  }, []);

  useCategoriesFetch();
  useChaptersFetch();
  useUserChaptersFetch();
  useNextFetch();
};

export default FetchBeforeRender;
