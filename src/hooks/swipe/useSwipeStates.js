import { useStoreState, useStoreActions } from "easy-peasy";
import { selData, selSwiper } from "../../store/selectors";
import { actData, actSwiper } from "../../store/actions";

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
  // - data
  const updateHasNew = useStoreActions(actData.updateHasNew);

  // - swiper
  const increaseDepth = useStoreActions(actSwiper.increaseDepth);
  const decreaseDepth = useStoreActions(actSwiper.decreaseDepth);

  const increaseCoords = useStoreActions(actSwiper.increaseCoords);
  const decreaseCoords = useStoreActions(actSwiper.decreaseCoords);

  return {
    categories,
    chapters,
    isLoaded,
    hasNew,

    depth,
    coords,
    maxCoords,

    updateHasNew,

    increaseDepth,
    decreaseDepth,

    increaseCoords,
    decreaseCoords,
  };
};
