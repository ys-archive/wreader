import React from "react"
import { asyncForEach, delay } from "../../utils"

import { useStoreState, useStoreActions } from "easy-peasy"
import { selData, selAuth } from "../../store/selectors"
import { actData } from "../../store/actions"

import ChapterService from "../../services/ChapterService"

const initStates = () => {
  // selectors
  const categories = useStoreState(selData.categories)
  const isLoaded = useStoreState(selData.isLoaded)
  const hasNew = useStoreState(selData.hasNew)

  const userId = useStoreState(selAuth.userId)

  // actions
  // - data
  const addChapter = useStoreActions(actData.addChapter)

  const startLoading = useStoreActions(actData.startLoading)
  const finishLoading = useStoreActions(actData.finishLoading)

  const updateHasNew = useStoreActions(actData.updateHasNew)

  return {
    categories,
    isLoaded,
    hasNew,

    userId,
    addChapter,

    startLoading,
    finishLoading,

    updateHasNew,
  }
}

let chapters = undefined

export const useChaptersFetch = () => {
  const {
    categories,
    isLoaded,
    hasNew,
    userId,
    addChapter,
    startLoading,
    finishLoading,
    updateHasNew,
  } = initStates()

  React.useEffect(() => {
    ;(async function fetchChapters() {
      // 카테고리가 먼저 로드 되었어야 함
      if (!isLoaded.d0) return
      if (!hasNew.d1) return
      // if (!categories || categories.length === 0) return

      console.log("[useChaptersFetch] fetching CHAPTERS")

      // await delay(0.5)

      startLoading("d1")

      // resetChapter();
      updateHasNew({ d1: false })

      // 챕터 데이터 정제 및 저장
      // chapters = Object.values(categories)
      //   .map(i => i.chapter.sort((a, b) => +a.id - +b.id))
      //   .filter(i => i.length > 0)

      const { data } = await ChapterService.GET_getChapter(0, userId)

      if (data.item.length === 0) return

      // console.log('refined chapters --> ', chapters);

      // if (!chapters || chapters.length === 0) return

      // group_index 0 부터 저장
      // await asyncForEach(data, async deck => {
      //   if (deck.length === 0) return

      //   addChapter({ deck })
      // })

      data.item.forEach(item => {
        addChapter({ deck: item })
      })

      updateHasNew({ d1: false })
      finishLoading("d1")
    })()
  }, [hasNew.d1, isLoaded.d0, userId])

  // React.useEffect(() => {
  //   if (!isLoaded.d1) return
  // }, [isLoaded.d1, chapters])
}
