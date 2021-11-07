import React, { useState } from "react"

import { useStoreActions } from "easy-peasy"
import { actSort, actSwiper } from "../../store/actions"

const initStates = () => {
  const sort = useStoreActions(actSort.sort)
  const moveToFirstInCurrentContext = useStoreActions(
    actSwiper.moveToFirstInCurrentContext,
  )

  return {
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

// switch (depth) {
//   case DEPTH_NAME.CHAPTER:
//     moveToFirstInCurrentContext()
//     sortChapters()
//     openSorterForSecs(2)
//     break

//   case DEPTH_NAME.USER_CHAPTER:
//     moveToFirstInCurrentContext()
//     sortUserChapters()
//     openSorterForSecs(2)
//     break

//   case DEPTH_NAME.NEXT:
//     moveToFirstInCurrentContext()
//     sortNext()
//     openSorterForSecs(2)
//     break

//   default:
//     console.log("You can't sort due to the depth!")
//     break
// }
