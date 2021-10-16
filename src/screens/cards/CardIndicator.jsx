import React, { useEffect } from "react"

import { useStoreState } from "easy-peasy"
import { selSwiper, selData } from "../../store/selectors"
import { DEPTH_NAME } from "../../store/reducers/swiper.depth"

import {
  renderWithDepth0,
  renderWithDepth1,
  renderWithDepth2,
  renderWithDepth3,
} from "./CardIndicator.render"
import { useForceUpdate } from "../../hooks/unused/useForceUpdate"

const initStates = () => {
  const coords = useStoreState(selSwiper.coords)
  const maxCoords = useStoreState(selSwiper.maxCoords)
  const depth = useStoreState(selSwiper.depth)
  const isSwiping = useStoreState(selSwiper.isSwiping)

  const chapters = useStoreState(selData.chapters)

  const isLoaded = useStoreState(selData.isLoaded)
  const hasNew = useStoreState(selData.hasNew)

  return {
    coords,
    maxCoords,
    depth,
    isSwiping,

    chapters,

    isLoaded,
    hasNew,
  }
}

const CardIndicator = ({ children }) => {
  const { coords, maxCoords, depth, isSwiping, chapters, isLoaded, hasNew } =
    initStates()

  let IndicatorJSX = null

  switch (depth) {
    case DEPTH_NAME.CATEGORY:
      IndicatorJSX = isLoaded.d1 && renderWithDepth0(coords, maxCoords)
      break

    case DEPTH_NAME.CHAPTER:
      IndicatorJSX =
        isLoaded.d2 && renderWithDepth1(coords, maxCoords, chapters)
      break

    case DEPTH_NAME.USER_CHAPTER:
      IndicatorJSX =
        isLoaded.d3 && renderWithDepth2(coords, maxCoords, chapters)
      break

    case DEPTH_NAME.NEXT:
      IndicatorJSX = renderWithDepth3(coords, maxCoords)
      break
  }

  return (
    <>
      {!isSwiping && IndicatorJSX}
      {children}
    </>
  )
}

export default CardIndicator
