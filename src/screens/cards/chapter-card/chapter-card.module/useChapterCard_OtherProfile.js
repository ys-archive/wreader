import { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '../../../../navigators/ScreenNames';

export const useChapterCard_OtherProfile = otherUserId => {
  const nav = useNavigation();
  return useCallback(() => {
    nav.navigate(ScreenNames.MainOtherProfile, {
      userId: otherUserId,
    });
  }, [otherUserId]);
};
