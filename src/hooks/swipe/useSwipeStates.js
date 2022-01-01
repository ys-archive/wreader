import { useStoreState, useStoreActions } from "easy-peasy";
import { selData, selSwiper } from "../../store/selectors";
import { actImage, actSwiper } from "../../store/actions";

export const useSwipeStates = () => {
  // selectors
  // - data
  const categories = useStoreState(selData.categories);
  const chapters = useStoreState(selData.chapters);
  const isLoaded = useStoreState(selData.isLoaded);

  // - swiper
  const depth = useStoreState(selSwiper.depth);

  // actions

  // - swiper
  const setDepth = useStoreActions(actSwiper.setDepth);
  const increaseDepth = useStoreActions(actSwiper.increaseDepth);
  const decreaseDepth = useStoreActions(actSwiper.decreaseDepth);

  // - image
  const resetTempBlob = useStoreActions(actImage.resetTempBlob);
  const resetCard = useStoreActions(actImage.resetCard);

  return {
    categories,
    chapters,
    isLoaded,

    depth,

    setDepth,
    increaseDepth,
    decreaseDepth,

    resetTempBlob,
    resetCard,
  };
};
