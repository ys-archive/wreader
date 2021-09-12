import { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { selData, selSwiper } from '../store/selectors';
import {
  useCategoriesFetch,
  useChaptersFetch,
  useUserChaptersFetch,
  useNextFetch,
} from '../hooks';
import { actData } from '../store/actions';

const initStates = () => {
  const updateHasNew = useStoreActions(actData.updateHasNew);

  return {
    updateHasNew,
  };
};

const FetchBeforeRender = () => {
  const { updateHasNew } = initStates();

  useEffect(() => {
    updateHasNew({ d1: true });
  }, []);

  useCategoriesFetch();
  useChaptersFetch();
  useUserChaptersFetch();
  useNextFetch();
};

export default FetchBeforeRender;
