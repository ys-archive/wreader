import { useStoreState, useStoreActions } from 'easy-peasy';
import { selData, selSwiper } from '../store/selectors';
import { actSwiper } from '../store/actions';
import { DEPTH_NAME } from '../store/reducers/swiper.depth';
import { useSwipeStates } from './useSwipeStates';

export const useSwipeLeft = forceSwipeHorizontally => {
  const states = useSwipeStates();
  if (!states.isLoaded) return null;

  return () => {
    const shared = () => {
      forceSwipeHorizontally('left');
      // swipeToLeft();
    };

    switch (states.depth) {
      case DEPTH_NAME.CATEGORY:
        const { coords, chapters } = states;
        return state => {
          if (!chapters[coords.d1]) {
            console.log('해당 카테고리의 챕터가 존재하지 않음');
            return;
          }

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

    // if (isMovingChapterLock) {
    //   console.log('챕터 이동이 잠겼습니다');
    //   return;
    // }

    // if (isLastChapter) {
    //   console.log('마지막 챕터, 1챕터 이전으로 강제 이동');
    //   onSwipeRight(state);
    //   return;
    // }

    // if (isCategorySelected && isLastCandidateNext) {
    //   console.log('마지막 candidate next 챕터 도달');
    //   return;
    // }

    // if (currentCandidateIdx !== 0) {
    //   console.log('현재 후보 챕터 선택 중입니다.');
    //   return;
    // }
  };
};
