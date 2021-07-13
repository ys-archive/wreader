import { useRef } from 'react';
import { Animated, PanResponder, Dimensions } from 'react-native';
// import { PanGestureHandler } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = 0.4 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

export const useReaderAnimated = () => {
  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder() {
        return true;
      },

      onPanResponderMove(e, state) {
        const { dx, dy } = state;
        position.setValue({ x: dx, y: dy });
      },

      onPanResponderRelease(e, state) {
        const { dx, dy } = state;

        if (dx > SWIPE_THRESHOLD) {
          forceSwipeHorizontally('right');
        } else if (dx < -SWIPE_THRESHOLD) {
          forceSwipeHorizontally('left');
        } else if (dy > SWIPE_THRESHOLD) {
          forceSwipeVertically('up');
        } else if (dy < -SWIPE_THRESHOLD) {
          forceSwipeVertically('down');
        } else {
          resetPosition();
        }
      },
    }),
  ).current;

  const forceSwipeVertically = dir => {
    const isUp = dir === 'up';
    const swipeAmount = SCREEN_HEIGHT * 1.5 * (isUp ? -1 : 1);
    Animated.timing(position, {
      toValue: { x: 0, y: swipeAmount },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start();
  };

  const forceSwipeHorizontally = dir => {
    const isLeft = dir === 'left';
    const swipeAmount = SCREEN_HEIGHT * 1.5 * (isLeft ? -1 : 1);
    Animated.timing(position, {
      toValue: { x: swipeAmount, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start();
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const getCardStyle = () => {
    // const rotate = position.x.interpolate({
    //   inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
    //   outputRange: ['-120deg', '0deg', '120deg'],
    // });

    // const translate = position.x.interpolate({
    //   inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
    //   outputRange: [],
    // });

    return {
      ...position.getLayout(),
      // transform: [{ rotate }],
    };
  };

  return {
    getCardStyle,
    panResponder,
  };
};
