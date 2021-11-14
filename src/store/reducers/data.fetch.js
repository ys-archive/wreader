import { action, computed, thunk } from "easy-peasy"
import ChapterService from "../../services/ChapterService"
import { DEPTH_NAME } from "./swiper.depth"

export default {
  fetchCategory: thunk(
    async (actions, payload, { getState, getStoreState, getStoreActions }) => {
      const {
        auth: { userId },
      } = getStoreState()
      const {
        data: { resetCategory, addCategory },
        swiper: { setMaxCoords },
      } = getStoreActions()

      console.log("[dataFetch] fetching CATEGORY")
      const { data } = await ChapterService.GET_getCategory(userId)
      if (data.item.length === 0) return

      // 카테고리 데이터 정제 및 저장
      categories = Object.values(data.item)

      // 카테고리 값 업데이트 - d0
      categories.forEach(cat => addCategory(cat))
    },
  ),

  fetchChapters: thunk(
    async (actions, payload, { getState, getStoreState, getStoreActions }) => {
      const overriderDepth = payload

      const {
        auth: { userId },
        swiper: {
          depth,
          coords: {
            val: { d0, d1, d2, d3 },
          },
        },
        data: { chapters },
      } = getStoreState()

      const {
        data: { addChapter, addChapterChild },
      } = getStoreActions()

      console.log(depth.val)
      switch (overriderDepth !== undefined ? overriderDepth : depth.val) {
        case DEPTH_NAME.CHAPTER:
          {
            console.log("[dataFetch] fetching CHAPTERS")
            const { data } = await ChapterService.GET_getChapter(0, userId)
            if (data.item.length === 0) return

            const transformed = {}
            data.item.forEach(ch => {
              const curId = +ch.categoryId - 5

              if (transformed[curId] === undefined) {
                transformed[curId] = []
              }
              transformed[curId].push(ch)
            })

            Object.values(transformed).forEach(deck =>
              addChapter({ deck: deck.sort((a, b) => +a.id - +b.id) }),
            )
          }
          break

        case DEPTH_NAME.USER_CHAPTER:
          {
            console.log("[dataFetch] fetching USER CHAPTERS")
            const target = chapters[d0][d1].deck
            const { data } = await ChapterService.GET_getChapter(
              +target.id,
              userId,
            )
            if (data.item.length === 0) return

            data.item = data.item.sort((a, b) => +a.id - +b.id)

            if (data.item.length === 1) {
              addChapterChild({ deck: data.item[0] })
            } else {
              data.item.forEach(deck => {
                addChapterChild({ deck })
              })
            }

            setMaxCoords({ d2: chapters })
          }
          break

        case DEPTH_NAME.NEXT:
          {
            console.log("[dataFetch] fetching NEXT CHAPTERS")

            const target = chapters[d0][d1].child[d2]

            if (target === undefined) return

            const { data } = await ChapterService.GET_getChapter(
              +target.deck.id,
              +userId,
            )

            if (data.item.length === 0) return

            if (data.item.length === 1) {
              addChapterChild({ deck: data.item[0] })
            } else {
              data.item.forEach(deck => {
                addChapterChild({ deck })
              })
            }

            setMaxCoords({ d3: chapters })
          }
          break
      }
    },
  ),

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
  fetchCategory: actions => actions.dataFetch.fetchCategory,
  fetchChapters: actions => actions.dataFetch.fetchChapters,
}
