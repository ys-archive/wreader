import { useNavigation } from '@react-navigation/native';
import { Alert } from '#components/alert';
import * as ScreenNames from '#navigators/ScreenNames';

import { useStoreState } from 'easy-peasy';
import { selAuth } from '#store/selectors';

export const useChapterCardComments = chapterId => {
  const isLoggedIn = useStoreState(selAuth.isLoggedIn);
  const nav = useNavigation();

  return () => {
    if (!isLoggedIn) {
      Alert('Need Login to write a new card');
      return;
    }

    nav.navigate(ScreenNames.MainComments, {
      chapterId,
    });
  };
};
