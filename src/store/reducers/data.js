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
      state.chapters.push(payload);
    }
  }),

  addChapterChild: action((state, payload) => {}),
};

export const selectors = {
  selCategories: state => state.data.categories,
  selChapters: state => state.data.chapters,
};

export const actions = {
  actAddCategory: actions => actions.data.addCategory,
  actAddChapter: actions => actions.data.addChapter,
};
