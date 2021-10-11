import { Alert as OrigAlert } from 'react-native';

export const AlertWithValue = (
  title,
  closeLabel = close,
  value = {},
  onClose = undefined,
) => {
  return OrigAlert.alert(title, value, [
    { text: closeLabel, style: 'destructive', onClick: () => onClose() },
  ]);
};
