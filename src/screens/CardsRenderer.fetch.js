import { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { selData, selSwiper } from '../store/selectors';
import {
  useCategoriesFetch,
  useChaptersFetch,
  useUserChaptersFetch,
  useNextFetch,
  useFetchAll,
} from '../hooks';
import { actData } from '../store/actions';

const initStates = () => {
  const hasNew = useStoreState(selData.hasNew);
  const updateHasNew = useStoreActions(actData.updateHasNew);

  return {
    hasNew,
    updateHasNew,
  };
};

const FetchBeforeRender = () => {
  const { hasNew, updateHasNew } = initStates();

  useEffect(() => {
    updateHasNew({ d0: true });
    const timer = setTimeout(() => {
      updateHasNew({ d1: true });
      setTimeout(() => {
        updateHasNew({ d2: true });
      }, 500);
    }, 500);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  useCategoriesFetch();
  useChaptersFetch();
  useUserChaptersFetch();
  useNextFetch();

  useFetchAll();
};

export default FetchBeforeRender;
