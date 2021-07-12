import React, { useRef, useState } from 'react';
// expo 에서 불가능! -> rn-cli
// import FastImage from 'react-native-fast-image';
// import Image from 'expo-image';

import {
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  Platform,
  View,
  Image,
} from 'react-native';
import { Text, StyleSheet } from '#components';

import EventModal from '#components/modals/EventModal';
import Novel from '../data/novel/novel';
import { PanGestureHandler } from 'react-native-gesture-handler';

import NovelCard from './NovelCard';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = 0.4 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

// class Novel {
//   state = {
//     maxLength: 0,
//     categories: [
//       {
//         id: 1,
//         title: 'title1',
//         chapterLimit: 10,
//         chapters: [
//           {
//             id: 1,
//             author: 'james',
//             contents:
//               'Eu ut tempor commodo ad proident ut id esse voluptate veniam laborum do. Non reprehenderit elit ipsum duis culpa occaecat nulla in eu exercitation dolore labore nostrud nostrud. Laboris Lorem non non aliquip cupidatat magna et commodo. Aute excepteur veniam est aliquip. Lorem incididunt ad ipsum tempor ullamco culpa voluptate exercitation laborum sit nulla excepteur esse.',
//             comments: [{}],
//             commentCount: 2,
//             likeCount: 12,
//           },
//           {},
//           {},
//           {},
//           {},
//           {},
//           {},
//           {},
//           {},
//           {
//             // add isLast = i === chapterLimit
//           },
//         ],
//         chapterImage: {
//           id: 1,
//           categoryId: 1,
//           path: 'https://wreader.com/image/1.jpg',
//           // createdAt: ''
//         },
//       },
//     ],
//   };
// }

const Main = () => {
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

  const [Novels, setNovels] = useState([
    { id: 0, title: 'genre1' },
    { id: 1, title: 'genre2' },
    { id: 2, title: 'genre3' },
    { id: 3, title: 'genre4' },
  ]);

  if (!Novels) return null;
  if (Novels.length <= 0) return null;

  return (
    <View style={s.root}>
      <Animated.View
        style={[getCardStyle(), { position: 'absolute', width: SCREEN_WIDTH }]}
        {...panResponder.panHandlers}
      >
        <EventModal />
        {Novels.map(novel => {
          const { id, title } = novel;
          return <NovelCard key={id} title={title} />;
        })}
      </Animated.View>
    </View>
  );
};

export default Main;

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
