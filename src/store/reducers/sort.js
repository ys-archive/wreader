import { thunkOn, thunk, computed } from "easy-peasy"
import { SortType, sorterByDate, sorterByLikeCount } from "./sort.type"

export default {
  currentSortType: new SortType(),

  onSorted: thunkOn(
    actions => actions.sort,
    (state, target) => currentSortType.toggle(),
  ),

  sort: thunk((actions, payload, { getState, getStoreState }) => {
    const { coords } = getStoreState().swiper
    const { chapters } = getStoreState().data
    const { currentSortType } = getState()
    const { d0, d1 } = coords.val

    // 해당 챕터만 정렬
    // e.g. chapter1 -> chapter1 머릿글 + 나머지들
    const head = chapters[d0][d1].deck
    const rests = chapters[d0][d1].child
    const original = [head, ...rests]

    const sorted = original.sort(
      currentSortType.isSortedByLikes ? sorterByDate : sorterByLikeCount,
    )

    const sortedHead = sorted.shift()
    chapters[d0][d1].deck = sortedHead
    chapters[d0][d1].child = sorted
  }),

  isSortedByDate: computed(state => state.currentSortType.isSortedByDate),

  isSortedByLikes: computed(state => state.currentSortType.isSortedByLikes),
}

export const selectors = {
  currentSortType: state => state.sort.currentSortType,
  isSortedByLikes: state => state.sort.isSortedByLikes,
  isSortedByDate: state => state.sort.isSortedByDate,
}

export const actions = {
  sort: actions => actions.sort.sort,
}

//   sortChapters: thunk((actions, payload, { getState, getStoreState }) => {
//     const { coords } = getStoreState().swiper
//     const { d0 } = coords.val
//     let sorted = undefined

//     if (!state.isChaptersSorted) {
//       sorted = state.chapters[d0].sort(sorterByDate)
//     } else {
//       // sorted = state.originalChapters.slice()[d0]
//       sorted = state.chapters[d0].sort(sorterByLikeCount)
//     }

//     state.chapters[d0] = sorted

//     state.isChaptersSorted = !state.isChaptersSorted
//   }),

//   sortUserChapters: thunk((actions, payload, { getState, getStoreState }) => {
//     const { coords } = getStoreState().swiper
//     const { d0, d1 } = coords.val
//     let sorted = undefined

//     if (!state.isUserChaptersSorted) {
//       // 업데이트 날짜로 정렬
//       sorted = state.chapters[d0][d1].child.sort(sorterByDate)
//     } else {
//       // like count 로 정렬
//       sorted = state.chapters[d0][d1].child.sort(sorterByLikeCount)
//       // sorted = state.originalChapters.slice()[d0][d1].child
//     }

//     // console.log(sorted);
//     state.chapters[d0][d1].child = null
//     state.chapters[d0][d1].child = sorted

//     state.isUserChaptersSorted = !state.isUserChaptersSorted
//   }),

//   sortNext: thunk((actions, payload, { getState, getStoreState }) => {
//     const { coords } = getStoreState().swiper
//     const { chapters } = getStoreState().data
//     const { d0, d1, d2 } = coords.val
//     let sorted = undefined

//     if (!state.isNextSorted) {
//       sorted = state.chapters[d0][d1].child[d2].child.sort(sorterByDate)
//     } else {
//       // sorted = state.originalChapters.slice()[d0][d1].child[d2].child
//       sorted = state.chapters[d0][d1].child[d2].child.sort(sorterByLikeCount)
//     }

//     state.chapters[d0][d1].child[d2].child = sorted

//     state.isNextSorted = !state.isNextSorted
//   }),
