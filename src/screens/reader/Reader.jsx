import React, { useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useSwipeGesture } from '#hooks';
import { useStoreState, useStoreActions } from 'easy-peasy';
import {
  selectIsLastCategory,
  selectIsFirstCategory,
  selectIsLastChapter,
  selectIsFirstChapter,
  selectIsCategorySelected,
} from '#store/selectors';
import {
  actionsReset,
  actionsSwipeToLeft,
  actionsSwipeToRight,
  actionsSwipeToUp,
  actionsSwipeToDown,
} from '#store/actions';

const Reader = ({ children }) => {
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

  const { forceSwipeVertically, forceSwipeHorizontally, getStyle } =
    useSwipeGesture();

  const onSwipeLeft = state => {
    // console.log('swipe to left');

    if (isLastChapter) {
      console.log("you can't swipe left on the last chapter");
    }

    forceSwipeHorizontally('left');
    swipeToLeft();

    // TODO: 마지막 뷰어에서 뒤로 이동할때는 같은 장르내에서 전 챕터로 이동이 되도록 해주세요~
  };

  const onSwipeRight = state => {
    // console.log('swipe to right');

    if (isFirstChapter) {
      console.log("you can't swipe right on the first chapter");
      return;
    }

    forceSwipeHorizontally('right');
    swipeToRight();
  };

  const onSwipeUp = state => {
    // console.log('swipe to up');

    if (isCategorySelected) {
      console.log("you can't swipe up on a category selected!");
      return;
    }

    if (isLastCategory) {
      console.log('last category');
      return;
    }

    forceSwipeVertically('up');
    swipeToUp();
  };

  const onSwipeDown = state => {
    // console.log('swipe to down');

    if (isCategorySelected) {
      console.log("you can't swipe down on a category selected!");
      return;
    }

    if (isFirstCategory) {
      console.log('first category');
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
      // config={{
      //   velocityThreshold: 0.1,
      //   directionalOffsetThreshold: 80,
      // }}
      style={[getStyle()]}
    >
      {children}
    </GestureRecognizer>
  );
};

export default Reader;

const s = StyleSheet.create({
  root: {
    flex: 1,
  },
});
