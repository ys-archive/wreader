import React from 'react';
import { StyleSheet } from '#components';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useSwipeGesture } from '#hooks';
import { useStoreState, useStoreActions } from 'easy-peasy';
import {
  selectIsLastCategory,
  selectIsFirstCategory,
  selectIsLastChapter,
  selectIsFirstChapter,
  selectIsCategorySelected,
  selectCurrentCategoryIdx,
  selectCurrentChapterIdx,
  selectIsMovingChapterLock,
} from '#store/selectors';
import {
  // actionsReset,
  actionsSwipeToLeft,
  actionsSwipeToRight,
  actionsSwipeToUp,
  actionsSwipeToDown,
  actionsSetLastCategoryIdx,
  actionsSetLastChapterIdx,
  actionsSetIsMovingChapterLock,
} from '#store/actions';

const Reader = ({ data, children }) => {
  const isFirstCategory = useStoreState(selectIsFirstCategory);
  const isLastCategory = useStoreState(selectIsLastCategory);
  const isFirstChapter = useStoreState(selectIsFirstChapter);
  const isLastChapter = useStoreState(selectIsLastChapter);
  const isCategorySelected = useStoreState(selectIsCategorySelected);

  // const reset = useStoreActions(actionsReset);
  const swipeToLeft = useStoreActions(actionsSwipeToLeft);
  const swipeToRight = useStoreActions(actionsSwipeToRight);
  const swipeToUp = useStoreActions(actionsSwipeToUp);
  const swipeToDown = useStoreActions(actionsSwipeToDown);

  // const setLastCategoryIdx = useStoreActions(actionsSetLastCategoryIdx);
  // const setLastChapterIdx = useStoreActions(actionsSetLastChapterIdx);
  // const currentCategoryIdx = useStoreState(selectCurrentCategoryIdx);
  // const currentChapterIdx = useStoreState(selectCurrentChapterIdx);

  // const setIsMovingChapterLock = useStoreActions(actionsSetIsMovingChapterLock);
  const isMovingChapterLock = useStoreState(selectIsMovingChapterLock);

  const { forceSwipeVertically, forceSwipeHorizontally, getStyle } =
    useSwipeGesture();

  const onSwipeLeft = state => {
    if (isMovingChapterLock) {
      console.log('챕터 이동이 잠겼습니다');
      return;
    }

    if (isLastChapter) {
      console.log('마지막 챕터, 1챕터 이전으로 강제 이동');
      // TODO: 마지막 챕터에 도달하면, 1챕터 이전으로 돌아간다
      onSwipeRight(state);
      // console.log("you can't swipe left on the last chapter");
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

    forceSwipeHorizontally('right');
    swipeToRight();
  };

  const onSwipeUp = state => {
    if (isCategorySelected) {
      console.log('현재 카테고리가 선택되어, 챕터 간 이동만 가능');
      return;
    }

    if (isLastCategory) {
      console.log('마지막 카테고리 도달');
      return;
    }

    forceSwipeVertically('up');
    swipeToUp();
  };

  const onSwipeDown = state => {
    if (isCategorySelected) {
      console.log('현재 카테고리가 선택되어, 챕터 간 이동만 가능');
      return;
    }

    if (isFirstCategory) {
      console.log('첫 카테고리 도달');
      return;
    }

    forceSwipeVertically('down');
    swipeToDown();
  };

  const onSwipe = (gestureName, state) => {
    // const totalCategoryCount = data.item.length;
    // const totalChapterCount = data.item[currentCategoryIdx].chapter.length;
    // console.log('총 카테고리 개수: ', totalCategoryCount);
    // console.log('현재 카테고리 인덱스: ', currentCategoryIdx);
    // console.log('현재 챕터 인덱스: ', currentChapterIdx);
    // console.log('현재 카테고리의 총 챕터 개수: ', totalChapterCount);
    // console.log(
    //   '------------------------------------------------------------------------',
    // );

    // setIsMovingChapterLock(totalChapterCount <= 0);

    // setLastCategoryIdx(totalCategoryCount);
    // setLastChapterIdx(totalChapterCount);
  };

  return (
    <GestureRecognizer
      onSwipeUp={onSwipeUp}
      onSwipeDown={onSwipeDown}
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      onSwipe={onSwipe}
      config={{
        velocityThreshold: 0.4,
        directionalOffsetThreshold: 80,
      }}
      style={[getStyle(), s.root]}
    >
      {children}
    </GestureRecognizer>
  );
};

export default Reader;

const s = StyleSheet.create({
  root: {
    // height: 500
  },
});
