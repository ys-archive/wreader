import React, { useState } from "react"

import { useStoreState, useStoreActions } from "easy-peasy"
import { actSort, actSwiper } from "../../store/actions"
import { selData, selSwiper } from "../../store/selectors"

const initStates = () => {
  const chapters = useStoreState(selData.chapters)
  const categories = useStoreState(selData.categories)
  const coords = useStoreState(selSwiper.coords)
  const isLoaded = useStoreState(selData.isLoaded)

  const sort = useStoreActions(actSort.sort)
  const moveToFirstInCurrentContext = useStoreActions(
    actSwiper.moveToFirstInCurrentContext,
  )

  return {
    chapters,
    categories,
    coords,
    isLoaded,
    sort,
    moveToFirstInCurrentContext,
  }
}

export const useCardSorter = () => {
  const [isSorterOpen, setSorter] = useState(false)
  const { sort, moveToFirstInCurrentContext } = initStates()

  const openSorterForSecs = (duration = 2) => {
    setSorter(true)

    setTimeout(() => {
      setSorter(false)
    }, duration * 1000)
  }

  return {
    callback: () => {
      sort()
      moveToFirstInCurrentContext()
      openSorterForSecs(2)
    },
    isSorterOpen,
  }
}
