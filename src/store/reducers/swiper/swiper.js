import { action, computed } from 'easy-peasy';
// import Novel from '../../../data/novel/novel';

import { Dimensions } from 'react-native';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const model = {
  currentCategoryIdx: 0,
  lastCategoryIdx: 0,
  isCategorySelected: false,
  currentChapterIdx: 0,
  lastChapterIdx: 0,
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
};

export default {
  model,
  // computed
  isLastCategory: computed(
    state => state.model.currentCategoryIdx === state.model.lastCategoryIdx,
  ),
  isLastChapter: computed(
    state => state.model.currentChapterIdx === state.model.lastChapterIdx,
  ),
  swiperThresholdHorizontal: computed(state => state.model.screenWidth * 0.4),
  swiperThresholdVertical: computed(state => state.model.screenHeight * 0.4),
  // action
  resetSwiper: action((state, payload) => {
    const { lastCategoryIdx, lastChapterIdx } = payload;
    state.model.isCategorySelected = false;
    state.model.currentCategoryIdx = 0;
    state.model.lastCategoryIdx = lastCategoryIdx;
    state.model.currentChapterIdx = 0;
    state.model.lastChapterIdx = lastChapterIdx;
  }),
  swipeLeftward: action((state, payload) => {
    if (!state.model.isCategorySelected) {
      // 카테고리가 선택 안됐으면, 선택하고 chapter 1 로 넘김
      state.model.isCategorySelected = true;
      state.model.currentChapter = 1;
    } else {
      // 만약 카테고리가 선택이 되어있다면,
      // chapter idx 증가
      state.model.currentChapterIdx = Math.max(
        state.model.currentChapterIdx + 1,
        state.model.lastChapterIdx,
      );
    }
  }),
  swipeRightward: action((state, payload) => {
    if (state.model.isCategorySelected) {
      --state.model.currentCategoryIdx;
      if (state.model.currentCategoryIdx === 0) {
        state.model.isCategorySelected = false;
      }
    }
  }),
  swipeUpward: action((state, payload) => {
    if (state.currentChapterIdx === 0) {
      if (!state.model.isCategorySelected) {
        state.model.currentCategoryIdx = Math.max(
          state.model.currentCategoryIdx + 1,
          state.model.lastCategoryIdx,
        );
      }
    }
  }),
  swipeDownward: action((state, payload) => {
    if (state.currentChapterIdx === 0) {
      if (!state.model.isCategorySelected) {
        state.model.currentChapterIdx = Math.min(
          0,
          state.model.currentCategoryIdx - 1,
        );
      }
    }
  }),
};
