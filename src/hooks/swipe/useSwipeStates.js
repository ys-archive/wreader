import { useStoreState, useStoreActions } from "easy-peasy";
import { selData, selSwiper } from "../../store/selectors";
import { actImage, actSwiper } from "../../store/actions";

export const useSwipeStates = () => {
  // selectors
  // - data
  const categories = useStoreState(selData.categories);
  const currentCategory = useStoreState(selData.currentCategory);
  const chapters = useStoreState(selData.chapters);
  const isLoaded = useStoreState(selData.isLoaded);

  // - swiper
  const depth = useStoreState(selSwiper.depth);

  // actions

  // - data
  const loadChaptersAsync = useStoreActions(actData.loadChaptersAsync);

  // - swipe
  const increasePos = useStoreActions(actSwiper.increasePos);
  const decreasePos = useStoreActions(actSwiper.decreasePos);

  const setDepth = useStoreActions(actSwiper.setDepth);

  const increaseDepth = useStoreActions(actSwiper.increaseDepth);
  const decreaseDepth = useStoreActions(actSwiper.decreaseDepth);

  const setCurPos = useStoreActions(actSwiper.setCurPos);

  // - image
  const resetTempBlob = useStoreActions(actImage.resetTempBlob);
  const resetCard = useStoreActions(actImage.resetCard);

  return {
    categories,
    currentCategory,
    chapters,
    isLoaded,

    depth,

    loadChaptersAsync,

    increasePos,
    decreasePos,

    setCurPos,
    
    setDepth,
    increaseDepth,
    decreaseDepth,

    resetTempBlob,
    resetCard,
  };
};
