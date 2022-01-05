import { action, computed, thunk, thunkOn } from "easy-peasy";
import ChapterService from "../../services/ChapterService";
import * as _ from "lodash";

export default {
  // categories
  categories: [],

  setCategories: action((state, payload) => {
    state.categories = payload;
  }),
  reset: action(state => {
    state.categories = [];
  }),
  loadCategoriesAsync: thunk(async (actions, payload, helpers) => {
    const { startLoading, reset, setCategories } = actions;
    const {
      getStoreState: {
        auth: { userId },
      },
    } = getStoreState();

    reset();
    startLoading();

    const { data } = await ChapterService.GET_getCategory(userId);
    // if (!data || !data.item || data.item.length === 0) return;

    if (data.status === 200) {
      setCategories(Object.values(data.item));
    }

    const after = payload;
    if (after) {
      after();
    }
  }),
  onFinishLoadCategories: thunkOn(
    actions => actions.loadCategoriesAsync,
    (actions, target) => {
      actions.finishLoading();
    },
  ),

  // data accessor

  maxCategoriesLength: computed(state => state.categories.length),

  currentCategory: computed(
    [
      state => state.categories,
      (state, storeState) => storeState.swiper.curPos,
    ],
    (categories, curPos) => categories[curPos],
  ),
  currentCategoryTitle: computed(
    state => state.currentCategory && state.currentCategory.title,
  ),

  // fetch status
  isLoaded: false,
  startLoading: action(state => {
    state.isLoaded = false;
  }),
  finishLoading: action(state => {
    state.isLoaded = true;
  }),

  // fetch
  chapters: [],
  setChapters: action((state, payload) => {
    state.chapters = payload;
  }),
  hasChapters: computed(state => state.chapters.length),
  loadChaptersAsync: thunk(
    async (actions, payload, { getState, getStoreState, getStoreActions }) => {
      const { fetchId } = getState();
      const {
        auth: { userId },
      } = getStoreState();

      const {
        data: { item },
        status,
      } = await ChapterService.GET_getChapter(fetchId, userId);
      if (status === 200) {
        actions.setChapters(Object.values(item));
      }

      const after = payload;
      if (after) {
        after();
      }
    },
  ),
  onFinishLoadChapters: thunkOn(
    actions => actions.loadChaptersAsync,
    (actions, target) => {
      actions.finishLoading();
    },
  ),

  // card
  currentFetchId: 0,
  setFetchId: action((state, payload) => {}),
  onSwipe: thunkOn(
    (actions, storeActions) => [
      storeActions.swiper.swipeLeft,
      storeActions.swiper.swipeRight,
      storeActions.swiper.swipeUp,
      storeActions.swiper.swipeDown,
    ],
    (actions, target) => {},
  ),
};

export const selectors = {
  categories: state => state.data.categories,
  isLoaded: state => state.data.isLoaded,
  maxCategoriesLength: state => state.data.maxCategoriesLength,

  currentFetchId: state => state.data.currentFetchId,
  currentCategory: state => state.data.currentCategory,
  currentCategoryTitle: state => state.data.currentCategoryTitle,
  chapters: state => state.data.chapters,
  hasChapters: state => state.data.hasChapters,
};

export const actions = {
  loadCategoriesAsync: actions => actions.data.loadCategoriesAsync,

  setFetchId: actions => actions.data.setFetchId,

  loadChaptersAsync: actions => actions.data.loadChaptersAsync,
};

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
// 아무 부모 챕터 하나라도 있어야함
//   if (state.chapters.length === 0) return;

// 비교용 index 찾아오기
//   const comparer = +payload.deck.group_index;

// undefined
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

// let origPos = undefined

// const origPosIdx = state.chapters[d0][d1].child.findIndex(
//   i => +i.id === +retryId,
// )

// origPos = state.chapters[d0][d1].child[origPosIdx]
// if (origPosIdx === -1) {
//   origPos = state.chapters[d0][d1]
// } else {
// }

// console.log("[data.fetchOneUserChapter] OUTDATED\n", origPos.deck, "\n")

// if (newChapter !== undefined) origPos.deck = newChapter
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
