import { Alert as OrigAlert } from 'react-native';

export const Alert = (title, closeLabel = 'close', onClose = undefined) => {
  return OrigAlert.alert(title, '', [
    {
      text: closeLabel,
      style: 'destructive',
      onPress: onClose,
    },
  ]);
};
