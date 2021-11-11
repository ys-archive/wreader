import React from "react"

import { useStoreState, useStoreActions } from "easy-peasy"
import { selData, selAuth, selSwiper } from "../../store/selectors"
import { actData, actSwiper } from "../../store/actions"

import ChapterService from "../../services/ChapterService"

const initStates = () => {
  // selectors
  const userId = useStoreState(selAuth.userId)

  const chapters = useStoreState(selData.chapters)
  const isLoaded = useStoreState(selData.isLoaded)
  const hasNew = useStoreState(selData.hasNew)

  const coords = useStoreState(selSwiper.coords)

  // actions
  // - data
  const addChapterChild = useStoreActions(actData.addChapterChild)
  const startLoading = useStoreActions(actData.startLoading)
  const finishLoading = useStoreActions(actData.finishLoading)
  const updateHasNew = useStoreActions(actData.updateHasNew)

  // - swiper
  const setMaxCoords = useStoreActions(actSwiper.setMaxCoords)

  return {
    userId,

    chapters,
    isLoaded,
    hasNew,

    coords,

    addChapterChild,

    startLoading,
    finishLoading,
    updateHasNew,

    setMaxCoords,
  }
}

export const useNextFetch = () => {
  const {
    userId,

    chapters,
    isLoaded,
    hasNew,

    coords,

    addChapterChild,

    startLoading,
    finishLoading,
    updateHasNew,

    setMaxCoords,
  } = initStates()

  React.useEffect(() => {
    (async function fetchNext() {
      if (!isLoaded.d2) return
      if (!hasNew.d3) return
      if (!chapters || chapters.length === 0) return

      console.log("[useNextFetch] fetching NEXT CHAPTERS")
      startLoading("d3")

      const target = chapters[coords.d0][coords.d1].child[coords.d2]

      const { data } = await ChapterService.GET_getChapter(
        +target.deck.id,
        +userId,
      )

      if (data.item.length === 1) {
        addChapterChild({ deck: data.item[0] })
      } else if (data.item.length >= 2) {
        data.item.forEach(data => {
          addChapterChild({ deck: data })
        })
      }

      // 로딩 끝
      updateHasNew({ d3: false })
      finishLoading("d3")
    })()
  }, [isLoaded.d2, hasNew.d3])

  React.useEffect(() => {
    if (!isLoaded.d3) return

    setMaxCoords({ d3: chapters })
  }, [isLoaded.d3])
}

// const fetchRecursively = async (arr, userId, addChapterChild) => {
//   await asyncForEach(arr, async item => {
//     const { data } = await ChapterService.GET_getChapter(
//       +item.deck.id,
//       +userId,
//     );

//     if (data.item.length === 1) {
//       addChapterChild({ deck: data.item[0] });
//     } else if (data.item.length >= 2) {
//       data.item.forEach(data => {
//         addChapterChild({ deck: data });
//       });
//     }
//   });
// };
