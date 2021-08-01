import { Alert as OrigAlert } from 'react-native';

export const AlertWithValue = (title, closeLabel, value, onClose = undefined) =>
  OrigAlert.alert(title, value, [
    { title: closeLabel, style: 'destructive', onClick: () => onClose() },
  ]);