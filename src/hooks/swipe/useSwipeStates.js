import { useStoreState, useStoreActions } from 'easy-peasy';
import { selData, selSwiper } from '../store/selectors';
import { actSwiper } from '../store/actions';

export const useSwipeStates = () => {
  // selectors
  // - data
  const categories = useStoreState(selData.categories);
  const chapters = useStoreState(selData.chapters);
  const isLoaded = useStoreState(selData.isLoaded);

  // - swiper
  const depth = useStoreState(selSwiper.depth);
  const coords = useStoreState(selSwiper.coords);
  const maxCoords = useStoreState(selSwiper.maxCoords);

  // actions
  // - swiper
  const setDepth = useStoreActions(actSwiper.setDepth);
  const increaseDepth = useStoreActions(actSwiper.increaseDepth);
  const decreaseDepth = useStoreActions(actSwiper.decreaseDepth);

  const setCoords = useStoreActions(actSwiper.setCoords);
  const setMaxCoords = useStoreActions(actSwiper.setMaxCoords);
  const increaseCoords = useStoreActions(actSwiper.increaseCoords);
  const decreaseCoords = useStoreActions(actSwiper.decreaseCoords);

  return {
    categories,
    chapters,
    isLoaded,

    depth,
    coords,
    maxCoords,

    setDepth,
    increaseDepth,
    decreaseDepth,

    setCoords,
    setMaxCoords,
    increaseCoords,
    decreaseCoords,
  };
};
