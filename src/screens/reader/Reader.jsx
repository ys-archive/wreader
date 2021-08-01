import React from 'react';
import { Animated } from 'react-native';
import { StyleSheet } from '#components';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useSwipeGesture, useSwipeHorizontal, useSwipeVertical } from '#hooks';

const Reader = ({ children }) => {
  const { forceSwipeVertically, forceSwipeHorizontally, getStyle } =
    useSwipeGesture();

  const { onSwipeLeft, onSwipeRight } = useSwipeHorizontal(
    forceSwipeHorizontally,
  );

  const { onSwipeUp, onSwipeDown } = useSwipeVertical(forceSwipeVertically);

  return (
    <GestureRecognizer
      onSwipeUp={onSwipeUp}
      onSwipeDown={onSwipeDown}
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      // config={{
      //   velocityThreshold: 0.4,
      //   directionalOffsetThreshold: 80,
      // }}
    >
      <Animated.View style={[getStyle(), s.root]}>{children}</Animated.View>
    </GestureRecognizer>
  );
};

export default Reader;

const s = StyleSheet.create({
  root: {
    opacity: 1,
    // flex: 1,
  },
});
