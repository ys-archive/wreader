import { useRef } from 'react';
import { Animated, Dimensions, LayoutAnimation } from 'react-native';

import { useStoreActions } from 'easy-peasy';
import { actSwiper } from '../../store/actions';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_OUT_DURATION = 350;

export const useSwipeGesture = () => {
  // const setSwiping = useStoreActions(actSwiper.setSwiping);
  let position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const swipe = (dir, after) => {
    // setSwiping(true);

    const delta = { x: 0, y: 0 };
    switch (dir) {
      case 'up':
        delta.y += SCREEN_HEIGHT * -1;
        break;

      case 'down':
        delta.y += SCREEN_HEIGHT;
        break;

      case 'left':
        delta.x += SCREEN_WIDTH * -1;
        break;

      case 'right':
        delta.x += SCREEN_WIDTH;
        break;

      default:
        throw new Error('Invalid direction');
    }

    if (after) {
      setTimeout(() => after(), SWIPE_OUT_DURATION - 80);
    }
    
    Animated.timing(position, {
      toValue: delta,
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: true,
    }).start(() => {
      // console.log(`Swipe Amount: x: ${delta.x}, y: ${delta.y}`);
      onSwipeComplete(dir);
    });
  };

  const onSwipeComplete = dir => {
    // setSwiping(false);
    position.setValue({ x: 0, y: 0 });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };

  const getStyle = () => {
    const { x: translateX, y: translateY } = position;
    return {
      // flex: 1,
      transform: [{ translateX }, { translateY }],
    };
  };

  return {
    swipe,
    getStyle,
  };
};
