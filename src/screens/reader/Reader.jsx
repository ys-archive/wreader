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

  const reset = useStoreActions(actionsReset);
  const swipeToLeft = useStoreActions(actionsSwipeToLeft);
  const swipeToRight = useStoreActions(actionsSwipeToRight);
  const swipeToUp = useStoreActions(actionsSwipeToUp);
  const swipeToDown = useStoreActions(actionsSwipeToDown);

  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  let swipeXAmount = useRef(new Animated.Value(0)).current;
  let swipeYAmount = useRef(new Animated.Value(0)).current;

  const { forceSwipeVertically, forceSwipeHorizontally, getStyle } =
    useSwipeGesture(position, swipeXAmount, swipeYAmount);

  const onSwipeLeft = state => {
    console.log('swipe to left');
    if (!isLastChapter) {
      forceSwipeHorizontally('left');
      swipeToLeft();
    } else {
      forceSwipeHorizontally('right');
      swipeToRight();
    }
    // TODO: 마지막 뷰어에서 뒤로 이동할때는 같은 장르내에서 전 챕터로 이동이 되도록 해주세요~
  };

  const onSwipeRight = state => {
    console.log('swipe to right');
    if (isFirstChapter) {
      forceSwipeHorizontally('right');
    }
  };

  const onSwipeUp = state => {
    console.log('swipe to up');

    if (!isLastCategory) {
      forceSwipeVertically('up');
      swipeToUp();
    }
  };

  const onSwipeDown = state => {
    console.log('swipe to down');
    if (!isFirstCategory) {
      forceSwipeVertically('down');
      swipeToDown();
    }
  };

  return (
    <GestureRecognizer
      onSwipeUp={onSwipeUp}
      onSwipeDown={onSwipeDown}
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      config={{
        velocityThreshold: 0.1,
        directionalOffsetThreshold: 80,
      }}
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
