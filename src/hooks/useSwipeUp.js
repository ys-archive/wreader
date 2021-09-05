import { DEPTH_NAME } from '../store/reducers/swiper.depth';
import { useSwipeStates } from './useSwipeStates';

export const useSwipeUp = forceSwipeVertically => {
  const states = useSwipeStates();

  return () => {
    const shared = () => {
      forceSwipeVertically('up');
      // swipeToUp();
    };

    switch (depth) {
      case DEPTH_NAME.CATEGORY:
        const { isLastCategory, increaseCategoryIdx } = states;
        return state => {
          if (isLastCategory) return;

          increaseCategoryIdx();
          
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
    // if (lastCandidateIdx === 0 && isCategorySelected) {
    //   console.log(
    //     '현재 카테고리가 선택되어, 챕터 간 이동만 가능 (후보 챕터도 없음)',
    //   );
    //   return;
    // }

    // if (isLastCategory) {
    //   console.log('마지막 카테고리 도달');
    //   return;
    // }

    // if (isMovingCategoryLock) {
    //   console.log('카테고리 이동이 잠겼습니다.');
    //   return;
    // }

    // console.log('currentCandidateIdx: ', currentCandidateIdx);
    // console.log('lastCandidateIdx: ', lastCandidateIdx);

    // if (
    //   lastCandidateIdx !== 0 &&
    //   currentCandidateIdx + 1 === lastCandidateIdx
    // ) {
    //   setTimeout(() => {
    //     console.log('새 카드 작성 후 위치 복귀');
    //     forceSwipeVertically('down');
    //     swipeToDown();
    //   }, 1000);
    // }
  };
};
