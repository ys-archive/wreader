import { useStoreState, useStoreActions } from "easy-peasy";
import { selAuth, selData, selSwiper } from "../../store/selectors";
import { actData, actSwiper } from "../../store/actions";

export const initStates = () => {
  // actions
  const userId = useStoreState(selAuth.userId);
  const hasNew = useStoreState(selData.hasNew);

  const isLoaded = useStoreState(selData.isLoaded);

  const coords = useStoreState(selSwiper.coords);

  // - data
  const resetCategory = useStoreActions(actData.resetCategory);
  const addCategory = useStoreActions(actData.addCategory);
  const startLoading = useStoreActions(actData.startLoading);
  const finishLoading = useStoreActions(actData.finishLoading);
  const updateHasNew = useStoreActions(actData.updateHasNew);

  // - swiper
  const setMaxCoords = useStoreActions(actSwiper.setMaxCoords);

  return {
    isLoaded,

    userId,
    hasNew,
    coords,

    resetCategory,

    addCategory,
    startLoading,
    finishLoading,
    updateHasNew,

    setMaxCoords,
  };
};
