import { useRef } from 'react';
import { Animated, Dimensions, LayoutAnimation } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_OUT_DURATION = 250;

export const useSwipeGesture = (position, swipeXAmount, swipeYAmount) => {
  const forceSwipeVertically = dir => {
    const isUp = dir === 'up';
    const delta = SCREEN_HEIGHT * (isUp ? -1 : 1);
    swipeYAmount += delta;
    Animated.timing(position, {
      toValue: { x: swipeXAmount, y: swipeYAmount },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: true,
    }).start(); // () => onSwipeComplete(dir)
  };

  const forceSwipeHorizontally = dir => {
    const isLeft = dir === 'left';
    const delta = SCREEN_WIDTH * (isLeft ? -1 : 1);
    swipeXAmount += delta;
    Animated.timing(position, {
      toValue: { x: swipeXAmount, y: swipeYAmount },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: true,
    }).start(); // () => onSwipeComplete(dir)
  };

  // const onSwipeComplete = dir => {
  //   // position.setValue({ x: 0, y: 0 });
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  // };

  const getStyle = () => {
    const { x: translateX, y: translateY } = position;
    // let finalX = translateX;
    // let finalY = translateY;

    // if (isNaN(finalX)) {
    //   console.log('x is nan');
    //   finalX = 0;
    // }

    // if (isNaN(finalY)) {
    //   console.log('y is nan');
    //   finalY = 0;
    // }

    return {
      transform: [{ translateX }, { translateY }],
    };
  };

  return {
    forceSwipeVertically,
    forceSwipeHorizontally,
    getStyle,
  };
};
