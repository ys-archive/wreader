import { useNavigation } from '@react-navigation/native';
import { Alert, AlertRequireLogin } from '#components/alert';
import * as ScreenNames from '#navigators/ScreenNames';

import { useStoreState } from 'easy-peasy';
import { selAuth } from '#store/selectors';

export const useChapterCardComments = chapterId => {
  const isLoggedIn = useStoreState(selAuth.isLoggedIn);
  const nav = useNavigation();

  return () => {
    if (!isLoggedIn) {
      Alert('Need Login to see comments', 'close', () =>
        nav.navigate(ScreenNames.SigninStack),
      );
      return;
    }

    nav.navigate(ScreenNames.MainComments, {
      chapterId,
    });
  };
};
