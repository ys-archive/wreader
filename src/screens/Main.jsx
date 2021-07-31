import React, { useState } from 'react';

import { View } from 'react-native';
import { StyleSheet } from '#components';

import EventModal from '#components/modals/EventModal';

import { CategoryService } from '#services';
import CategoryCardContainer from '../components/reader-card/CategoryCardContainer';
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

  return (
    <View style={s.root}>
      <EventModal />
      <Reader>
        <View style={s.cardView}>
          <CategoryCardContainer rootData={rootData} />
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
    flexDirection: 'column',
  },
});
