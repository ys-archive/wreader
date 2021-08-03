import React from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSwipeHorizontal, useSwipeVertical } from '#hooks';

const Reader = ({ forceSwipeVertically, forceSwipeHorizontally }) => {
  const { onSwipeLeft, onSwipeRight } = useSwipeHorizontal(
    forceSwipeHorizontally,
  );
  const { onSwipeUp, onSwipeDown } = useSwipeVertical(forceSwipeVertically);

  return (
    <>
      <GestureRecognizer
        onSwipeUp={onSwipeUp}
        onSwipeDown={onSwipeDown}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        onSwipe={(gestureName, state) => console.log('swipe!: ', gestureName)}
        // onSwipeStart={e => console.log('touch start on reader!')}
        config={{
          velocityThreshold: 0.4,
          directionalOffsetThreshold: 80,
        }}
        // pointerEvents="auto"
        style={{
          minWidth: wp('95%'),
          minHeight: hp('81%'),
          // minHeight: hp('100%'),
          position: 'absolute',
          left: 0,
          top: 0,
          // backgroundColor: 'rgba(255,255,255, 0.2)',
        }}
      />
      <GestureRecognizer
        onSwipeUp={onSwipeUp}
        onSwipeDown={onSwipeDown}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        onSwipe={(gestureName, state) => console.log('swipe!: ', gestureName)}
        // onSwipeStart={e => console.log('touch start on reader!')}
        config={{
          velocityThreshold: 0.4,
          directionalOffsetThreshold: 80,
        }}
        style={{
          minWidth: wp('95%'),
          minHeight: hp('81%'),
          // minHeight: hp('100%'),
          position: 'absolute',
          left: 0,
          top: hp('88%'),
          // backgroundColor: 'rgba(255,255,255, 0.7)',
        }}
      />
    </>
  );
};

export default Reader;
