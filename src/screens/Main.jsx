import React, { useEffect } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { StyleSheet, Text } from '#components';
import { Logo, Sort, Menu } from '#components/icon';

import { useNavigation } from '@react-navigation/native';

import { useStoreActions, useStoreState } from 'easy-peasy';
import { selData, selSwiper } from '../store/selectors';
import { actData } from '../store/actions';

import { useGetSWR, useAutoLogin } from '../hooks';

import EventModal from '#components/modals/EventModal';
import Reader from './reader/Reader';
import CategoryCard from '../components/reader-card/category/CategoryCard';
import ChapterCard from '../components/reader-card/chapter/chapter-card/ChapterCard';

import { useCardsFetch } from '../hooks/useCardsFetch';

const getStates = () => {
  const categories = useStoreState(selData.categories);
  const chapters = useStoreState(selData.chapters);
  const isLoaded = useStoreState(selData.isLoaded);

  const categoryIdx = useStoreState(selSwiper.categoryIdx);
  const depth = useStoreState(selSwiper.depth);
  const coords = useStoreState(selSwiper.coords);

  return {
    categories,
    chapters,
    isLoaded,
    categoryIdx,
    depth,
    coords,
  };
};

const Main = () => {
  const nav = useNavigation();

  useCardsFetch();

  const { categories, chapters, isLoaded, categoryIdx, depth, coords } =
    getStates();

  if (!isLoaded) return null;

  // if (!categories) return null;
  // if (!chapters) return null;
  // if (!coords) return null;

  const onPressSortIcon = () => {
    console.log('정렬 아이콘');
    // TODO: 후보 챕터들을 조회수 별로 정렬
  };

  const onPressMenuIcon = () => {
    nav.openDrawer();
  };

  let Card = null;
  // const { x, y, z } = coords;

  switch (depth) {
    case 0:
      {
        // console.log(categories[categoryIdx]);

        Card = <CategoryCard data={categories[categoryIdx]} />;
      }
      break;

    case 1:
      {
        // console.log(chapters[categoryIdx][coords.x].deck);

        Card = (
          <ChapterCard
            data={chapters[categoryIdx][coords.x].deck}
            categoryTitle={categories[categoryIdx].title}
          />
        );
      }
      break;

    case 2:
      {
        // console.log(chapters[categoryIdx][coords.x].child[coords.y]);
        Card = (
          <ChapterCard
            data={chapters[categoryIdx][coords.x].child[coords.y].deck}
            categoryTitle={categories[categoryIdx].title}
          />
        );
      }
      break;

    case 3:
      {
        Card = (
          <ChapterCard
            data={
              chapters[categoryIdx][coords.x].child[coords.y].child[coords.z]
                .deck
            }
            categoryTitle={categories[categoryIdx].title}
          />
        );
      }
      break;

    default:
      break;
  }

  return (
    <View style={s.root}>
      <Logo />
      <Sort onPress={onPressSortIcon} />
      <Menu onPress={onPressMenuIcon} />
      {/* <EventModal /> */}
      <Reader>{Card}</Reader>
    </View>
  );
};

export default Main;

const s = StyleSheet.create({
  root: {
    // justifyContent: 'flex-start',
    // flex: 1,
    // overflow: 'visible',
  },
});
