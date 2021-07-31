import { action, computed } from 'easy-peasy';
// import Novel from '../../../data/novel/novel';

import { Dimensions } from 'react-native';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const displayIdxStatus = state => {
  const { currentCategoryIdx: category, currentChapterIdx: chapter } =
    state.model;
  console.log('category: ', category);
  console.log('chapter: ', chapter);
  console.log('-------------------------------');
};

const model = {
  currentCategoryIdx: 0,
  lastCategoryIdx: 10,
  isMovingCategoryLock: false,
  currentChapterIdx: 0,
  isMovingChapterLock: false,
  lastChapterIdx: 10,
  isCategorySelected: false,
  currentCandidateIdx: 0,
  lastCandidateIdx: 0,
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
};

export default {
  model,
  // computed
  isFirstCategory: computed(state => state.model.currentCategoryIdx === 0),
  isLastCategory: computed(
    state =>
      state.model.lastCategoryIdx === 0 ||
      state.model.currentCategoryIdx === state.model.lastCategoryIdx,
  ),

  isFirstChapter: computed(state => state.model.currentChapterIdx === 0),

  isLastChapter: computed(
    state =>
      state.model.lastChapterIdx === 0 ||
      state.model.currentChapterIdx === state.model.lastChapterIdx,
  ),

  isFirstCandidateIdx: computed(state => state.model.currentCandidateIdx === 0),

  isLastCandidate: computed(
    state =>
      state.model.lastCandidateIdx === 0 ||
      state.model.currentCandidateIdx === state.model.lastCandidateIdx,
  ),

  swiperThresholdHorizontal: computed(state => state.model.screenWidth * 0.4),
  swiperThresholdVertical: computed(state => state.model.screenHeight * 0.4),

  // action

  setIsMovingChapterLock: action((state, payload) => {
    if (typeof payload !== 'boolean')
      throw new Error(
        'setIsMovingChapterLock() :: 카테고리 선택은 boolean 이어야 합니다.',
      );

    state.model.isMovingChapterLock = payload;
  }),

  // setHasCandidateChapter: action((state, payload) => {
  //   if (typeof payload !== 'boolean')
  //     throw new Error(
  //       'setHasCandidateChapter() :: 카테고리 선택은 boolean 이어야 합니다.',
  //     );

  //   state.model.hasCandidateChapter = payload;
  // }),

  // 카테고리가 선택 되었는지 설정
  setCategorySelected: action((state, payload) => {
    if (typeof payload !== 'boolean')
      throw new Error(
        'setCategorySelected() :: 카테고리 선택은 boolean 이어야 합니다.',
      );

    const isCategorySelected = payload;
    state.model.isCategorySelected = isCategorySelected;
  }),

  // setCandidateSelected: action((state, payload) => {
  //   if (typeof payload !== 'boolean')
  //     throw new Error(
  //       'setCategorySelected() :: 카테고리 선택은 boolean 이어야 합니다.',
  //     );

  //   const isCandidateSelected = payload;
  //   state.model.isCandidateSelected = isCandidateSelected;
  // }),

  // 마지막 카테고리 인덱스를 설정 (첫 렌더에 설정)
  setLastCategoryIdx: action((state, payload) => {
    if (typeof payload !== 'number')
      throw new Error(
        'setLastCategoryIdx() :: 마지막 카테고리 인덱스는 반드시 number 이어야 합니다.',
      );
    const lastCategoryIdx = payload;
    state.model.lastCategoryIdx = lastCategoryIdx;
  }),

  // 마지막 챕터 인덱스를 설정 (첫 렌더에 설정)
  setLastChapterIdx: action((state, payload) => {
    if (typeof payload !== 'number')
      throw new Error(
        'setLastChapterIdx() :: 마지막 챕터 인덱스는 반드시 number 이어야 합니다.',
      );

    const lastChapterIdx = payload;
    state.model.lastChapterIdx = lastChapterIdx;
  }),

  setLastCandidateIdx: action((state, payload) => {
    if (typeof payload !== 'number')
      throw new Error(
        'setLastCandidateIdx() :: 마지막 후보 인덱스는 반드시 number 이어야 합니다.',
      );

    const lastCandidateIdx = payload;
    state.model.lastCandidateIdx = lastCandidateIdx;
  }),

  // 리셋
  reset: action((state, payload) => {
    const { lastCategoryIdx, lastChapterIdx } = payload;

    if (typeof lastCategoryIdx !== 'number')
      throw new Error(
        'reset() :: 마지막 카테고리 인덱스는 number 이어야 합니다.',
      );

    if (typeof lastChapterIdx !== 'number')
      throw new Error('reset() :: 마지막 챕터 인덱스는 number 이어야 합니다.');

    state.model.isCategorySelected = false;

    // TODO: 초기화된 카테고리로 이동
    state.model.currentCategoryIdx = 0;
    // TODO: 초기화된 챕터로 이동
    state.model.currentChapterIdx = 0;
  }),

  // moveToCategory + moveToChapter 한꺼번에
  moveTo: action((state, payload) => {
    const { targetCategoryIdx, targetChapterIdx } = payload;

    if (typeof targetCategoryIdx !== 'number')
      throw new Error(
        'moveTo() :: 타겟 카테고리 인덱스는 number 이어야 합니다.',
      );

    if (typeof targetChapterIdx !== 'number')
      throw new Error('moveTo() :: 타겟 챕터 인덱스는 number 이어야 합니다.');

    // TODO: 이동 및 스와이프 처리
  }),

  // 타겟 카테고리 인덱스로 이동
  moveToCategory: action((state, payload) => {
    if (typeof payload !== 'number')
      throw new Error(
        'moveToCategory() :: 타겟 카테고리 인덱스는 number 이어야 합니다.',
      );

    const targetCategoryIdx = payload;

    // TODO: 이동 및 swipe 처리
    // TODO: 이동 후 chpater 0 으로 갈지 결정
  }),

  // 타겟 챕터 인덱스로 이동
  moveToChapter: action((state, payload) => {
    if (typeof payload !== 'number')
      throw new Error(
        'moveToChapter() :: 타겟 챕터 인덱스는 number 이어야 합니다.',
      );

    const targetChapterIdx = payload;

    // TODO: 이동 및 swipe 처리
  }),

  // 옆으로 스와이프: 카테고리 인덱스는 변화 X, 챕터 + 1 -> 다음 챕터로 감
  swipeToLeft: action((state, payload) => {
    if (!state.model.isCategorySelected) {
      state.model.isCategorySelected = true;
      // console.log('select!');
    }

    state.model.currentChapterIdx += 1;
    displayIdxStatus(state);
  }),

  // 우측으로 스와이프: 카테고리 인덱스 변화 X, 챕터 - 1 -> 이전 챕터로 이동
  swipeToRight: action((state, payload) => {
    if (state.model.currentChapterIdx === 1) {
      state.model.isCategorySelected = false;
      // console.log('deselect!');
    }

    // TODO: 마지막 뷰어에서 뒤로 이동할때는 같은 장르내에서 전 챕터로 이동이 되도록 해주세요~
    state.model.currentChapterIdx -= 1;

    displayIdxStatus(state);
  }),

  // 위로 스와이프: 카테고리 + 1, 챕터 변화 X -> 다음 카테고리로 이동
  swipeToUp: action((state, payload) => {
    if (state.model.isCategorySelected) {
      state.model.currentCandidateIdx += 1;
    } else {
      state.model.currentCategoryIdx += 1;
    }

    displayIdxStatus(state);
  }),

  // 아래로 스와이프: 카테고리 - 1, 챕터 변화 X -> 이전 카테고리로 이동
  swipeToDown: action((state, payload) => {
    if (state.model.isCategorySelected) {
      // if (!state.model.hasCandidateChapter) {
      //   state.model.currentCategoryIdx -= 1;
      // }
      state.model.currentCandidateIdx -= 1;
    } else {
      state.model.currentCategoryIdx -= 1;
    }

    displayIdxStatus(state);
  }),
};
