import { useRef } from 'react';
import { Animated, Dimensions, LayoutAnimation } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_OUT_DURATION = 250;

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
    // swipeYAmount = Math.min(0, swipeYAmount);
    // Animated.add(swipeYAmount, new Animated.Value(delta));
    Animated.timing(position, {
      toValue: { x: swipeAmount.x, y: swipeAmount.y },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: true,
    }).start(); // () => onSwipeComplete(dir)
  };

  const forceSwipeHorizontally = dir => {
    const isLeft = dir === 'left';
    const delta = SCREEN_WIDTH * (isLeft ? -1 : 1);
    swipeAmount.x += delta;
    // swipeXAmount = Math.min(0, swipeXAmount);
    // Animated.add(swipeXAmount, new Animated.Value(delta));
    Animated.timing(position, {
      toValue: { x: swipeAmount.x, y: swipeAmount.y },
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
