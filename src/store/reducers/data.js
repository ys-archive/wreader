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
          deck: {
            ...d,
            isHide: false,
          },
          child: [],
        })),
      );
    }
  }),

  addChapterChild: action((state, payload) => {
    // 아무 부모 챕터 하나라도 있어야함
    if (state.chapters.length === 0) {
      return;
    }

    // 비교용 index 찾아오기
    const comparer = +payload.deck.group_index;
    if (!comparer) {
      return;
    }

    const findRecursively = arr => {
      arr.forEach(item => {
        if (+item.deck.id === comparer) {
          if (
            item.child.findIndex(f => _.isEqual(f.deck, payload.deck)) === -1
          ) {
            item.child.push({
              deck: {
                ...payload.deck,
                isHide: false,
              },
              child: [],
            });
          }

          return;
        }

        if (item.child.length > 0) {
          findRecursively(item.child);
        }
      });
    };

    state.chapters.forEach(chapter => {
      if (chapter.length === 0) {
        return;
      }

      findRecursively(chapter);
    });
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
