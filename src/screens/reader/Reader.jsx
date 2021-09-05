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
  useSwipeLeft,
  useSwipeRight,
  useSwipeUp,
  useSwipeDown,
} from '../../hooks';

const swipeConfig = {
  velocityThreshold: Platform.select({ ios: 0.4, android: 0.2 }),
  directionalOffsetThreshold: 60,
};

const Reader = ({ children }) => {
  const { forceSwipeVertically, forceSwipeHorizontally, getStyle } =
    useSwipeGesture();

  const swipeLeft = useSwipeLeft(forceSwipeHorizontally);
  const swipeRight = useSwipeRight(forceSwipeHorizontally);
  const swipeUp = useSwipeUp(forceSwipeVertically);
  const swipeDown = useSwipeDown(forceSwipeVertically);

  return (
    <View style={s.root}>
      <GestureRecognizer
        onSwipeLeft={state => swipeLeft()(state)}
        onSwipeRight={state => swipeRight()(state)}
        onSwipeUp={state => swipeUp()(state)}
        onSwipeDown={state => swipeDown()(state)}
        config={swipeConfig}
        style={s.recognizer}
      >
        {children}
        {/* <Animated.View style={[getStyle()]}>{children}</Animated.View> */}
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
