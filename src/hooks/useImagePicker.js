import { useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const useImagePicker = () => {
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
        Alert.alert('Sorry, we need camera roll permissions to make this work');
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return {
    pickImage,
    imageUri,
  };
};
