import { action, computed, thunk } from 'easy-peasy';
import * as _ from 'lodash';
import { ChapterService } from '../../services';

const model = {
  nextData: null,
};

export default {
  model,

  addNextData: action((state, payload) => {
    state.model.nextData.push(...payload);
  }),

  fetchNextCardData: thunk(
    async (actions, payload, { getState, getStoreState }) => {
      const { userId } = getStoreState().auth;
      
      
      
      const { data } = await ChapterService.GET_getChapter(
        prvChapterId,
        userId,
      );

      if (data.item.length === 0) return;

      // const unq = [];

      // for (let i = 0; i < data.item.length; ++i) {
      //   for (let j = 0; j < getState().model.nextData.length; ++j) {
      //     if (!_.isEqual(data.item[i], getState().model.nextData[j])) {
      //       unq.push(data.item[i]);
      //       break;
      //     }
      //   }
      // }

      actions.addNextData(unq);
    },
  ),
};
