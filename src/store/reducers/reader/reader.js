import { action, computed } from 'easy-peasy';
// import Novel from '../../../data/novel/novel';

import { Dimensions } from 'react-native';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const model = {
  currentCategoryIdx: 0,
  lastCategoryIdx: 5,
  currentChapterIdx: 0,
  lastChapterIdx: 5,
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
};

export default {
  model,
  // computed
  isFirstCategory: computed(state => state.model.currentCategoryIdx === 0),
  isLastCategory: computed(
    state => state.model.currentCategoryIdx === state.model.lastCategoryIdx,
  ),
  isFirstChapter: computed(state => state.model.currentChapterIdx === 0),
  isLastChapter: computed(
    state => state.model.currentChapterIdx === state.model.lastChapterIdx,
  ),
  swiperThresholdHorizontal: computed(state => state.model.screenWidth * 0.4),
  swiperThresholdVertical: computed(state => state.model.screenHeight * 0.4),
  // action
  reset: action((state, payload) => {
    const { lastCategoryIdx, lastChapterIdx } = payload;
    state.model.isCategorySelected = false;
    state.model.currentCategoryIdx = 0;
    state.model.lastCategoryIdx = lastCategoryIdx;
    state.model.currentChapterIdx = 0;
    state.model.lastChapterIdx = lastChapterIdx;
  }),
  swipeToLeft: action((state, payload) => {
    state.model.currentChapterIdx += 1;
    console.log('category: ', state.model.currentCategoryIdx);
    console.log('chapter: ', state.model.currentChapterIdx);
    console.log('-------------------------------');
  }),
  swipeToRight: action((state, payload) => {
    // TODO: 마지막 뷰어에서 뒤로 이동할때는 같은 장르내에서 전 챕터로 이동이 되도록 해주세요~
    state.model.currentChapterIdx -= 1;
    console.log('category: ', state.model.currentCategoryIdx);
    console.log('chapter: ', state.model.currentChapterIdx);
    console.log('-------------------------------');
    // if (!state.isLastChapter) {
    // }
    // if (state.model.currentCategoryIdx === 0) {
    //   state.model.isCategorySelected = false;
    // }
  }),
  swipeToUp: action((state, payload) => {
    state.model.currentCategoryIdx += 1;
    console.log('category: ', state.model.currentCategoryIdx);
    console.log('chapter: ', state.model.currentChapterIdx);
    console.log('-------------------------------');
    // if (state.currentChapterIdx === 0) {
    // }
  }),
  swipeToDown: action((state, payload) => {
    state.model.currentCategoryIdx -= 1;
    console.log('category: ', state.model.currentCategoryIdx);
    console.log('chapter: ', state.model.currentChapterIdx);
    console.log('-------------------------------');
    // if (!state.model.isCategorySelected) {
    // }
    // if (state.currentChapterIdx === 0) {
    // }
  }),
};
