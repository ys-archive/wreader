import { useStoreState, useStoreActions } from "easy-peasy"
import { selData, selSwiper } from "../../store/selectors"
import { actData, actImage, actSwiper } from "../../store/actions"

export const useSwipeStates = () => {
  // selectors
  // - data
  const categories = useStoreState(selData.categories)
  const chapters = useStoreState(selData.chapters)
  const isLoaded = useStoreState(selData.isLoaded)
  const hasNew = useStoreState(selData.hasNew)

  // - swiper
  const depth = useStoreState(selSwiper.depth)
  const coords = useStoreState(selSwiper.coords)
  const maxCoords = useStoreState(selSwiper.maxCoords)

  // actions
  // - data
  const updateHasNew = useStoreActions(actData.updateHasNew)

  // - swiper
  const setDepth = useStoreActions(actSwiper.setDepth)
  const increaseDepth = useStoreActions(actSwiper.increaseDepth)
  const decreaseDepth = useStoreActions(actSwiper.decreaseDepth)

  const setCoords = useStoreActions(actSwiper.setCoords)
  const increaseCoords = useStoreActions(actSwiper.increaseCoords)
  const decreaseCoords = useStoreActions(actSwiper.decreaseCoords)

  const setMaxCoords = useStoreActions(actSwiper.setMaxCoords)

  // - image
  const resetCard = useStoreActions(actImage.resetCard)

  return {
    categories,
    chapters,
    isLoaded,
    hasNew,

    depth,
    coords,
    maxCoords,

    updateHasNew,

    setDepth,
    increaseDepth,
    decreaseDepth,

    setCoords,
    setMaxCoords,
    increaseCoords,
    decreaseCoords,

    resetCard,
  }
}
