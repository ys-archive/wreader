import { action, computed, thunk } from 'easy-peasy';
import ChapterService from '../../services/ChapterService';
import * as _ from 'lodash';

export default {
  categories: [],
  chapters: [],
  chapterHeadNum: 0,
  // candidates: [],

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

  // addCandidate: action((state, payload) => {
  //   state.candidates.push(payload);
  // }),

  populateChapter: thunk(
    async (actions, payload, { getState, getStoreState }) => {
      const prvChapterId = payload;
      const { userId } = getStoreState().auth;

      // console.log(`fetch info: prv id (${prvChapterId}) <<- ${userId}`);
      // console.log('--------------------------------');
      const { data } = await ChapterService.GET_getChapter(
        prvChapterId,
        userId,
      );

      if (!data || !data.item || data.item.length === 0) return;

      // console.log(data.item);

      const chapters = data.item;
      // actions.addChapter({ [getState().chapterHeadNum]: chapters });
      // chapters.forEach(chapter => {
      //   // console.log('chapter ---> ', chapter);

      //   if (!chapter.group_index) return;

      //   // actions.populateChapter(chapter.group_index);
      // });

      console.log(getState().chapters);
      console.log('--------------------------------');
    },
  ),
};

export const selectors = {
  selCategories: state => state.data.categories,
  selChapters: state => state.data.chapters,
  // selCandidates: state => state.data.candidates,
};

export const actions = {
  actAddCategory: actions => actions.data.addCategory,
  actAddChapter: actions => actions.data.addChapter,
  actPopulateChapter: actions => actions.data.populateChapter,
  // actAddCandidate: actions => actions.data.addCandidate,
};
