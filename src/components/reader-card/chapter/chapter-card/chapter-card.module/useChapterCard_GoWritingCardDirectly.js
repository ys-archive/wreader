import { Alert } from '../../../../alert';

import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '../../../../../navigators/ScreenNames';

import { useStoreState } from 'easy-peasy';
import { selSwiper } from '../../../../../store/selectors';

export const useChapterCard_GoWritingCardDirectly = (chapterId, categoryId) => {
  const nav = useNavigation();
  const coords = useStoreState(selSwiper.coords);
  const depth = useStoreState(selSwiper.depth);

  return () => {
    if (!isLoggedIn) {
      Alert('Need Login to write a new card');
      return;
    }

    Alert('Work In Progress!');

    // nav.navigate(ScreenNames.MainWriteCard, {
    //   categoryTitle,
    //   chapterId,
    //   categoryId,
    //   order: coords.d1,
    //   depth,
    // });
  };
};
