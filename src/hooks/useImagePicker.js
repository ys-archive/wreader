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
      allowsEditing: true,
      aspect: [widthRatio, heightRatio],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      const { uri } = result;
      setImageUri(uri);

      await firebase.database().ref(`profileImage`).set({ uri: uri });

      console.log('데이터 저장 성공!');
    }
  };

  return {
    pickImage,
    imageUri,
  };
};
