import { action, computed, thunk } from "easy-peasy"

export default {
  fetchOneChapter: thunk(
    async (actions, payload, { getState, getStoreState }) => {
      const chapterId = payload

      const { coords } = getStoreState().swiper
      const { userId } = getStoreState().auth
      const { chapters } = getStoreState().data

      const { d0, d1 } = coords.val

      const { data } = await ChapterService.GET_getChapter(0, userId)
      if (data.item.length === 0) return

      const targetIdx = data.item.findIndex(i => +i.id === +chapterId)
      const newChapter = data.item[targetIdx]
      console.log("\nnew chapter : ", newChapter)

      const origPos = chapters[d0][d1]
      console.log("found outdated chapter : ", origPos.deck)

      origPos.deck = newChapter
    },
  ),

  fetchOneUserChapter: thunk(
    async (actions, payload, { getState, getStoreState }) => {
      const chapterId = payload

      const { userId } = getStoreState().auth
      const { coords } = getStoreState().swiper
      const { chapters } = getStoreState().data

      const { d0, d1, d2 } = coords.val

      const fetchId = +chapters[d0][d1].deck.id
      const { data } = await ChapterService.GET_getChapter(fetchId, userId)
      if (data.item.length === 0) return

      const targetIdx = data.item.findIndex(i => +i.id === +chapterId)
      const newChapter = data.item[targetIdx]
      console.log("\nnew user chapter : ", newChapter)

      const origPos = chapters[d0][d1].child[d2]
      console.log("found outdated user chapter : ", origPos.deck)

      origPos.deck = newChapter
    },
  ),

  fetchOneNext: thunk(async (actions, payload, { getState, getStoreState }) => {
    const chapterId = payload

    const { userId } = getStoreState().auth
    const { coords } = getStoreState().swiper
    const { chapters } = getStoreState().data

    const { d0, d1, d2, d3 } = coords.val

    const fetchId = +chapters[d0][d1].child[d2].deck.id
    const { data } = await ChapterService.GET_getChapter(fetchId, userId)
    if (data.item.length === 0) return

    const targetIdx = data.item.findIndex(i => +i.id === +chapterId)
    const newChapter = data.item[targetIdx]
    console.log("\nnew chapter : ", newChapter)

    const origPos = state.chapters[d0][d1].child[d2].child[d3]
    console.log("found outdated chapter : ", origPos.deck)

    origPos.deck = newChapter
  }),
}

export const selectors = {}

export const actions = {
  fetchOneChapter: actions => actions.dataFetch.fetchOneChapter,
  fetchOneUserChapter: actions => actions.dataFetch.fetchOneUserChapter,
  fetchOneNext: actions => actions.dataFetch.fetchOneNext,
}
