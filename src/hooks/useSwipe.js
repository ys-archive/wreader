// import Animated, {
//   useSharedValue,
//   useAnimatedGestureHandler,
//   useAnimatedStyle,
// } from 'react-native-reanimated';
// import { PanGestureHandler } from 'react-native-gesture-handler';

// export const useSwipe = () => {
//   const pos = useSharedValue({ x: 0, y: 0 });

//   const onGestureEvent = useAnimatedGestureHandler({
//     onStart: (_, ctx) => {},

//     onActive: (e, ctx) => {},

//     onEnd: () => {},
//   });

//   const scrollTranslationStyle = useAnimatedStyle(() => ({
//     transform: [{ translateX: pos.x }],
//   }));
// };
