import { DEPTH_NAME } from '../store/reducers/swiper.depth';
import { useSwipeStates } from './useSwipeStates';

export const useSwipeUp = forceSwipeVertically => {
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
  } = useSwipeStates();
  if (!isLoaded) return null;

  return () => {
    const shared = () => {
      console.log('swipe to up');
      forceSwipeVertically('up');
      // swipeToUp();
    };

    switch (depth) {
      case DEPTH_NAME.CATEGORY:
        return state => {
          if (maxCoords.d0 !== 0 && coords.d0 === maxCoords.d0 - 1) {
            console.log('마지막 카테고리라 아랫 카드가 없음');
            return;
          }

          increaseCoords('d0');

          shared();
        };

      case DEPTH_NAME.CHAPTER:
        return state => {
          // 현재 카테고리의
          // 현재 챕터의
          // 유저 챕터
          if (!chapters[coords.d0][coords.d1].child[coords.d2]) {
            console.log(
              '해당 챕터의 유저 챕터가 존재 하지 않음. 새로운 카드 작성',
            );
            // todo: 새 카드 작성
            return;
          }

          increaseDepth();
          setMaxCoords({ d2: chapters });
          // if (depth === 1) {
          //   // increaseCoords('d2');
          // }

          shared();
        };

      case DEPTH_NAME.USER_CHAPTER:
        return state => {
          if (maxCoords.d2 !== 0 && coords.d2 === maxCoords.d2 - 1) {
            console.log('마지막 유저 챕터, 아랫 카드가 없음');
            return;
          }

          increaseCoords('d2');

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
