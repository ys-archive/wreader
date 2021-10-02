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
    const timer1 = setTimeout(() => {
      updateHasNew({ d1: true });
      updateHasNew({ d2: true });
      updateHasNew({ d3: true });
    }, 2000);

    return () => {
      if (timer1) clearTimeout(timer1);
    };
  }, []);

  useCategoriesFetch();
  useChaptersFetch();
  useUserChaptersFetch();
  useNextFetch();
};

export default FetchBeforeRender;
