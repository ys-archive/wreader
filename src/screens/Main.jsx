import React, { useState, useRef } from 'react';
// expo 에서 불가능! -> rn-cli
// import FastImage from 'react-native-fast-image';
// import Image from 'expo-image';

import { View } from 'react-native';
import { StyleSheet } from '#components';

import EventModal from '#components/modals/EventModal';

import NovelCard from './NovelCard';
import Reader from './reader/Reader';

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
  const [Novels, _] = useState([
    { id: 0, title: 'genre1' },
    { id: 1, title: 'genre2' },
    { id: 2, title: 'genre3' },
    { id: 3, title: 'genre4' },
    { id: 4, title: 'genre5' },
    { id: 5, title: 'genre6' },
    { id: 6, title: 'genre7' },
    { id: 7, title: 'genre8' },
  ]);

  if (!Novels) return null;
  if (Novels.length <= 0) return null;

  const novelCardsJSX = Novels.map(novel => (
    <NovelCard key={novel.id} title={novel.title} />
  ));

  return (
    <View style={s.root}>
      {/* <EventModal /> */}
      <Reader>
        <View style={s.cardView}>{novelCardsJSX}</View>
        <View style={s.cardView}>{novelCardsJSX}</View>
        <View style={s.cardView}>{novelCardsJSX}</View>
        <View style={s.cardView}>{novelCardsJSX}</View>
      </Reader>
    </View>
  );
};

export default Main;

const s = StyleSheet.create({
  root: {},
  cardView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
