import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { Alert } from '#components/alert';
import * as ImagePicker from 'expo-image-picker';

export const useImagePicker = (
  uploadLocalImagePath,
  uploadImageFile,
  widthRatio = 4,
  heightRatio = 3,
) => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    (async function requestMediaLibraryPermission() {
      if (
        Platform.OS === 'web' ||
        Platform.OS === 'macos' ||
        Platform.OS === 'windows'
      )
        return;

      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert('카메라 권한이 필요한 작업입니다.', '닫기');
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: false,
      allowsEditing: true,
      aspect: [widthRatio, heightRatio],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result);
      const { uri } = result;

      if (uploadLocalImagePath && typeof uploadLocalImagePath === 'function') {
        await uploadLocalImagePath(uri);
        setImageUri(uri);
      }

      if (uploadImageFile && typeof uploadImageFile === 'function') {
        const response = await fetch(uri);
        const blob = await response.blob();
        await uploadImageFile(blob);
      }
    }
  };

  return {
    pickImage,
    imageUri,
  };
};
