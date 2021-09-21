import React from 'react';
import { View } from 'react-native';
import { Logo, Sort, Menu } from '../components/icon';

import { useNavigation } from '@react-navigation/native';

import { useAutoLogin } from '../hooks';

import EventModal from '#components/modals/EventModal';
import Reader from './reader/Reader';
import CardsRenderer from './cards/CardsRenderer';

import { useCardSorter } from './cards/useCardSorter';
import { useCardResetToStartScreen } from './cards/useCardResetToStartScreen';
import SortIndicator from './cards/SortIndicator';

const Main = () => {
  const nav = useNavigation();

  useAutoLogin();

  const returnToMain = useCardResetToStartScreen();
  const { callback: onPressSortIcon, isSorterOpen } = useCardSorter();
  const onPressMenuIcon = () => nav.openDrawer();

  return (
    <View>
      <Logo onPress={returnToMain} />
      <Sort onPress={onPressSortIcon} />
      {isSorterOpen && <SortIndicator />}
      <Menu onPress={onPressMenuIcon} />

      <EventModal />

      <Reader>
        <CardsRenderer />
      </Reader>
    </View>
  );
};

export default Main;
