import { useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';

export const useImagePicker = (widthRatio = 4, heightRatio = 3) => {
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
      base64: true,
      allowsEditing: true,
      aspect: [widthRatio, heightRatio],
      quality: 1,
    });

    if (!result.cancelled) {
      const { uri, base64 } = result;
      setImageUri(uri);
      const blob = await base64.blob();
      console.log(blob);

      await firebase.database().ref(`profileImage`).set({ image: blob });

      console.log('데이터 저장 성공!');
    }
  };

  return {
    pickImage,
    imageUri,
  };
};
