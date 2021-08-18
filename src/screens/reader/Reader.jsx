import React from 'react';
import { Animated, View, Platform } from 'react-native';
import { StyleSheet } from '#components';
import GestureRecognizer from 'react-native-swipe-gestures';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  useSwipeGesture,
  useSwipeHorizontal,
  useSwipeVertical,
} from '../../hooks';

const swipeConfig = {
  velocityThreshold: Platform.select({ ios: 0.4, android: 0.2 }),
  directionalOffsetThreshold: 60,
};

const Reader = ({ children }) => {
  const { forceSwipeVertically, forceSwipeHorizontally, getStyle } =
    useSwipeGesture();

  const { onSwipeLeft, onSwipeRight } = useSwipeHorizontal(
    forceSwipeHorizontally,
  );
  const { onSwipeUp, onSwipeDown } = useSwipeVertical(forceSwipeVertically);

  return (
    <View style={s.root}>
      <GestureRecognizer
        onSwipeUp={onSwipeUp}
        onSwipeDown={onSwipeDown}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        config={swipeConfig}
        style={s.recognizer}
      >
        <Animated.View style={[getStyle()]}>{children}</Animated.View>
      </GestureRecognizer>
    </View>
  );
};

export default Reader;

const s = StyleSheet.create({
  root: {
    // flex: 1,
    // overflow: 'visible',
  },
  recognizer: {
    // minWidth: wp('100%'),
    // // maxWidth: wp('100%'),
    // minHeight: hp('100%'),
    // // maxHeight: hp('100%'),
    // position: 'absolute',
    // left: 0,
    // top: 0,
    // backgroundColor: 'rgba(255,255,255, 0.7)',
    minWidth: wp('95%'),
    minHeight: hp('76%'),
    position: 'absolute',
    // zIndex: 10,
    left: 0,
    top: 0,
    backgroundColor: 'rgba(255,255,255, 0.7)',
  },
});
