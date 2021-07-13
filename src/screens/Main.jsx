import React, { useState } from 'react';
// expo 에서 불가능! -> rn-cli
// import FastImage from 'react-native-fast-image';
// import Image from 'expo-image';

import { View } from 'react-native';
import { StyleSheet } from '#components';

import EventModal from '#components/modals/EventModal';
import Reader from './reader/Reader';
// import Novel from '../data/novel/novel';

import NovelCard from './NovelCard';
import GestureWrapper from './gesture/GestureWrapper';

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
  // const [isHorizontal, setHorizontal] = useState(false);
  const [Novels, setNovels] = useState([
    { id: 0, title: 'genre1' },
    { id: 1, title: 'genre2' },
    { id: 2, title: 'genre3' },
    { id: 3, title: 'genre4' },
  ]);

  if (!Novels) return null;
  if (Novels.length <= 0) return null;

  const novelCardsJSX = Novels.map(novel => {
    const { id, title } = novel;
    return (
      <View key={id}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <NovelCard title={title} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <NovelCard title={title} />
        </View>
      </View>
    );
  });

  console.log(isHorizontal);

  return (
    <View style={s.root}>
      {/* <EventModal /> */}
      <GestureWrapper>
        <Reader>{novelCardsJSX}</Reader>
      </GestureWrapper>
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
