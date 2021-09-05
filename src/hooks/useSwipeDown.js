import { DEPTH_NAME } from '../store/reducers/swiper.depth';
import { useSwipeStates } from './useSwipeStates';

export const useSwipeDown = forceSwipeVertically => {
  const states = useSwipeStates();

  return () => {
    const shared = () => {
      forceSwipeVertically('down');
      // swipeToDown();
    };

    switch (depth) {
      case DEPTH_NAME.CATEGORY:
        const { isFirstCategory, decreaseCategoryIdx } = states;
        return state => {
          if (isFirstCategory) return; // 첫 카테고리에서 윗 카드가 없음

          decreaseCategoryIdx();

          shared();
        };

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
    // if (currentCandidateIdx <= 0 && isCategorySelected) {
    //   console.log(
    //     '현재 카테고리가 선택되어, 챕터 간 이동만 가능 (후보 챕터도 없음)',
    //   );
    //   return;
    // }

    // if (currentCandidateIdx <= 0 && isFirstCategory) {
    //   console.log('첫 카테고리 도달');
    //   return;
    // }

    // if (isMovingCategoryLock) {
    //   console.log('카테고리 이동이 잠겼습니다.');
    //   return;
    // }

    // console.log('currentCandidateIdx: ', currentCandidateIdx);
    // console.log('lastCandidateIdx: ', lastCandidateIdx);
  };
};
