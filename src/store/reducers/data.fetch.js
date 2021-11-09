import { action, computed, thunk } from "easy-peasy"
import ChapterService from "../../services/ChapterService"

export default {
  fetchOneChapter: thunk(
    async (actions, payload, { getState, getStoreState, getStoreActions }) => {
      const chapterId = payload

      const { coords } = getStoreState().swiper
      const { userId } = getStoreState().auth
      const { chapters } = getStoreState().data

      const { d0, d1 } = coords.val

      const { data } = await ChapterService.GET_getChapter(0, userId)
      if (data.item.length === 0) return

      console.log(data.item)
      console.log("chapterId: ", chapterId)
      const targetIdx = data.item.findIndex(i => +i.id === +chapterId)
      const newChapter = data.item[targetIdx]
      console.log("\nnew chapter : ", newChapter)

      getStoreActions().data.fetchOneChapter_internal({
        d0,
        d1,
        newChapter,
      })
    },
  ),

  fetchOneUserChapter: thunk(
    async (actions, payload, { getState, getStoreState, getStoreActions }) => {
      const chapterId = payload

      const { userId } = getStoreState().auth
      const { coords } = getStoreState().swiper
      const { chapters } = getStoreState().data

      const { d0, d1, d2 } = coords.val

      const fetchId = +chapters[d0][d1].deck.id
      console.log("fetch with ", fetchId)
      const { data } = await ChapterService.GET_getChapter(fetchId, userId)
      if (data.item.length === 0) return

      console.log(data.item)
      console.log("chapterId: ", chapterId)
      const targetIdx = data.item.findIndex(i => +i.id === +chapterId)
      const newChapter = data.item[targetIdx]
      console.log("\nnew user chapter : ", newChapter)

      getStoreActions().data.fetchOneUserChapter_internal({
        d0,
        d1,
        d2,
        newChapter,
      })
    },
  ),

  fetchOneNext: thunk(
    async (actions, payload, { getState, getStoreState, getStoreActions }) => {
      const chapterId = payload

      const { userId } = getStoreState().auth
      const { coords } = getStoreState().swiper
      const { chapters } = getStoreState().data

      const { d0, d1, d2, d3 } = coords.val

      const fetchId = +chapters[d0][d1].child[d2].deck.id
      console.log("fetch with ", fetchId)
      const { data } = await ChapterService.GET_getChapter(fetchId, userId)
      if (data.item.length === 0) return

      console.log("chapterId: ", chapterId)
      const targetIdx = data.item.findIndex(i => +i.id === +chapterId)
      const newChapter = data.item[targetIdx]
      console.log("\nnew chapter : ", newChapter)

      getStoreActions().data.fetchOneNext_internal({
        d0,
        d1,
        d2,
        d3,
        newChapter,
      })
    },
  ),
}

export const selectors = {}

export const actions = {
  fetchOneChapter: actions => actions.dataFetch.fetchOneChapter,
  fetchOneUserChapter: actions => actions.dataFetch.fetchOneUserChapter,
  fetchOneNext: actions => actions.dataFetch.fetchOneNext,
}
