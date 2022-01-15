import { useStoreState, useStoreActions } from "easy-peasy";
import { selAuth, selData, selSwiper } from "../../store/selectors";
import { actData, actSwiper } from "../../store/actions";

export const initStates = () => {
  // selectors
  const categories = useStoreState(selData.categories);
  const chapters = useStoreState(selData.chapters);
  const userId = useStoreState(selAuth.userId);
  const hasNew = useStoreState(selData.hasNew);

  const isLoaded = useStoreState(selData.isLoaded);

  const coords = useStoreState(selSwiper.coords);

  // actions
  // - data
  const addChapter = useStoreActions(actData.addChapter);
  const addChapterChild = useStoreActions(actData.addChapterChild);
  const addCategory = useStoreActions(actData.addCategory);
  const startLoading = useStoreActions(actData.startLoading);
  const finishLoading = useStoreActions(actData.finishLoading);
  const updateHasNew = useStoreActions(actData.updateHasNew);

  // - swiper
  const setMaxCoords = useStoreActions(actSwiper.setMaxCoords);

  return {
    categories,
    chapters,

    isLoaded,

    userId,
    hasNew,
    coords,

    addCategory,
    addChapter,
    addChapterChild,

    startLoading,
    finishLoading,
    updateHasNew,

    setMaxCoords,
  };
};
