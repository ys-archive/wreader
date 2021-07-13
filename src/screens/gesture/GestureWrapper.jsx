import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GestureRecognizer, {
  swipeDirections,
} from 'react-native-swipe-gestures';

const GestureWrapper = ({ children }) => {
  const onSwipeLeft = state => {
    // setHorizontal(true);
  };

  const onSwipeRight = state => {
    // setHorizontal(true);
  };

  const onSwipeUp = state => {
    // setHorizontal(false);
  };

  const onSwipeDown = state => {
    // setHorizontal(false);
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
      style={{ flex: 1 }}
    >
      {children}
    </GestureRecognizer>
  );
};

export default GestureWrapper;

const s = StyleSheet.create({});
