import { useStoreState, useStoreActions } from 'easy-peasy';
import {
  selectIsLastChapter,
  selectIsFirstChapter,
  selectIsMovingChapterLock,
  selectCurrentCandidateIdx,
} from '#store/selectors';
import { actionsSwipeToLeft, actionsSwipeToRight } from '#store/actions';

export const useSwipeHorizontal = forceSwipeHorizontally => {
  const swipeToLeft = useStoreActions(actionsSwipeToLeft);
  const swipeToRight = useStoreActions(actionsSwipeToRight);

  // const isCategorySelected = useStoreState(selectIsCategorySelected);
  // const setCategorySelectedDelayed = useStoreActions(
  //   actionsSetCategorySelectedDelayed,
  // );

  const isMovingChapterLock = useStoreState(selectIsMovingChapterLock);

  const isFirstChapter = useStoreState(selectIsFirstChapter);
  const isLastChapter = useStoreState(selectIsLastChapter);

  const currentCandidateIdx = useStoreState(selectCurrentCandidateIdx);

  const onSwipeLeft = state => {
    if (isMovingChapterLock) {
      console.log('챕터 이동이 잠겼습니다');
      return;
    }

    if (isLastChapter) {
      console.log('마지막 챕터, 1챕터 이전으로 강제 이동');
      onSwipeRight(state);
      return;
    }

    if (currentCandidateIdx !== 0) {
      console.log('현재 후보 챕터 선택 중입니다.');
      return;
    }

    forceSwipeHorizontally('left');
    swipeToLeft();
  };

  const onSwipeRight = state => {
    if (isMovingChapterLock) {
      console.log('챕터 이동이 잠겼습니다');
      return;
    }

    if (isFirstChapter) {
      console.log('첫 챕터 도달');
      return;
    }

    if (currentCandidateIdx !== 0) {
      console.log('현재 후보 챕터 선택 중입니다.');
      return;
    }

    forceSwipeHorizontally('right');
    swipeToRight();
  };

  return {
    onSwipeLeft,
    onSwipeRight,
  };
};
