import { action, computed, thunk } from "easy-peasy";
import ChapterService from "../../services/ChapterService";
import { asyncForEach } from "../../utils";

import { fetchOne_internal, iterateAndGetTarget } from "./data.fetch.func";

export default {
  fetchCategory: thunk(
    async (actions, payload, { getState, getStoreState, getStoreActions }) => {
      const {
        auth: { userId },
      } = getStoreState();

      // console.log(getStoreActions().swiper);

      const {
        data: {
          resetCategory,
          addCategory,

          isLoaded: { startLoading, finishLoading },
        },
        swiper: {
          coords: { setMax: setMaxCoords },
        },
      } = getStoreActions();

      console.log("[useFetchD0] fetching D0");
      resetCategory();
      startLoading();

      const { data } = await ChapterService.GET_getCategory(userId);

      if (!data.item || data.item.length === 0) {
        return;
      }

      // 카테고리 데이터 정제 및 저장
      const categories = Object.values(data.item);

      // 카테고리 값 업데이트 - d0
      categories.forEach(category => addCategory(category));

      setMaxCoords({
        category: categories.length,
        chapter: categories[0].maxLength,
      });

      await actions.fetchChapterD1();

      if (payload) {
        await payload();
      }
      finishLoading();
    },
  ),

  fetchChapterD1: thunk(
    async (actions, payload, { getState, getStoreState, getStoreActions }) => {
      const {
        data: { categories },
      } = getStoreState();

      const {
        data: {
          isLoaded: { startLoading, finishLoading },
          resetChapter,
          addChapter,
        },
      } = getStoreActions();

      if (!categories.length) {
        return;
      }

      console.log("[useFetchD1] fetching D1");
      resetChapter();
      startLoading();

      // 챕터 데이터 정제 및 저장
      const chapters = Object.values(categories)
        .map(i => i.chapter)
        .filter(i => i.length > 0);
      // console.log('refined chapters --> ', chapters);

      if (!chapters || chapters.length === 0) {
        return;
      }

      // group_index 0 부터 저장
      await asyncForEach(chapters, async deck => {
        if (deck.length === 0) {
          return;
        }

        addChapter({ deck });
      });

      finishLoading();
    },
  ),

  fetchChapterAfter: thunk(
    async (actions, payload, { getState, getStoreState, getStoreActions }) => {
      const {
        auth: { userId },
        data: { chapters },
        swiper: { coords },
        sort: { headChildrenId },
      } = getStoreState();

      const {
        data: {
          addChapterChild,
          isLoaded: { startLoading, finishLoading },
        },
      } = getStoreActions();

      const depth = payload;
      // console.log(`[useFetchD${depth}] before  fetching D${depth}`);

      // if (!chapters || chapters.length === 0) {
      //   return;
      // }

      const { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 } = coords.val;
      // if (!chapters[d0]) {
      //   return;
      // }

      const target = iterateAndGetTarget(chapters[d0][d1], depth, coords.val);
      const fetchId = +target.deck.id;
      console.log(
        `[useFetchD${depth}] headChildrenId: ${headChildrenId}, fetchId: ${fetchId}`,
      );
      if (headChildrenId === fetchId) {
        return;
      }

      console.log(`[useFetchD${depth}] fetching D${depth}`);
      startLoading();

      const { data } = await ChapterService.GET_getChapter(fetchId, userId);

      if (data.item.length === 1) {
        addChapterChild({ deck: data.item[0] });
      } else if (data.item.length >= 2) {
        data.item.forEach(data => addChapterChild({ deck: data }));
      }

      // 로딩 끝
      finishLoading();
    },
  ),

  fetchOne: thunk(
    async (actions, payload, { getState, getStoreState, getStoreActions }) => {
      const { curId, parentId, depth, userId } = payload;

      const {
        data: { chapters },
        swiper: { coords },
      } = getStoreState();

      console.log(
        `\n[data.fetch.fetchOne] @GET getChapter (parentId : ${parentId}, current Id: ${curId}, userId: ${userId})`,
      );

      const { data } = await ChapterService.GET_getChapter(+parentId, userId);
      if (data.item.length === 0) return;

      const targetIdx = data.item.findIndex(i => +i.id === +curId);

      const newChapter = data.item[targetIdx];
      console.log(`[data.fetch.fetchOne] NEW\n`, newChapter, "\n");

      const payload_internal = {
        coords: coords.val,
        depth,
        newChapter,
        chapters,
      };
      fetchOne_internal(payload_internal);
    },
  ),
};

export const selectors = {};

export const actions = {
  fetchCategory: actions => actions.dataFetch.fetchCategory,
  fetchChapterD1: actions => actions.dataFetch.fetchChapterD1,
  fetchChapterAfter: actions => actions.dataFetch.fetchChapterAfter,
  fetchOne: actions => actions.dataFetch.fetchOne,
};

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

//     getStoreActions().data.fetchOneD0_internal({
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

//     getStoreActions().data.fetchOneD1_internal({
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
//       getStoreActions().data.fetchOneD1_internal({
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
//       getStoreActions().data.fetchOneD1_internal({
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

//     getStoreActions().data.fetchOneD2_internal({
//       d0,
//       d1,
//       d2,
//       d3,
//       newChapter,
//     })
//   },
// ),

// fetchOneD0_internal: thunk(
//     async (actions, payload, { getState, getStoreState, getStoreActions }) => {
//       const {
//         coords: { d0, d1 },
//         newChapter,
//       } = payload;
//       const {
//         data: { chapters },
//         swiper: { depth },
//       } = getStoreState();

//       const props = {
//         payload: { ...payload, depth },
//         getStoreState: getStoreState(),
//       };

//       const origPos = chapters[d0][d1];

//       fetchOne_internal(props);

//       console.log("[data.fetchOneChapter] OUTDATED\n", origPos.deck, "\n");

//       if (newChapter !== undefined) origPos.deck = newChapter;
//     },
//   ),

//   fetchOneD1_internal: thunk(
//     async (actions, payload, { getState, getStoreState, getStoreActions }) => {
//       const {
//         coords: { d0, d1, d2 },
//         newChapter,
//       } = payload;
//       const {
//         data: { chapters },
//       } = getStoreState();

//       const origPos = chapters[d0][d1].child[d2];
//       console.log("found outdated user chapter : ", origPos.deck);

//       if (newChapter !== undefined) origPos.deck = newChapter;
//     },
//   ),

//   fetchOneD2_internal: thunk(
//     async (actions, payload, { getState, getStoreState, getStoreActions }) => {
//       const {
//         coords: { d0, d1, d2, d3 },
//         newChapter,
//       } = payload;
//       const {
//         data: { chapters },
//       } = getStoreState();

//       const origPos = chapters[d0][d1].child[d2].child[d3];

//       console.log("[data.fetchOneNext] OUTDATED\n", origPos.deck, "\n");

//       if (newChapter !== undefined) origPos.deck = newChapter;
//     },
//   ),

//   fetchOneD3_internal: thunk(
//     async (actions, payload, { getState, getStoreState, getStoreActions }) => {
//       const {
//         coords: { d0, d1, d2, d3, d4 },
//         newChapter,
//       } = payload;
//       const {
//         data: { chapters },
//       } = getStoreState();

//       const origPos = chapters[d0][d1].child[d2].child[d3].child[d4];

//       console.log("[data.fetchOneNext] OUTDATED\n", origPos.deck, "\n");

//       if (newChapter !== undefined) origPos.deck = newChapter;
//     },
//   ),

//   fetchOneD4_internal: thunk(
//     async (actions, payload, { getState, getStoreState, getStoreActions }) => {
//       const {
//         coords: { d0, d1, d2, d3, d4, d5 },
//         newChapter,
//       } = payload;
//       const {
//         data: { chapters },
//       } = getStoreState();

//       const origPos = chapters[d0][d1].child[d2].child[d3].child[d4].child[d5];

//       console.log("[data.fetchOneNext] OUTDATED\n", origPos.deck, "\n");

//       if (newChapter !== undefined) origPos.deck = newChapter;
//     },
//   ),

//   fetchOneD5_internal: thunk(
//     async (actions, payload, { getState, getStoreState, getStoreActions }) => {
//       const {
//         coords: { d0, d1, d2, d3, d4, d5, d6 },
//         newChapter,
//       } = payload;
//       const {
//         data: { chapters },
//       } = getStoreState();

//       const origPos =
//         chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6];

//       console.log("[data.fetchOneNext] OUTDATED\n", origPos.deck, "\n");

//       if (newChapter !== undefined) origPos.deck = newChapter;
//     },
//   ),

//   fetchOneD6_internal: thunk(
//     async (actions, payload, { getState, getStoreState, getStoreActions }) => {
//       const {
//         coords: { d0, d1, d2, d3, d4, d5, d6, d7 },
//         newChapter,
//       } = payload;
//       const {
//         data: { chapters },
//       } = getStoreState();

//       const origPos =
//         chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
//           .child[d7];

//       console.log("[data.fetchOneNext] OUTDATED\n", origPos.deck, "\n");

//       if (newChapter !== undefined) origPos.deck = newChapter;
//     },
//   ),

//   fetchOneD7_internal: thunk(
//     async (actions, payload, { getState, getStoreState, getStoreActions }) => {
//       const {
//         coords: { d0, d1, d2, d3, d4, d5, d6, d7, d8 },
//         newChapter,
//       } = payload;
//       const {
//         data: { chapters },
//       } = getStoreState();

//       const origPos =
//         chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
//           .child[d7].child[d8];

//       console.log("[data.fetchOneNext] OUTDATED\n", origPos.deck, "\n");

//       if (newChapter !== undefined) origPos.deck = newChapter;
//     },
//   ),

//   fetchOneD8_internal: thunk(
//     async (actions, payload, { getState, getStoreState, getStoreActions }) => {
//       const {
//         coords: { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 },
//         newChapter,
//       } = payload;
//       const {
//         data: { chapters },
//       } = getStoreState();

//       const origPos =
//         chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
//           .child[d7].child[d8].child[d9];

//       console.log("[data.fetchOneNext] OUTDATED\n", origPos.deck, "\n");

//       if (newChapter !== undefined) origPos.deck = newChapter;
//     },
//   ),
