import { useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_OUT_DURATION = 300;

const swipeAmount = {
  x: 0,
  y: 0,
};

export const useSwipeGesture = () => {
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const forceSwipeVertically = dir => {
    const isUp = dir === 'up';
    const delta = SCREEN_HEIGHT * (isUp ? -1 : 1);
    swipeAmount.y += delta;
    Animated.timing(position, {
      toValue: { x: swipeAmount.x, y: swipeAmount.y },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const forceSwipeHorizontally = dir => {
    const isLeft = dir === 'left';
    const delta = SCREEN_WIDTH * (isLeft ? -1 : 1);
    swipeAmount.x += delta;
    Animated.timing(position, {
      toValue: { x: swipeAmount.x, y: swipeAmount.y },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: true,
    }).start();
  };

  // const onSwipeComplete = dir => {
  //   // position.setValue({ x: 0, y: 0 });
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  // };

  const getStyle = () => {
    const { x: translateX, y: translateY } = position;
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
