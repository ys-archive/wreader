import { Alert as OrigAlert } from 'react-native';

export const Alert = (title, closeLabel = 'Close', onClose = undefined) =>
  OrigAlert.alert(title, undefined, [
    { title: closeLabel, style: 'destructive', onClick: () => onClose() },
  ]);
