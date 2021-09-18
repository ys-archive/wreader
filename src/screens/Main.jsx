import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from '#components';
import { Logo, Sort, Menu } from '../components/icon';

import { useNavigation } from '@react-navigation/native';

import { useAutoLogin } from '../hooks';

import EventModal from '#components/modals/EventModal';
import Reader from './reader/Reader';
import CardsRenderer from './CardsRenderer';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { selAuth, selSwiper } from '../store/selectors';
import { actData } from '../store/actions';
import { DEPTH_NAME } from '../store/reducers/swiper.depth';

const initStates = () => {
  // selectors
  const userId = useStoreState(selAuth.userId);
  const depth = useStoreState(selSwiper.depth);

  // acitons
  const sortUserChapters = useStoreActions(actData.sortUserChapters);
  const sortNext = useStoreActions(actData.sortNext);
  return {
    userId,
    depth,
    sortUserChapters,
    sortNext,
  };
};

const Main = () => {
  const nav = useNavigation();
  const { userId, depth, sortUserChapters, sortNext } = initStates();

  useAutoLogin();

  const returnToMain = () => {
    console.log('로고 아이콘');
    // todo: depth -> 0, d0 -> 0, d1 -> 0, d2 -> 0, d3 -> 0 으로 초기화 이동
  };

  const onPressSortIcon = () => {
    switch (depth) {
      case DEPTH_NAME.USER_CHAPTER:
        sortUserChapters();
        break;

      case DEPTH_NAME.NEXT:
        sortNext();
        break;

      default:
        console.log("You can't sort due to the depth!");
        break;
    }
  };

  const onPressMenuIcon = () => nav.openDrawer();

  return (
    <View>
      <Logo onPress={returnToMain} />
      <Sort onPress={onPressSortIcon} />
      <Menu onPress={onPressMenuIcon} />

      <EventModal />

      <Reader>
        <CardsRenderer />
      </Reader>
    </View>
  );
};

export default Main;
