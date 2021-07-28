import { useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as firebase from 'firebase';

// import storage from '@react-native-firebase/storage';

export const useImagePicker = (onComplete, widthRatio = 4, heightRatio = 3) => {
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
      base64: false,
      allowsEditing: true,
      aspect: [widthRatio, heightRatio],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result);
      const { uri } = result;

      const response = await fetch(uri);
      const blob = await response.blob();

      onComplete(blob);
      setImageUri(uri);
    }
  };

  return {
    pickImage,
    imageUri,
  };
};
