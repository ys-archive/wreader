import { action, computed, thunk } from 'easy-peasy';
import ChapterService from '../../services/ChapterService';
import * as _ from 'lodash';

export default {
  categories: [],
  chapters: [],

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

    let pos = undefined;

    state.chapters.forEach((chapter, i) => {
      if (chapter.length === 0) return;

      chapter.forEach((ch, j) => {
        if (+ch.deck.id === comparer) {
          pos = { i, j };
          return;
        }
      });
    });

    if (!pos) return;

    const { i, j } = pos;
    state.chapters[i][j].child.push(payload.deck);
  }),
};

export const selectors = {
  selCategories: state => state.data.categories,
  selChapters: state => state.data.chapters,
};

export const actions = {
  actAddCategory: actions => actions.data.addCategory,
  actAddChapter: actions => actions.data.addChapter,
  actAddChapterChild: actions => actions.data.addChapterChild,
};
