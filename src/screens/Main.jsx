import React, { useState, useRef } from 'react';

import { View } from 'react-native';
import { StyleSheet } from '#components';

import EventModal from '#components/modals/EventModal';
import ReaderMain from './reader/ReaderMain';
import CategoryService from '#service/CategoryService';

// import ReaderCard from '#components/reader-card/ReaderCard';
import Card from '#components/reader-card/Card';
import CategoryCard from '#components/reader-card/CategoryCard';
import ChapterCard from '#components/reader-card/ChapterCard';
import WriteChapterCard from '#components/writer-card/WriterChapterCard';

import { useStoreState } from 'easy-peasy';
import { selectCurrentChapterIdx } from '#store/selectors';

const orig = [
  {
    id: 5,
    title: 'ROMANCE',
    content: `그녀는 눈을 떴다. 처음 보는 방에서 깨어났다.`,
  },
  {
    id: 1,
    title: '1',
    content: `그녀는 오랜 회상에 잠긴다. 갑자기 소리를 지른다.`,
  },
  {
    id: 2,
    title: '2',
    content: `그녀는 그를 죽이고 사다리를 올라갔다.`,
  },
  {
    id: 3,
    title: '3',
    content: `불타오르는 석양과 땅에서 치솟는 바람이 모든 것에 생명을 채운다.`,
  },
  {
    id: 4,
    title: '4',
    content: `그녀도 생명의 시작을 향해 떨어지기 시작한다.`,
  },
];

const Main = () => {
  // TODO: Novel data 가져와 렌더 - 일단 없으니깐 암거나 렌더
  const [data, _] = useState([
    {
      id: 5,
      title: 'ROMANCE',
      subTitle: 'Romantic Story\nlike love hate...',
      chapterLimit: 10,
      maxLength: 500,
      img: null,
      chapter: [
        {
          id: '37',
          categoryId: 5,
          userId: 5,
          updateDt: '2021-07-30 14:22:17',
          content: 'hi1',
          replyCount: 0,
          like_count: 0,
          group_index: 0,
          userImg: 'https://imagePath.com/changed',
          userNick: '',
          chapterImg: '',
        },
        {
          id: '38',
          categoryId: 5,
          userId: 3,
          updateDt: '2021-07-30 14:22:35',
          content: 'hi2',
          replyCount: 0,
          like_count: 0,
          group_index: 0,
          userImg: '',
          userNick: 'asdasaaaa',
          chapterImg: '',
        },
        {
          id: '43',
          categoryId: 5,
          userId: 5,
          updateDt: '2021-07-30 14:45:29',
          content: 'hi3',
          replyCount: 0,
          like_count: 0,
          group_index: 0,
          userImg: 'https://imagePath.com/changed',
          userNick: '',
          chapterImg: '',
        },
      ],
    },
    {
      id: 6,
      title: 'CRIME',
      subTitle: 'Criminal Story\nmissing, murder...',
      chapterLimit: 10,
      maxLength: 500,
      img: null,
      chapter: [],
    },
    {
      id: 7,
      title: 'FANTASY',
      subTitle: 'Fantasitic Story\ndaydream, nightmare...',
      chapterLimit: 10,
      maxLength: 500,
      img: null,
      chapter: [],
    },
    {
      id: 8,
      title: 'ADULT',
      subTitle: 'Adult Story\nerotic romance, sexual...',
      chapterLimit: 10,
      maxLength: 500,
      img: null,
      chapter: [],
    },
    {
      id: 9,
      title: 'THRILLER',
      subTitle: 'Gripping Story\nchiller, spy...',
      chapterLimit: 10,
      maxLength: 500,
      img: null,
      chapter: [],
    },
    {
      id: 10,
      title: 'test',
      subTitle: 'test',
      chapterLimit: 10,
      maxLength: 500,
      img: null,
      chapter: [],
    },
    {
      id: 11,
      title: 'test',
      subTitle: 'test',
      chapterLimit: 10,
      maxLength: 500,
      img: 'test',
      chapter: [],
    },
  ]);

  const currentChapterIdx = useStoreState(selectCurrentChapterIdx);

  const {
    item: rootData,
    isLoading,
    error,
  } = CategoryService.useGET_getCategory();

  if (error) {
    return (
      <View>
        <Text>로드 중 에러!</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const CurrentChapterJSX = undefined;

  rootData.map(category => {
    const { chapter: chapters } = category;
    const chapterCards = [];

    chapters.length &&
      chapters.forEach(chapter => {
        // 쓰여진 챕터들을 모두 jsx 로 만들어 추가
        chapterCards.push(<ChapterCard chapter={chapter} />);
      });

    // 각 챕터들은 후보 챕터들과 새로 쓸 카드를 포함해서
    // 횡으로 배열
    CurrentChapterJSX = (
      <View stype={{ flexDirection: 'column' }}>
        <CategoryCard category={category} />;{...chapterCards}
        <WriteChapterCard />;
      </View>
    );
  });

  return (
    <View style={s.root}>
      <EventModal />
      {/* <ReaderMain rootData={rootData} /> */}
      <Reader>
        <View>{CurrentChapterJSX}</View>
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
