import { action, computed, thunk, thunkOn } from "easy-peasy";
import ChapterService from "../../services/ChapterService";
import * as _ from "lodash";

export default {
  // root
  root: [],
  setRoot: action((state, payload) => {
    state.root = payload;
  }),
  reset: action(state => {
    state.root = [];
  }),
  loadRootAsync: thunk(
    async (actions, payload, { getState, getStoreState, getStoreActions }) => {
      const { startLoading, finishLoading, reset, setRoot } = actions;

      reset();
      startLoading();

      const userId = payload;
      const { data } = await ChapterService.GET_getCategory(userId);
      if (!data || !data.item || data.item.length === 0) return;

      setRoot(Object.values(data.item));
    },
  ),
  onFinishLoadRoot: thunkOn(
    actions => actions.loadRootAsync,
    (actions, target) => {
      actions.finishLoading();
    },
  ),

  // fetch status
  isLoaded: false,
  startLoading: action(state => {
    state.isLoaded = false;
  }),
  finishLoading: action(state => {
    state.isLoaded = true;
  }),

  // card
  // getCurrent: thunk(
  //   (actions, payload, { getState, getStoreState, getStoreActions }) => {
  //     const {
  //       swiper: { pos },
  //     } = getStoreState();
  //   },
  // ),

  // categories: [],
  // resetCategory: action(state => {
  //   state.categories = [];
  // }),

  // chapters: [],
  // resetChapters: action((state, payload) => {
  //   state.chapters = [];
  // }),

  // addCategory: action((state, payload) => {
  //   const hasFound = state.categories.findIndex(cat => _.isEqual(cat, payload));
  //   if (hasFound === -1) {
  //     state.categories.push(payload);
  //   }
  // }),

  // addChapter: action((state, payload) => {
  //   const hasFound = state.chapters.findIndex(ch =>
  //     _.isEqual(ch.deck, payload.deck),
  //   );

  //   if (hasFound === -1) {
  //     state.chapters.push(
  //       payload.deck.map(d => ({
  //         deck: d,
  //         child: [],
  //       })),
  //     );
  //   }
  // }),

  // addChapterChild: action((state, payload) => {
  //   // 아무 부모 챕터 하나라도 있어야함
  //   if (state.chapters.length === 0) return;

  //   // 비교용 index 찾아오기
  //   const comparer = +payload.deck.group_index;

  //   // undefined
  //   if (!comparer) return;

  //   const findRecursively = arr => {
  //     arr.forEach(item => {
  //       if (+item.deck.id === comparer) {
  //         if (
  //           item.child.findIndex(f => _.isEqual(f.deck, payload.deck)) === -1
  //         ) {
  //           item.child.push({ deck: payload.deck, child: [] });
  //         }
  //         return;
  //       }

  //       if (item.child.length > 0) {
  //         findRecursively(item.child);
  //       }
  //     });
  //   };

  //   state.chapters.forEach(chapter => {
  //     if (chapter.length === 0) return;
  //     findRecursively(chapter);
  //   });
  // }),

  // fetchOneChapter_internal: action((state, payload) => {
  //   const {
  //     coords: { d0, d1 },
  //     newChapter,
  //   } = payload;
  //   const origPos = state.chapters[d0][d1];

  //   console.log("[data.fetchOneChapter] OUTDATED\n", origPos.deck, "\n");

  //   if (newChapter !== undefined) origPos.deck = newChapter;
  // }),

  // fetchOneUserChapter_internal: action((state, payload) => {
  //   const {
  //     coords: { d0, d1, d2 },
  //     newChapter,
  //   } = payload;

  //   const origPos = state.chapters[d0][d1].child[d2];
  //   console.log("found outdated user chapter : ", origPos.deck);

  //   if (newChapter !== undefined) origPos.deck = newChapter;

  //   // let origPos = undefined

  //   // const origPosIdx = state.chapters[d0][d1].child.findIndex(
  //   //   i => +i.id === +retryId,
  //   // )

  //   // origPos = state.chapters[d0][d1].child[origPosIdx]
  //   // // if (origPosIdx === -1) {
  //   // //   origPos = state.chapters[d0][d1]
  //   // // } else {
  //   // // }

  //   // console.log("[data.fetchOneUserChapter] OUTDATED\n", origPos.deck, "\n")

  //   // if (newChapter !== undefined) origPos.deck = newChapter
  // }),

  // fetchOneNext_internal: action((state, payload) => {
  //   const {
  //     coords: { d0, d1, d2, d3 },
  //     newChapter,
  //   } = payload;
  //   const origPos = state.chapters[d0][d1].child[d2].child[d3];

  //   console.log("[data.fetchOneNext] OUTDATED\n", origPos.deck, "\n");

  //   if (newChapter !== undefined) origPos.deck = newChapter;
  // }),
};

export const selectors = {
  root: state => state.data.root,
  isLoaded: state => state.data.isLoaded,

  // categories: state => state.data.categories,
  // chapters: state => state.data.chapters,

  // isLoaded: state => state.data.isLoaded.val,
  // hasNew: state => state.data.hasNew.val,

  // isUpdatingAll: state => state.data.isUpdatingAll,
};

export const actions = {
  loadRootAsync: actions => actions.data.loadRootAsync,
  // startLoading: actions => actions.data.startLoading,
  // finishLoading: actions => actions.data.finishLoading,

  // reset: actions => actions.data.reset,

  // resetCategory: actions => actions.data.resetCategory,
  // addCategory: actions => actions.data.addCategory,

  // resetChapters: actions => actions.data.resetChapters,
  // addChapter: actions => actions.data.addChapter,
  // addChapterChild: actions => actions.data.addChapterChild,

  // updateHasNew: actions => actions.data.hasNew.update,

  // updateAll: actions => actions.data.setUpdateAll,
};
