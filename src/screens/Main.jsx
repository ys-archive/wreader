import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from '#components';
import { Logo, Sort, Menu } from '../components/icon';

import { useNavigation } from '@react-navigation/native';

import { useAutoLogin } from '../hooks';

import EventModal from '#components/modals/EventModal';
import Reader from './reader/Reader';
import CardsRenderer from './CardsRenderer';

const Main = () => {
  const nav = useNavigation();
  useAutoLogin();

  const onPressSortIcon = () => {
    console.log('정렬 아이콘');
    // TODO: 후보 챕터들을 조회수 별로 정렬
  };

  const onPressMenuIcon = () => {
    nav.openDrawer();
  };

  return (
    <View style={s.root}>
      <Logo />
      <Sort onPress={onPressSortIcon} />
      <Menu onPress={onPressMenuIcon} />

      {/* <EventModal /> */}

      <Reader>
        <CardsRenderer />
      </Reader>
    </View>
  );
};

export default Main;

const s = StyleSheet.create({
  root: {
    // flex: 1,
  },
});
