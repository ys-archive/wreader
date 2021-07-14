import { useRef } from 'react';
import { Animated, Dimensions, LayoutAnimation } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_OUT_DURATION = 250;

export const useSwipeGesture = (position, swipeXAmount, swipeYAmount) => {
  const forceSwipeVertically = dir => {
    const isUp = dir === 'up';
    // if (isUp && swipeYAmount <= 0) {
    // }

    // if (!isUp && swipeYAmount > 10000) {
    // }
    const delta = SCREEN_HEIGHT * (isUp ? -1 : 1);
    // console.log(delta);
    swipeYAmount += delta;
    // console.log(swipeYAmount);
    Animated.timing(position, {
      toValue: { x: swipeXAmount, y: swipeYAmount },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: true,
    }).start(() => onSwipeComplete(dir));
  };

  const forceSwipeHorizontally = dir => {
    const isLeft = dir === 'left';
    const delta = SCREEN_WIDTH * (isLeft ? -1 : 1);
    // console.log(delta);
    swipeXAmount += delta;
    // console.log(swipeXAmount);
    Animated.timing(position, {
      toValue: { x: swipeXAmount, y: swipeYAmount },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: true,
    }).start(() => onSwipeComplete(dir));
  };

  // const resetPosition = () => {
  //   Animated.spring(position, {
  //     toValue: { x: 0, y: 0 },
  //     useNativeDriver: true,
  //   }).start();
  // };

  const onSwipeComplete = dir => {
    // const item = data[cardIdx];
    // dir === 'left' ? onSwipeLeft(item) : onSwipeRight(item);
    // position.setValue({ x: 0, y: 0 });
    // setCardIdx(prv => prv + 1);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };

  const getCardStyle = () => {
    // const rotate = position.x.interpolate({
    //   inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
    //   outputRange: ['-120deg', '0deg', '120deg'],
    // });

    // const translateX = position.x.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [0, 100],
    // });

    // const translateY = position.y.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [0, 100],
    // });
    const { x: translateX, y: translateY } = position;
    return {
      // ...position.getLayout(),
      transform: [{ translateX }, { translateY }],
    };
  };

  return {
    forceSwipeVertically,
    forceSwipeHorizontally,
    // resetPosition,
    getCardStyle,
    onSwipeComplete,
  };
};
