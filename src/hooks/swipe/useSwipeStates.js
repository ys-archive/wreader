import { useStoreState, useStoreActions } from "easy-peasy";
import { selData, selSwiper } from "../../store/selectors";
import { actData, actDataFetch, actSwiper } from "../../store/actions";

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
  const fetchChapterD1 = useStoreActions(actDataFetch.fetchChapterD1);
  const fetchChapterAfter = useStoreActions(actDataFetch.fetchChapterAfter);

  // - swiper
  const setMaxCoords = useStoreActions(actSwiper.setMaxCoords);
  const setMaxChapterFromCategory = useStoreActions(
    actSwiper.setMaxChapterFromCategory,
  );
  const increaseDepth = useStoreActions(actSwiper.increaseDepth);
  const decreaseDepth = useStoreActions(actSwiper.decreaseDepth);

  const increaseCoords = useStoreActions(actSwiper.increaseCoords);
  const decreaseCoords = useStoreActions(actSwiper.decreaseCoords);

  return {
    categories,
    chapters,
    isLoaded,

    depth,
    coords,
    maxCoords,

    fetchChapterD1,
    fetchChapterAfter,

    setMaxCoords,
    setMaxChapterFromCategory,

    increaseDepth,
    decreaseDepth,

    increaseCoords,
    decreaseCoords,
  };
};
