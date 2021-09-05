import { useStoreState, useStoreActions } from 'easy-peasy';
import { selData, selSwiper } from '../store/selectors';
import { actSwiper } from '../store/actions';
import { DEPTH_NAME } from '../store/reducers/swiper.depth';
import { useSwipeStates } from './useSwipeStates';

export const useSwipeRight = forceSwipeHorizontally => {
  const states = useSwipeStates();
  return () => {
    const shared = () => {
      forceSwipeHorizontally('right');
      // swipeToRight();
    };

    switch (depth) {
      case DEPTH_NAME.CATEGORY:
        return undefined; // 카테고리 렌더에서는, 오른쪽 스와이프 X
      // return state => {
      //   shared();
      // };

      case DEPTH_NAME.CHAPTER:
        return state => {
          shared();
        };

      case DEPTH_NAME.USER_CHAPTER:
        return state => {
          shared();
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
