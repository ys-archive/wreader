import { action, computed, thunk } from 'easy-peasy';
import ChapterService from '../../services/ChapterService';
import * as _ from 'lodash';

export default {
  categories: [],
  chapters: [],
  isLoaded: false,

  reset: action((state, payload) => {
    state.categories = [];
    state.chapters = [];
    state.isLoaded = false;
  }),

  addCategory: action((state, payload) => {
    const hasFound = state.categories.findIndex(cat => _.isEqual(cat, payload));

    if (hasFound === -1) {
      state.categories.push(payload);
    }
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

  setLoaded: action((state, payload) => {
    state.isLoaded = payload;
  }),
};

export const selectors = {
  categories: state => state.data.categories,
  chapters: state => state.data.chapters,
  isLoaded: state => state.data.isLoaded,
};

export const actions = {
  reset: actions => actions.data.reset,
  addCategory: actions => actions.data.addCategory,
  addChapter: actions => actions.data.addChapter,
  addChapterChild: actions => actions.data.addChapterChild,
  setLoaded: actions => actions.data.setLoaded,
};
