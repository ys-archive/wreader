import { action, computed, thunk } from "easy-peasy"
import ChapterService from "../../services/ChapterService"
import { DEPTH_NAME } from "./swiper.depth"

export default {
  fetchOne: thunk(
    async (actions, payload, { getState, getStoreState, getStoreActions }) => {
      const { curId, parentId, depth, userId } = payload

      const {
        swiper: { coords },
      } = getStoreState()

      const {
        data: {
          fetchOneChapter_internal,
          fetchOneUserChapter_internal,
          fetchOneNext_internal,
        },
      } = getStoreActions()

      console.log(
        `\n[data.fetch.fetchOne] @GET getChapter (parentId : ${parentId}, current Id: ${curId}, userId: ${userId})`,
      )

      const { data } = await ChapterService.GET_getChapter(+parentId, userId)
      if (data.item.length === 0) return

      const targetIdx = data.item.findIndex(i => +i.id === +curId)

      const newChapter = data.item[targetIdx]
      console.log(`[data.fetch.fetchOne] NEW\n`, newChapter, "\n")

      const payload_internal = { coords: coords.val, newChapter }

      switch (depth) {
        case DEPTH_NAME.CHAPTER:
          fetchOneChapter_internal(payload_internal)
          break

        case DEPTH_NAME.USER_CHAPTER:
          fetchOneUserChapter_internal(payload_internal)
          break

        case DEPTH_NAME.NEXT:
          fetchOneNext_internal(payload_internal)
          break
      }
    },
  ),
}

export const selectors = {}

export const actions = {
  fetchOne: actions => actions.dataFetch.fetchOne,
  // fetchOneChapter: actions => actions.dataFetch.fetchOneChapter,
  // fetchOneUserChapter: actions => actions.dataFetch.fetchOneUserChapter,
  // fetchOneNext: actions => actions.dataFetch.fetchOneNext,
}

// fetchOneChapter: thunk(
//   async (actions, payload, { getState, getStoreState, getStoreActions }) => {
//     const chapterId = payload

//     const { coords } = getStoreState().swiper
//     const { userId } = getStoreState().auth
//     const { d0, d1 } = coords.val
//     const { savedChapterId } = getStoreState().sort

//     console.log(
//       `\n[data.fetch.fetchOneChapter] @GET getChapter (parent chapterId: 0, chapterId: ${chapterId}, userId: ${userId})`,
//     )
//     const { data } = await ChapterService.GET_getChapter(0, userId)
//     if (data.item.length === 0) return

//     // console.log(data.item)
//     const targetIdx = data.item.findIndex(i => +i.id === +chapterId)

//     // 0 번으로 찾지 못하면 -> 실패
//     // chapterId 로 찾기
//     if (targetIdx === -1) {
//       console.log(
//         `[data.fetch.fetchOneChapter] fetch fail with chapterId: 0 (retry with: ${savedChapterId})`,
//       )
//       await actions.fetchOneUserChapterRetry({
//         chapterId,
//         savedChapterId,
//       })
//       return
//     }

//     const newChapter = data.item[targetIdx]
//     console.log(`[data.fetch.fetchOneChapter] NEW\n`, newChapter, "\n")

//     getStoreActions().data.fetchOneChapter_internal({
//       d0,
//       d1,
//       newChapter,
//     })
//   },
// ),

// fetchOneUserChapterRetry: thunk(
//   async (actions, payload, { getState, getStoreState, getStoreActions }) => {
//     const { chapterId, savedChapterId: retryId } = payload

//     const { userId } = getStoreState().auth
//     const { coords } = getStoreState().swiper
//     const { chapters } = getStoreState().data

//     const { d0, d1, d2 } = coords.val

//     const isRetry = retryId !== undefined
//     const fetchId = isRetry ? +retryId : +chapters[d0][d1].deck.id

//     // const fetchId = +chapters[d0][d1].deck.id

//     console.log(
//       `[data.fetch.fetchOneChapterRetry] @GET getChapter (parent chapterId: ${fetchId}, chapterId: ${chapterId}, userId: ${userId})`,
//     )
//     if (isRetry)
//       console.log(`[data.fetch.fetchOneChapterRetry] retryId: ${retryId}`)

//     const { data } = await ChapterService.GET_getChapter(fetchId, userId)
//     if (data.item.length === 0) return

//     const targetIdx = data.item.findIndex(i => +i.id === +chapterId)
//     const newChapter = data.item[targetIdx]
//     console.log(`[data.fetch.fetchOneChapterRetry] NEW\n`, newChapter, "\n")

//     getStoreActions().data.fetchOneUserChapter_internal({
//       d0,
//       d1,
//       d2,
//       newChapter,
//       retryId,
//     })
//   },
// ),

// fetchOneUserChapter: thunk(
//   async (actions, payload, { getState, getStoreState, getStoreActions }) => {
//     const { chapterId, savedChapterId: retryId } = payload

//     const { userId } = getStoreState().auth
//     const { coords } = getStoreState().swiper
//     const { chapters } = getStoreState().data

//     const { d0, d1, d2 } = coords.val

//     const fetchId = +chapters[d0][d1].deck.id

//     // const fetchId = +chapters[d0][d1].deck.id

//     console.log(
//       `[data.fetch.fetchOneUserChapter] @GET getChapter (parent chapterId: ${fetchId}, chapterId: ${chapterId}, userId: ${userId})`,
//     )

//     const { data } = await ChapterService.GET_getChapter(fetchId, userId)

//     const isFailed = data.item.length === 0

//     let targetIdx = undefined
//     let newChapter = undefined

//     if (isFailed) {
//       console.log(
//         `[data.fetch.fetchOneUserChapter] fetch fail with chapterId: ${chapterId} (retry with: ${retryId})`,
//       )
//       const { data: retryData } = await ChapterService.GET_getChapter(
//         retryId,
//         userId,
//       )

//       targetIdx = retryData.item.findIndex(i => +i.id === +chapterId)
//       newChapter = retryData.item[targetIdx]

//       console.log(`[data.fetch.fetchOneUserChapter] NEW\n`, newChapter, "\n")
//       getStoreActions().data.fetchOneUserChapter_internal({
//         d0,
//         d1,
//         d2,
//         newChapter,
//         retryId,
//       })
//     } else {
//       targetIdx = data.item.findIndex(i => +i.id === +chapterId)
//       newChapter = data.item[targetIdx]

//       console.log(`[data.fetch.fetchOneUserChapter] NEW\n`, newChapter, "\n")
//       getStoreActions().data.fetchOneUserChapter_internal({
//         d0,
//         d1,
//         d2,
//         newChapter,
//       })
//     }
//   },
// ),

// fetchOneNext: thunk(
//   async (actions, payload, { getState, getStoreState, getStoreActions }) => {
//     const chapterId = payload

//     const { userId } = getStoreState().auth
//     const { coords } = getStoreState().swiper
//     const { chapters } = getStoreState().data

//     const { d0, d1, d2, d3 } = coords.val

//     const fetchId = +chapters[d0][d1].child[d2].deck.id

//     console.log(
//       `[data.fetch.fetchOneChapter] @GET getChapter (parent chapterId: ${fetchId}, chapterId: ${chapterId}, userId: ${userId})`,
//     )
//     const { data } = await ChapterService.GET_getChapter(fetchId, userId)
//     if (data.item.length === 0) return

//     const targetIdx = data.item.findIndex(i => +i.id === +chapterId)
//     const newChapter = data.item[targetIdx]
//     console.log(`[data.fetch.fetchOneChapter] NEW\n`, newChapter, "\n")

//     getStoreActions().data.fetchOneNext_internal({
//       d0,
//       d1,
//       d2,
//       d3,
//       newChapter,
//     })
//   },
// ),
