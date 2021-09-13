import { action, computed, thunk } from 'easy-peasy';
import ChapterService from '../../services/ChapterService';
import * as _ from 'lodash';

export default {
  categories: [],
  chapters: [],

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

    startLoading:  action((state, payload) => {
      if ('d0' === payload) {
        state.val.d0 = false;
        return;
      }

      if ('d1' === payload) {
        state.val.d1 = false;
        return;
      }

      if ('d2' === payload) {
        state.val.d2 = false;
        return;
      }

      if ('d3' === payload) {
        state.val.d3 = false;
        return;
      }
    }),

    finishLoading: action((state, payload) => {
      if ('d0' === payload) {
        state.val.d0 = true;
        return;
      }

      if ('d1' === payload) {
        state.val.d1 = true;
        return;
      }

      if ('d2' === payload) {
        state.val.d2 = true;
        return;
      }

      if ('d3' === payload) {
        state.val.d3 = true;
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
    },

    val: {
      d0: false,
      d1: false,
      d2: false,
      d3: false,
    },

    update: action((state, payload) => {
      if ('d0' in payload) {
        state.val.d0 = payload.d0;
        return;
      }

      if ('d1' in payload) {
        state.val.d1 = payload.d1;
        return;
      }

      if ('d2' in payload) {
        state.val.d2 = payload.d2;
        return;
      }

      if ('d3' in payload) {
        state.val.d3 = payload.d3;
        return;
      }
    }),
  },

  // hasLike: {
  //   default: {
  //     d0: false,
  //     d1: false,
  //     d2: false,
  //     d3: false,
  //   },

  //   val: {
  //     d0: false,
  //     d1: false,
  //     d2: false,
  //     d3: false,
  //   },

  //   update: action((state, payload) => {
  //     if ('d0' in payload) {
  //       state.val.d0 = payload.d0;
  //       return;
  //     }

  //     if ('d1' in payload) {
  //       state.val.d1 = payload.d1;
  //       return;
  //     }

  //     if ('d2' in payload) {
  //       state.val.d2 = payload.d2;
  //       return;
  //     }

  //     if ('d3' in payload) {
  //       state.val.d3 = payload.d3;
  //       return;
  //     }
  //   }),
  // },

  reset: action(state => {
    state.categories = [];
    state.chapters = [];
    state.isLoaded.val = state.isLoaded.default;
    state.hasNew.val = state.hasNew.default;
    state.hasLike.val = state.hasLike.default;
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
          }
          item.child.push({ deck: payload.deck, child: [] });
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
};

export const selectors = {
  categories: state => state.data.categories,
  chapters: state => state.data.chapters,

  isLoaded: state => state.data.isLoaded.val,
  hasNew: state => state.data.hasNew.val,
  // hasLike: state => state.data.hasLike.val,
};

export const actions = {
  reset: actions => actions.data.reset,

  resetCategory: actions => actions.data.resetCategory,
  addCategory: actions => actions.data.addCategory,

  resetChapter: actions => actions.data.resetChapter,
  addChapter: actions => actions.data.addChapter,
  addChapterChild: actions => actions.data.addChapterChild,

  startLoading: actions => actions.data.isLoaded.startLoading,
  finishLoading: actions => actions.data.isLoaded.finishLoading,
  updateHasNew: actions => actions.data.hasNew.update,
  // updateHasLike: actions => actions.data.hasLike.update,
};
