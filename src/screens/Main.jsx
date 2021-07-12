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

const { width: SCREEN_WIDTH } = Dimensions.get('window');
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
      onPanResponderRelease(e, state) {},
    }),
  ).current;

  return (
    <View style={s.root}>
      <Animated.View {...panResponder.panHandlers}>
        <EventModal />
        <NovelCard id={1} title="dog" />
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
