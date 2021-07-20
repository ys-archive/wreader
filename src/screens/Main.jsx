import React, { useState, useRef } from 'react';
// expo 에서 불가능! -> rn-cli
// import FastImage from 'react-native-fast-image';
// import Image from 'expo-image';

import { View } from 'react-native';
import { StyleSheet } from '#components';

import EventModal from '#components/modals/EventModal';
import Reader from './reader/Reader';

import ReaderCard from '#components/reader-card/ReaderCard';

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
  // TODO: Novel data 가져와 렌더
  const [Novels, _] = useState([
    {
      id: 0,
      title: '0',
      content: `Ipsum veniam excepteur ex duis quis qui.
                Dolor fugiat officia exercitation enim est quis magna nulla dolor id.
                Cillum et anim qui sint sunt anim do est adipisicing sint enim ex.`,
    },
    {
      id: 1,
      title: '1',
      content: `Voluptate laborum incididunt reprehenderit laborum. 
                Culpa laborum incididunt ad laboris proident culpa proident consectetur. 
                Cillum et anim qui sint sunt anim do est adipisicing sint enim ex.`,
    },
    {
      id: 2,
      title: '2',
      content: `Enim aliquip aliqua fugiat est dolore elit. 
                Elit enim veniam in aliquip culpa voluptate proident fugiat nostrud magna enim elit. 
                Exercitation nostrud excepteur ut occaecat cillum amet. Enim proident proident non ullamco qui nulla quis est Lorem ea.`,
    },
    {
      id: 3,
      title: '3',
      content: `Laborum elit ullamco pariatur exercitation incididunt occaecat deserunt ea ut.
                Velit ex velit laboris dolor reprehenderit aliquip ut mollit do labore quis ex pariatur.
                Excepteur do deserunt sit enim est pariatur dolore labore ullamco est ullamco laboris exercitation dolore.`,
    },
    {
      id: 4,
      title: '4',
      content: `Irure cillum et do officia proident sint ullamco ad sunt excepteur consectetur irure commodo deserunt. 
                Qui qui ea quis ea aute nulla aute aliquip minim aliqua duis culpa. Ex id ut anim excepteur. 
                Consequat aute sint do laborum aliquip minim magna incididunt nostrud sint id veniam.`,
    },
  ]);

  const cards = Novels.map(novel => (
    <ReaderCard key={novel.id} title={novel.title} content={novel.content} />
  ));

  return (
    <View style={s.root}>
      <EventModal />
      <Reader>
        <View>
          <View style={s.cardView}>{cards}</View>
          <View style={s.cardView}>{cards}</View>
          <View style={s.cardView}>{cards}</View>
          <View style={s.cardView}>{cards}</View>
          <View style={s.cardView}>{cards}</View>
        </View>
      </Reader>
    </View>
  );
};

export default Main;

const s = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'flex-start',
  },
  cardView: {
    flexDirection: 'row',
  },
});
