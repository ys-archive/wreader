import React, { useState, useRef } from 'react';

import { View } from 'react-native';
import { StyleSheet } from '#components';

import EventModal from '#components/modals/EventModal';
import ReaderMain from './reader/ReaderMain';
import { CategoryService, ChapterService } from '#services';

// import ReaderCard from '#components/reader-card/ReaderCard';
import Card from '#components/reader-card/Card';
import CategoryCard from '#components/reader-card/CategoryCard';
import ChapterCard from '#components/reader-card/ChapterCard';
import WriteChapterCard from '#components/writer-card/WriterChapterCard';

import { useStoreState, useStoreActions } from 'easy-peasy';
import { selectCurrentChapterIdx } from '#store/selectors';
// import { set}

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

  // const currentChapterIdx = useStoreState(selectCurrentChapterIdx);

  const {
    item: rootCategories,
    isLoading,
    error,
  } = CategoryService.useGET_getCategory();

  const {
    item: candidates,
    isLoading,
    error,
  } = ChapterService.useGet_getChapter(chapterId);

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

  const renderCandidatesJSX = (chapterIdx, currentCategoryId) =>
    candidates &&
    candidates.length &&
    candidates.map(
      (candidate, idx) =>
        chapterIdx + 1 === candidate.group_index && (
          <ChapterCard
            currentCategoryId={currentCategoryId}
            chapterOrder={idx}
            data={candidate}
          />
        ),
    );

  // chapter example
  //   {
  //     "id": "43", -> 조회용으로 사용
  //     "categoryId": 5, -> prop categoryId 와 비교해서 렌더 결정
  //     "userId": 5, -> reply 용으로 사용
  //     "updateDt": "2021-07-30 14:45:29",
  //     "content": "hi3", -> render
  //     "replyCount": 0, -> reply render
  //     "like_count": 0, -> like count render
  //     "group_index": 0, -> chaining id
  //     "userImg": "https://imagePath.com/changed", -> author uri
  //     "userNick": "", -> author render
  //     "chapterImg": "" -> chapter uri
  // }

  const renderChaptersJSX = (chapters, currentCategoryId) =>
    chapters &&
    chapters.length &&
    chapters.map((chapter, order) => (
      <View key={chapters.id} style={{ flexDirection: 'column' }}>
        <ChapterCard
          currentCategoryId={currentCategoryId}
          chapterOrder={order}
          data={chapter}
        />
        {renderCandidatesJSX(order, currentCategoryId)}
      </View>
    ));

  // rootCategory example
  // {
  //   "id": 6, -> GetChapter 순차적으로, categoryId 와 비교
  //   "title": "CRIME", -> render
  //   "subTitle": "Criminal Story\nmissing, murder...", -> render
  //   "chapterLimit": 10,
  //   "maxLength": 500,
  //   "img": null, -> render as a uri
  //   "chapter": [] -> referenced by next chapters
  // },
  const CurrentChapterJSX = rootCategories.map(category => {
    // 다음 Chapter 렌더용
    const { chapter: chapters, id: currentCategoryId } = category;

    // CategoryCard 렌더용
    const { title, subTitle, img: imageUri } = category;

    return (
      <View stype={{ flexDirection: 'row' }}>
        <CategoryCard title={title} subTitle={subTitle} imageUri={imageUri} />
        {renderChaptersJSX(chapters, currentCategoryId)}
        <WriteChapterCard />
      </View>
    );
  });

  return (
    <View style={s.root}>
      <EventModal />
      <Reader>
        <View style={{ flexDirection: 'column' }}>{CurrentChapterJSX}</View>
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
