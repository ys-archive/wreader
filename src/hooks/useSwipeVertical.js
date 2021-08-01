import { useStoreState, useStoreActions } from 'easy-peasy';
import {
  selectIsLastCategory,
  selectIsFirstCategory,
  selectIsCategorySelected,
  selectIsLastCandidate,
  selectLastCandidateIdx,
  selectIsMovingCategoryLock,
  selectCurrentCandidateIdx
} from '#store/selectors';
import { actionsSwipeToUp, actionsSwipeToDown } from '#store/actions';

export const useSwipeVertical = forceSwipeVertically => {
  const swipeToUp = useStoreActions(actionsSwipeToUp);
  const swipeToDown = useStoreActions(actionsSwipeToDown);

  const isFirstCategory = useStoreState(selectIsFirstCategory);
  const isLastCategory = useStoreState(selectIsLastCategory);
  const isCategorySelected = useStoreState(selectIsCategorySelected);
  const isMovingCategoryLock = useStoreState(selectIsMovingCategoryLock);

  const lastCandidateIdx = useStoreState(selectLastCandidateIdx);
  const isLastCandidate = useStoreState(selectIsLastCandidate);
  const currentCandidateIdx = useStoreState(selectCurrentCandidateIdx);


  const onSwipeUp = state => {
    if (isLastCandidate && isCategorySelected) {
      console.log(
        '현재 카테고리가 선택되어, 챕터 간 이동만 가능 (후보 챕터도 없음)',
      );
      return;
    }

    if (isLastCategory) {
      console.log('마지막 카테고리 도달');
      return;
    }

    if (isMovingCategoryLock) {
      console.log('카테고리 이동이 잠겼습니다.');
      return;
    }

    console.log('currentCandidateIdx: ', currentCandidateIdx);
    console.log('lastCandidateIdx: ', lastCandidateIdx);

    forceSwipeVertically('up');
    swipeToUp();
  };

  const onSwipeDown = state => {
    if (currentCandidateIdx <= 0 && isCategorySelected) {
      console.log(
        '현재 카테고리가 선택되어, 챕터 간 이동만 가능 (후보 챕터도 없음)',
      );
      return;
    }

    if (currentCandidateIdx <= 0 && isFirstCategory) {
      console.log('첫 카테고리 도달');
      return;
    }

    if (isMovingCategoryLock) {
      console.log('카테고리 이동이 잠겼습니다.');
      return;
    }

    console.log('currentCandidateIdx: ', currentCandidateIdx);
    console.log('lastCandidateIdx: ', lastCandidateIdx);

    forceSwipeVertically('down');
    swipeToDown();
  };

  return {
    onSwipeUp,
    onSwipeDown,
  };
};
