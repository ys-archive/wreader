import { DEPTH_NAME } from '../store/reducers/swiper.depth';
import { useSwipeStates } from './useSwipeStates';

export const useSwipeRight = forceSwipeHorizontally => {
  const {
    categories,
    chapters,
    isLoaded,

    depth,
    coords,
    maxCoords,

    setDepth,
    increaseDepth,
    decreaseDepth,

    setCoords,
    setMaxCoords,
    increaseCoords,
    decreaseCoords,
  }  = useSwipeStates();
  if (!isLoaded) return null;

  return () => {
    const shared = () => {
      console.log('swipe to right');
      forceSwipeHorizontally('right');
      // swipeToRight();
    };

    switch (depth) {
      case DEPTH_NAME.CATEGORY:
        return state => {
          console.log('카테고리에서 우측 스와이프는 허용되지 않음.');
        };

      case DEPTH_NAME.CHAPTER:
        return state => {
          if (coords.d1 === 0) {
            decreaseDepth();
          }

          if (coords.d1 > 0) {
            decreaseCoords('d1');
          }

          shared();
        };

      case DEPTH_NAME.USER_CHAPTER:
        return state => {
          console.log('유저 챕터에서 우측 스와이프는 허용되지 않음.');
        };

      case DEPTH_NAME.NEXT:
        return state => {
          shared();
        };

      default:
        throw new Error('depth 는 0~3 사이만 가능 depth: ', depth);
    }

    // if (isMovingChapterLock) {
    //   console.log('챕터 이동이 잠겼습니다');
    //   return;
    // }

    // if (isFirstChapter && isFirstCandidateNext) {
    //   console.log('첫 챕터 도달');
    //   return;
    // }

    // if (isCategorySelected && !isFirstCandidateNext && !isFirstCandidate) {
    //   console.log('첫 candidate next 챕터 도달');
    //   return;
    // }

    // if (currentCandidateIdx !== 0) {
    //   console.log('현재 후보 챕터 선택 중입니다.');
    //   return;
    // }
  };
};
