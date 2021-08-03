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
      {/* 스와이프 View (overlay) + 카드 View - touch through 안 되서 고정 으로 스와이프 범위를 정했음  */}
      {/* 윗 부분 터치 */}
      <GestureRecognizer
        onSwipeUp={onSwipeUp}
        onSwipeDown={onSwipeDown}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        // onSwipe={(gestureName, state) => console.log('swipe!: ', gestureName)}
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
      <GestureRecognizer
        onSwipeUp={onSwipeUp}
        onSwipeDown={onSwipeDown}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        // onSwipe={(gestureName, state) => console.log('swipe!: ', gestureName)}
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
      />
    </>
  );
};

export default Reader;
