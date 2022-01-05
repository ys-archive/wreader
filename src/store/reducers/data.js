import { action, computed, thunk, thunkOn } from "easy-peasy";
import ChapterService from "../../services/ChapterService";
import * as _ from "lodash";

export default {
  categories: [],
  chapters: [],

  commentsUpdated: false,

  updateComments: action(state => {
    state.commentsUpdated = !state.commentsUpdated;
  }),

  isLoaded: {
    default: {
      d0: false,
      d1: false,
      d2: false,
      d3: false,
      d4: false,
      d5: false,
      d6: false,
      d7: false,
      d8: false,
      d9: false,
    },

    val: {
      d0: false,
      d1: false,
      d2: false,
      d3: false,
      d4: false,
      d5: false,
      d6: false,
      d7: false,
      d8: false,
      d9: false,
    },

    startLoading: action((state, payload) => {
      if ("d0" === payload) {
        state.val.d0 = false;
        return;
      }

      if ("d1" === payload) {
        state.val.d1 = false;
        return;
      }

      if ("d2" === payload) {
        state.val.d2 = false;
        return;
      }

      if ("d3" === payload) {
        state.val.d3 = false;
        return;
      }

      if ("d4" === payload) {
        state.val.d4 = false;
        return;
      }

      if ("d5" === payload) {
        state.val.d5 = false;
        return;
      }

      if ("d6" === payload) {
        state.val.d6 = false;
        return;
      }

      if ("d7" === payload) {
        state.val.d7 = false;
        return;
      }

      if ("d8" === payload) {
        state.val.d8 = false;
        return;
      }

      if ("d9" === payload) {
        state.val.d9 = false;
        return;
      }
    }),

    finishLoading: action((state, payload) => {
      if ("d0" === payload) {
        state.val.d0 = true;
        return;
      }

      if ("d1" === payload) {
        state.val.d1 = true;
        return;
      }

      if ("d2" === payload) {
        state.val.d2 = true;
        return;
      }

      if ("d3" === payload) {
        state.val.d3 = true;
        return;
      }

      if ("d4" === payload) {
        state.val.d4 = true;
        return;
      }

      if ("d5" === payload) {
        state.val.d5 = true;
        return;
      }

      if ("d6" === payload) {
        state.val.d6 = true;
        return;
      }

      if ("d7" === payload) {
        state.val.d7 = true;
        return;
      }

      if ("d8" === payload) {
        state.val.d8 = true;
        return;
      }

      if ("d9" === payload) {
        state.val.d9 = true;
        return;
      }
    }),
  },

  hasNew: {
    default: {
      d0: false,
      d1: false,
      d2: false,
      d3: false,
      d4: false,
      d5: false,
      d6: false,
      d7: false,
      d8: false,
      d9: false,
    },

    val: {
      d0: false,
      d1: false,
      d2: false,
      d3: false,
      d4: false,
      d5: false,
      d6: false,
      d7: false,
      d8: false,
      d9: false,
    },

    update: action((state, payload) => {
      if ("d0" in payload) {
        state.val.d0 = payload.d0;
        return;
      }

      if ("d1" in payload) {
        state.val.d1 = payload.d1;
        return;
      }

      if ("d2" in payload) {
        state.val.d2 = payload.d2;
        return;
      }

      if ("d3" in payload) {
        state.val.d3 = payload.d3;
        return;
      }

      if ("d4" in payload) {
        state.val.d4 = payload.d4;
        return;
      }

      if ("d5" in payload) {
        state.val.d5 = payload.d5;
        return;
      }

      if ("d6" in payload) {
        state.val.d6 = payload.d6;
        return;
      }

      if ("d7" in payload) {
        state.val.d7 = payload.d7;
        return;
      }

      if ("d8" in payload) {
        state.val.d8 = payload.d8;
        return;
      }

      if ("d9" in payload) {
        state.val.d9 = payload.d9;
        return;
      }
    }),
  },

  isUpdatingAll: false,

  setUpdateAll: action((state, payload) => {
    state.isUpdatingAll = payload;
  }),

  reset: action(state => {
    state.categories = [];
    state.chapters = [];
    state.isLoaded.val = state.isLoaded.default;
    state.hasNew.val = state.hasNew.default;
    state.isUpdatingAll = false;
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
  chapters: state => state.data.chapters,

  commentsUpdated: state => state.data.commentsUpdated,

  isLoaded: state => state.data.isLoaded.val,
  hasNew: state => state.data.hasNew.val,

  isUpdatingAll: state => state.data.isUpdatingAll,
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
  updateHasNew: actions => actions.data.hasNew.update,

  updateAll: actions => actions.data.setUpdateAll,
};
