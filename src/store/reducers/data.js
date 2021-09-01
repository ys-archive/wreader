import { action, computed, thunk } from 'easy-peasy';
import { ChapterService } from '../../services';

export default {
  categories: [],
  chapters: [],
  // candidates: [],

  addCategory: action((state, payload) => {
    state.categories.push(payload);
  }),

  addChapter: action((state, payload) => {
    state.chapters.push(payload);
  }),

  // addCandidate: action((state, payload) => {
  //   state.candidates.push(payload);
  // }),

  populateChapter: thunk(
    async (actions, payload, { getState, getStoreState }) => {
      const prvChapterId = payload;
      const { userId } = getStoreState().auth;

      const { data } = await ChapterService.GET_getChapter(
        prvChapterId,
        userId,
      );

      if (!data || data.item.length === 0)
        return;

      const chapters = data.item;
      chapters.foreach(feedChapterRecursively);

      const feedChapterRecursively = chapter => {
        actions.addChapter(chapter);

        if (!chapter.group_index)
          continue;

        actions.populateChapter(chapter.group_index);
      };
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
