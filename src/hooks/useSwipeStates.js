import { useStoreState, useStoreActions } from 'easy-peasy';
import { selData, selSwiper } from '../store/selectors';
import { actSwiper } from '../store/actions';

export const useSwipeStates = () => {
  const depth = useStoreState(selSwiper.depth);
  const categoryIdx = useStoreState(selSwiper.category);
  const coords = useStoreState(selSwiper.coords);
  const maxCoords = useStoreState(selSwiper.maxCoords);

  const isFirstCategory = useStoreState(selSwiper.isFirstCategory);
  const isLastCategory = useStoreState(selSwiper.isLastCategory);

  const setCategoryIdx = useStoreActions(actSwiper.setCategory);
  const increaseCategoryIdx = useStoreActions(actSwiper.increaseCategory);
  const decreaseCategoryIdx = useStoreActions(actSwiper.decreaseCategory);

  const setDepth = useStoreActions(actSwiper.setDepth);
  const increaseDepth = useStoreActions(actSwiper.increaseDepth);
  const decreaseDepth = useStoreActions(actSwiper.decreaseDepth);

  const setCoords = useStoreActions(actSwiper.setCoords);

  const setMaxCoords = useStoreActions(actSwiper.setMaxCoords);

  return {
    depth,
    categoryIdx,
    coords,
    maxCoords,

    isFirstCategory,
    isLastCategory,

    setCategoryIdx,
    increaseCategoryIdx,
    decreaseCategoryIdx,

    setDepth,
    increaseDepth,
    decreaseDepth,

    setCoords,
    setMaxCoords,
  };
};
