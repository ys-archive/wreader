import React from 'react';
import { Animated, View } from 'react-native';
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
    <>
      <Animated.View style={[getStyle()]}>{children}</Animated.View>
      {/* 스와이프 View (overlay) + 카드 View - touch through 안 되서 고정 으로 스와이프 범위를 정했음  */}
      {/* 윗 부분 터치 */}
      <GestureRecognizer
        onSwipeUp={onSwipeUp}
        onSwipeDown={onSwipeDown}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        config={{
          velocityThreshold: 0.4,
          directionalOffsetThreshold: 80,
        }}
        style={{
          minWidth: wp('95%'),
          minHeight: hp('76%'),
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 10,
          backgroundColor: 'rgba(255,255,255, 0.2)',
        }}
      />
      {/* 아랫 부분 터치 */}
      {/* <GestureRecognizer
        onSwipeUp={onSwipeUp}
        onSwipeDown={onSwipeDown}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        config={{
          velocityThreshold: 0.4,
          directionalOffsetThreshold: 80,
        }}
        style={{
          minWidth: wp('95%'),
          minHeight: hp('12%'),
          position: 'absolute',
          left: 0,
          top: hp('88%'),
          zIndex: 10,
          backgroundColor: 'rgba(255,255,255, 0.7)',
        }}
      /> */}
    </>
  );
};

export default Reader;

const s = StyleSheet.create({
  root: {
    // minWidth: wp('100%'),
    // minHeight: hp('100%'),
    // position: 'absolute',
    // left: 0,
    // top: 0,
    // zIndex: 5,
    // opacity: 1,
    backgroundColor: 'rgba(255,255,255, 0.2)',
  },
});
