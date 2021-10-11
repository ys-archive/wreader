import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SCREEN_NAMES from '../../navigators/ScreenNames';

export const AlertRequireLogin = (
  title = 'need to login',
  closeLabel = 'close',
  navigateToSiginAutomatically = false,
) => {
  const nav = useNavigation();

  return Alert.alert(title, undefined, [
    {
      text: closeLabel,
      style: 'destructive',
      onPress:
        navigateToSiginAutomatically &&
        (() => nav.navigate(SCREEN_NAMES.Signin)),
    },
  ]);
};
