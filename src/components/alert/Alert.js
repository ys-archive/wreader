import { Alert as OrigAlert } from 'react-native';

export const Alert = (title, closeLabel = '닫기', onClose = undefined) =>
  OrigAlert.alert(title, undefined, [
    { title: closeLabel, style: 'destructive', onClick: () => onClose() },
  ]);
