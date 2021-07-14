import React, { useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';
import { useSwipeGesture } from '#hooks';

const Reader = ({ children }) => {
  const position = useRef(new Animated.ValueXY()).current;
  let swipeXAmount = useRef(0).current;
  let swipeYAmount = useRef(0).current;

  const {
    forceSwipeVertically,
    forceSwipeHorizontally,
    // resetPosition,
    getCardStyle,
  } = useSwipeGesture(position, swipeXAmount, swipeYAmount);

  const onSwipeLeft = state => {
    console.log('swipe to left');
    forceSwipeHorizontally('left');
  };

  const onSwipeRight = state => {
    console.log('swipe to right');
    forceSwipeHorizontally('right');
  };

  const onSwipeUp = state => {
    console.log('swipe to up');
    forceSwipeVertically('up');
  };

  const onSwipeDown = state => {
    console.log('swipe to down');
    forceSwipeVertically('down');
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
      style={[getCardStyle()]}
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
