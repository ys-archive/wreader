import { action, computed, thunk, thunkOn } from "easy-peasy";
// import ChapterService from "../../services/ChapterService";
import * as _ from "lodash";

export default {
  categories: [],
  chapters: [],

  commentsUpdated: false,

  updateComments: action(state => {
    state.commentsUpdated = !state.commentsUpdated;
  }),

  isLoaded: {
    val: false,

    startLoading: action((state, payload) => {
      state.val = false;
    }),

    finishLoading: action((state, payload) => {
      state.val = true;
    }),
  },

  reset: action(state => {
    state.categories = [];
    state.chapters = [];
    state.isLoaded.val = false;
  }),

  resetCategory: action(state => {
    state.categories = [];
  }),

  addCategory: action((state, payload) => {
    const hasFound = state.categories.findIndex(cat => _.isEqual(cat, payload));
    if (hasFound === -1) {
      state.categories.push(payload);
    }
  }),

  resetChapter: action((state, payload) => {
    state.chapters = [];
  }),

  addChapter: action((state, payload) => {
    const hasFound = state.chapters.findIndex(ch =>
      _.isEqual(ch.deck, payload.deck),
    );

    if (hasFound === -1) {
      state.chapters.push(
        payload.deck.map(d => ({
          deck: d,
          child: [],
        })),
      );
    }
  }),

  addChapterChild: action((state, payload) => {
    // 아무 부모 챕터 하나라도 있어야함
    if (state.chapters.length === 0) return;

    // 비교용 index 찾아오기
    const comparer = +payload.deck.group_index;

    // undefined
    if (!comparer) return;

    const findRecursively = arr => {
      arr.forEach(item => {
        if (+item.deck.id === comparer) {
          if (
            item.child.findIndex(f => _.isEqual(f.deck, payload.deck)) === -1
          ) {
            item.child.push({ deck: payload.deck, child: [] });
          }
          return;
        }

        if (item.child.length > 0) {
          findRecursively(item.child);
        }
      });
    };

    state.chapters.forEach(chapter => {
      if (chapter.length === 0) return;
      findRecursively(chapter);
    });
  }),

  fetchOneD0_internal: action((state, payload) => {
    const {
      coords: { d0, d1 },
      newChapter,
    } = payload;
    const origPos = state.chapters[d0][d1];

    console.log("[data.fetchOneChapter] OUTDATED\n", origPos.deck, "\n");

    if (newChapter !== undefined) origPos.deck = newChapter;
  }),

  fetchOneD1_internal: action((state, payload) => {
    const {
      coords: { d0, d1, d2 },
      newChapter,
    } = payload;

    const origPos = state.chapters[d0][d1].child[d2];
    console.log("found outdated user chapter : ", origPos.deck);

    if (newChapter !== undefined) origPos.deck = newChapter;
  }),

  fetchOneD2_internal: action((state, payload) => {
    const {
      coords: { d0, d1, d2, d3 },
      newChapter,
    } = payload;
    const origPos = state.chapters[d0][d1].child[d2].child[d3];

    console.log("[data.fetchOneNext] OUTDATED\n", origPos.deck, "\n");

    if (newChapter !== undefined) origPos.deck = newChapter;
  }),

  fetchOneD3_internal: action((state, payload) => {
    const {
      coords: { d0, d1, d2, d3, d4 },
      newChapter,
    } = payload;
    const origPos = state.chapters[d0][d1].child[d2].child[d3].child[d4];

    console.log("[data.fetchOneNext] OUTDATED\n", origPos.deck, "\n");

    if (newChapter !== undefined) origPos.deck = newChapter;
  }),

  fetchOneD4_internal: action((state, payload) => {
    const {
      coords: { d0, d1, d2, d3, d4, d5 },
      newChapter,
    } = payload;
    const origPos =
      state.chapters[d0][d1].child[d2].child[d3].child[d4].child[d5];

    console.log("[data.fetchOneNext] OUTDATED\n", origPos.deck, "\n");

    if (newChapter !== undefined) origPos.deck = newChapter;
  }),

  fetchOneD5_internal: action((state, payload) => {
    const {
      coords: { d0, d1, d2, d3, d4, d5, d6 },
      newChapter,
    } = payload;
    const origPos =
      state.chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6];

    console.log("[data.fetchOneNext] OUTDATED\n", origPos.deck, "\n");

    if (newChapter !== undefined) origPos.deck = newChapter;
  }),

  fetchOneD6_internal: action((state, payload) => {
    const {
      coords: { d0, d1, d2, d3, d4, d5, d6, d7 },
      newChapter,
    } = payload;
    const origPos =
      state.chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
        .child[d7];

    console.log("[data.fetchOneNext] OUTDATED\n", origPos.deck, "\n");

    if (newChapter !== undefined) origPos.deck = newChapter;
  }),

  fetchOneD7_internal: action((state, payload) => {
    const {
      coords: { d0, d1, d2, d3, d4, d5, d6, d7, d8 },
      newChapter,
    } = payload;
    const origPos =
      state.chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
        .child[d7].child[d8];

    console.log("[data.fetchOneNext] OUTDATED\n", origPos.deck, "\n");

    if (newChapter !== undefined) origPos.deck = newChapter;
  }),

  fetchOneD8_internal: action((state, payload) => {
    const {
      coords: { d0, d1, d2, d3, d4, d5, d6, d7, d8, d9 },
      newChapter,
    } = payload;
    const origPos =
      state.chapters[d0][d1].child[d2].child[d3].child[d4].child[d5].child[d6]
        .child[d7].child[d8].child[d9];

    console.log("[data.fetchOneNext] OUTDATED\n", origPos.deck, "\n");

    if (newChapter !== undefined) origPos.deck = newChapter;
  }),
};

export const selectors = {
  categories: state => state.data.categories,
  // currentCategory: state => state.data.currentCategory,
  // currentCategoryTitle: state => state.data.currentCategoryTitle,

  chapters: state => state.data.chapters,
  // chaptersAtDepth: state => state.data.chaptersAtDepth,

  commentsUpdated: state => state.data.commentsUpdated,

  isLoaded: state => state.data.isLoaded.val,
};

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
};
