import { action, computed, thunk } from "easy-peasy"
import ChapterService from "../../services/ChapterService"
import * as _ from "lodash"
import { sorterByDate, sorterByLikeCount } from "./data.logic"

export default {
  categories: [],
  chapters: [],

  originalChapters: [],

  commentsUpdated: false,

  isChaptersSorted: false,
  isUserChaptersSorted: false,
  isNextSorted: false,

  updateComments: action(state => {
    state.commentsUpdated = !state.commentsUpdated
  }),

  isLoaded: {
    default: {
      d0: false,
      d1: false,
      d2: false,
      d3: false,
    },

    val: {
      d0: false,
      d1: false,
      d2: false,
      d3: false,
    },

    startLoading: action((state, payload) => {
      if ("d0" === payload) {
        state.val.d0 = false
        return
      }

      if ("d1" === payload) {
        state.val.d1 = false
        return
      }

      if ("d2" === payload) {
        state.val.d2 = false
        return
      }

      if ("d3" === payload) {
        state.val.d3 = false
        return
      }
    }),

    finishLoading: action((state, payload) => {
      if ("d0" === payload) {
        state.val.d0 = true
        return
      }

      if ("d1" === payload) {
        state.val.d1 = true
        return
      }

      if ("d2" === payload) {
        state.val.d2 = true
        return
      }

      if ("d3" === payload) {
        state.val.d3 = true
        return
      }
    }),
  },

  hasNew: {
    default: {
      d0: false,
      d1: false,
      d2: false,
      d3: false,
    },

    val: {
      d0: false,
      d1: false,
      d2: false,
      d3: false,
    },

    update: action((state, payload) => {
      if ("d0" in payload) {
        state.val.d0 = payload.d0
        return
      }

      if ("d1" in payload) {
        state.val.d1 = payload.d1
        return
      }

      if ("d2" in payload) {
        state.val.d2 = payload.d2
        return
      }

      if ("d3" in payload) {
        state.val.d3 = payload.d3
        return
      }
    }),
  },

  isUpdatingAll: false,

  setUpdateAll: action((state, payload) => {
    state.isUpdatingAll = payload
  }),

  reset: action(state => {
    state.categories = []
    state.chapters = []
    state.originalChapters = []
    state.isLoaded.val = state.isLoaded.default
    state.hasNew.val = state.hasNew.default
    state.isUpdatingAll = false
  }),

  resetCategory: action(state => {
    state.categories = []
  }),

  addCategory: action((state, payload) => {
    const hasFound = state.categories.findIndex(cat => _.isEqual(cat, payload))
    if (hasFound === -1) {
      state.categories.push(payload)
    }
  }),

  // addCategory: thunk(async (actions, payload, { getState, getStoreState }) => {
  //   actions.addCategory_intenal(payload);
  //   const { setMaxCoords } = getStoreState().swiper;
  //   setMaxCoords
  // }),

  resetChapter: action((state, payload) => {
    state.chapters = []
    state.originalChapters = []
  }),

  addChapter: action((state, payload) => {
    const hasFound = state.chapters.findIndex(ch =>
      _.isEqual(ch.deck, payload.deck),
    )

    if (hasFound === -1) {
      state.chapters.push(
        payload.deck.map(d => ({
          deck: d,
          child: [],
        })),
      )
      state.originalChapters = state.chapters
    }
  }),

  addChapterChild: action((state, payload) => {
    // 아무 부모 챕터 하나라도 있어야함
    if (state.chapters.length === 0) return

    // 비교용 index 찾아오기
    const comparer = +payload.deck.group_index

    // undefined
    if (!comparer) return

    const findRecursively = arr => {
      arr.forEach(item => {
        if (+item.deck.id === comparer) {
          if (
            item.child.findIndex(f => _.isEqual(f.deck, payload.deck)) === -1
          ) {
            item.child.push({ deck: payload.deck, child: [] })
          }
          return
        }

        if (item.child.length > 0) {
          findRecursively(item.child)
        }
      })
    }

    state.chapters.forEach(chapter => {
      if (chapter.length === 0) return
      findRecursively(chapter)
    })

    state.originalChapters = state.chapters
  }),

  fetchOneChapter: thunk(
    async (actions, payload, { getState, getStoreState }) => {
      const chapterId = payload
      const { coords } = getStoreState().swiper
      const { d0, d1 } = coords.val
      const { userId } = getStoreState().auth

      const { data } = await ChapterService.GET_getChapter(0, userId)
      if (data.item.length === 0) return

      const targetIdx = data.item.findIndex(i => +i.id === +chapterId)
      const newChapter = data.item[targetIdx]

      actions.updateNewChapter({ d0, d1, newChapter })
    },
  ),

  updateNewChapter: action((state, payload) => {
    const { d0, d1, newChapter } = payload

    console.log("\nnew chapter : ", newChapter)
    console.log("found outdated chapter : ", state.chapters[d0][d1].deck)

    state.chapters[d0][d1].deck = newChapter
  }),

  fetchOneUserChapter: thunk(
    async (actions, payload, { getState, getStoreState }) => {
      const { userId } = getStoreState().auth
      const { coords } = getStoreState().swiper
      const { chapters, isUserChaptersSorted } = getState()

      const { d0, d1, d2 } = coords.val
      // console.log(`Fetch One User Chapter id: ${chapters[d0][d1].deck.id}`);
      const { data } = await ChapterService.GET_getChapter(
        chapters[d0][d1].deck.id,
        userId,
      )

      if (data.item.length === 0) return

      let filteredData = data.item.filter(i => +i.categoryId - 5 === d0)

      if (!isUserChaptersSorted) {
        filteredData = filteredData.sort(sorterFetchByDate)
      } else {
        filteredData = filteredData.sort(sorterFetchByLikeCount)
      }

      const newUserChapter = filteredData[d2]

      actions.updateUserChapter({
        d0,
        d1,
        newUserChapter,
      })
    },
  ),

  updateUserChapter: action((state, payload) => {
    const { d0, d1, newUserChapter } = payload

    const origPos = state.chapters[d0][d1].child.findIndex(
      chapter => +chapter.deck.id === newUserChapter.id,
    )

    console.log("\nnew user chapter : ", newUserChapter)
    console.log(
      "found outdated user chapter : ",
      state.chapters[d0][d1].child[origPos].deck,
    )

    state.chapters[d0][d1].child[origPos].deck = newUserChapter
  }),

  fetchOneNext: thunk(async (actions, payload, { getState, getStoreState }) => {
    const { userId } = getStoreState().auth
    const { coords } = getStoreState().swiper
    const { chapters, isNextSorted } = getState()

    const { d0, d1, d2, d3 } = coords.val
    const { data } = await ChapterService.GET_getChapter(
      chapters[d0][d1].child[d2].deck.id,
      userId,
    )

    if (data.item.length === 0) return

    let filteredData = data.item.filter(i => +i.categoryId - 5 === d0)
    if (!isNextSorted) {
      filteredData = filteredData.sort(sorterFetchByDate)
    } else {
      filteredData = filteredData.sort(sorterFetchByLikeCount)
    }
    const newNext = filteredData[d3]

    actions.updateNext({ d0, d1, d2, d3, newNext })
  }),

  updateNext: action((state, payload) => {
    const { d0, d1, d2, newNext } = payload

    const origPos = state.chapters[d0][d1].child[d2].child.findIndex(
      chapter => +chapter.deck.id === newNext.id,
    )

    console.log("\nnew chapter : ", newNext)
    console.log(
      "found outdated chapter : ",
      state.chapters[d0][d1].child[d2].child[origPos].deck,
    )

    state.chapters[d0][d1].child[d2].child[origPos].deck = newNext
  }),

  sortChapters_internal: action((state, payload) => {
    const { d0, d1, d2 } = payload
    let sorted = undefined

    if (!state.isChaptersSorted) {
      sorted = state.chapters[d0].sort(sorterByDate)
    } else {
      // sorted = state.originalChapters.slice()[d0]
      sorted = state.chapters[d0].sort(sorterByLikeCount)
    }

    state.chapters[d0] = sorted

    state.isChaptersSorted = !state.isChaptersSorted
  }),

  sortChapters: thunk((actions, payload, { getState, getStoreState }) => {
    const { coords } = getStoreState().swiper
    const { d0, d1, d2 } = coords.val
    actions.sortChapters_internal({ d0, d1, d2 })
  }),

  sortUserChapter_internal: action((state, payload) => {
    const { d0, d1 } = payload
    let sorted = undefined

    if (!state.isUserChaptersSorted) {
      // 업데이트 날짜로 정렬
      sorted = state.chapters[d0][d1].child.sort(sorterByDate)
    } else {
      // like count 로 정렬
      sorted = state.chapters[d0][d1].child.sort(sorterByLikeCount)
      // sorted = state.originalChapters.slice()[d0][d1].child
    }

    // console.log(sorted);
    state.chapters[d0][d1].child = null
    state.chapters[d0][d1].child = sorted

    state.isUserChaptersSorted = !state.isUserChaptersSorted
  }),

  sortUserChapters: thunk((actions, payload, { getState, getStoreState }) => {
    const { coords } = getStoreState().swiper
    const { d0, d1, d2 } = coords.val
    actions.sortUserChapter_internal({ d0, d1, d2 })
  }),

  sortNext_internal: action((state, payload) => {
    const { d0, d1, d2 } = payload
    let sorted = undefined

    if (!state.isNextSorted) {
      sorted = state.chapters[d0][d1].child[d2].child.sort(sorterByDate)
    } else {
      // sorted = state.originalChapters.slice()[d0][d1].child[d2].child
      sorted = state.chapters[d0][d1].child[d2].child.sort(sorterByLikeCount)
    }

    state.chapters[d0][d1].child[d2].child = sorted

    state.isNextSorted = !state.isNextSorted
  }),

  sortNext: thunk((actions, payload, { getState, getStoreState }) => {
    const { coords } = getStoreState().swiper
    actions.sortNext_internal(coords.val)
  }),
}

export const selectors = {
  categories: state => state.data.categories,
  chapters: state => state.data.chapters,

  commentsUpdated: state => state.data.commentsUpdated,

  isChaptersSorted: state => state.data.isChaptersSorted,
  isUserChaptersSorted: state => state.data.isUserChaptersSorted,
  isNextSorted: state => state.data.isNextSorted,

  isLoaded: state => state.data.isLoaded.val,
  hasNew: state => state.data.hasNew.val,

  isUpdatingAll: state => state.data.isUpdatingAll,
}

export const actions = {
  updateComments: state => state.data.updateComments,

  reset: actions => actions.data.reset,

  resetCategory: actions => actions.data.resetCategory,
  addCategory: actions => actions.data.addCategory,

  resetChapter: actions => actions.data.resetChapter,
  addChapter: actions => actions.data.addChapter,
  addChapterChild: actions => actions.data.addChapterChild,

  startLoading: actions => actions.data.isLoaded.startLoading,
  finishLoading: actions => actions.data.isLoaded.finishLoading,
  updateHasNew: actions => actions.data.hasNew.update,

  updateAll: actions => actions.data.setUpdateAll,

  fetchOneChapter: actions => actions.data.fetchOneChapter,
  fetchOneUserChapter: actions => actions.data.fetchOneUserChapter,
  fetchOneNext: actions => actions.data.fetchOneNext,

  sortChapters: actions => actions.data.sortChapters,
  sortUserChapters: actions => actions.data.sortUserChapters,
  sortNext: actions => actions.data.sortNext,
}
