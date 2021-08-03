import React from 'react';
import { View, Animated } from 'react-native';
import { StyleSheet } from '#components';
import GestureRecognizer from 'react-native-swipe-gestures';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSwipeGesture, useSwipeHorizontal, useSwipeVertical } from '#hooks';

const Reader = ({ children }) => {
  const { forceSwipeVertically, forceSwipeHorizontally, getStyle } =
    useSwipeGesture();

  const { onSwipeLeft, onSwipeRight } = useSwipeHorizontal(
    forceSwipeHorizontally,
  );

  const { onSwipeUp, onSwipeDown } = useSwipeVertical(forceSwipeVertically);

  return (
    <View style={s.root}>
      <Animated.View style={[getStyle(), s.root]}>{children}</Animated.View>
      <GestureRecognizer
        onSwipeUp={onSwipeUp}
        onSwipeDown={onSwipeDown}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        onSwipe={(gestureName, state) => console.log('swipe!: ', gestureName)}
        config={{
          velocityThreshold: 0.4,
          directionalOffsetThreshold: 80,
        }}
        style={{
          minWidth: wp('95%'),
          minHeight: hp('80%'),
          position: 'absolute',
          left: 0,
          top: 0,
          // zIndex: 5,
          backgroundColor: 'rgba(255,255,255, 0.5)',
        }}
      />
    </View>
  );
};

export default Reader;

const s = StyleSheet.create({
  root: {
    opacity: 1,
  },
});
