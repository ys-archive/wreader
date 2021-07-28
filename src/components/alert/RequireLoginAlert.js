import { Alert } from 'react-native';

export const RequireLoginAlert = (
  title = '로그인이 필요합니다',
  closeLabel = '닫기',
  onClose = undefined,
) =>
  Alert.alert(title, undefined, [
    { title: closeLabel, style: 'destructive', onClick: () => onClose() },
  ]);
