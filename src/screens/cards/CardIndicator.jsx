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
    case 0:
      IndicatorJSX = isLoaded.d1 && renderWithDepth0(coords, maxCoords)
      break

    case 1:
      IndicatorJSX =
        isLoaded.d2 && renderWithDepth1(coords, maxCoords, chapters)
      break

    case 2:
      IndicatorJSX =
        isLoaded.d3 && renderWithDepth2(coords, maxCoords, chapters)
      break

    case 3:
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
