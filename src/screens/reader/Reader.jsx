import React from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useSwipeGesture } from '#hooks';
import { useStoreState, useStoreActions } from 'easy-peasy';
import {
  persistIsLastCategory,
  persistIsFirstCategory,
  persistIsLastChapter,
  persistIsFirstChapter,
  selectIsCategorySelected,
} from '#store/selectors';
import {
  // actionsReset,
  actionsSwipeToLeft,
  actionsSwipeToRight,
  actionsSwipeToUp,
  actionsSwipeToDown,
} from '#store/actions';

const Reader = ({ children }) => {
  const isFirstCategory = useStoreState(persistIsFirstCategory);
  const isLastCategory = useStoreState(persistIsLastCategory);
  const isFirstChapter = useStoreState(persistIsFirstChapter);
  const isLastChapter = useStoreState(persistIsLastChapter);
  const isCategorySelected = useStoreState(selectIsCategorySelected);

  // const reset = useStoreActions(actionsReset);
  const swipeToLeft = useStoreActions(actionsSwipeToLeft);
  const swipeToRight = useStoreActions(actionsSwipeToRight);
  const swipeToUp = useStoreActions(actionsSwipeToUp);
  const swipeToDown = useStoreActions(actionsSwipeToDown);

  const { forceSwipeVertically, forceSwipeHorizontally, getStyle } =
    useSwipeGesture();

  const onSwipeLeft = state => {
    if (isLastChapter) {
      console.log('마지막 챕터, 1챕터 이전으로 강제 이동');
      // TODO: 마지막 챕터에 도달하면, 1챕터 이전으로 돌아간다
      onSwipeRight(state);
      // console.log("you can't swipe left on the last chapter");
    }

    forceSwipeHorizontally('left');
    swipeToLeft();
  };

  const onSwipeRight = state => {
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

  return (
    <GestureRecognizer
      onSwipeUp={onSwipeUp}
      onSwipeDown={onSwipeDown}
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      config={{
        velocityThreshold: 0.4,
        directionalOffsetThreshold: 80,
      }}
      style={[getStyle()]}
    >
      {children}
    </GestureRecognizer>
  );
};

export default Reader;

// const s = StyleSheet.create({
//   root: {
//     flex: 1,
//   },
// });
