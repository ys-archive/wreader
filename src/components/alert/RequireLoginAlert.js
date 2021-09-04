import { Alert } from 'react-native';

export const RequireLoginAlert = (
  title = 'Need to login',
  closeLabel = 'close',
  onClose = undefined,
) =>
  Alert.alert(title, undefined, [
    {
      title: closeLabel,
      style: 'destructive',
      onClick: onClose && (() => onClose()),
    },
  ]);
