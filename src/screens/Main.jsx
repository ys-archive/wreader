import React from 'react';
// import FastImage from 'react-native-fast-image';
// import Image from 'expo-image';
import { View, Image } from 'react-native';
import { Button, Text, StyleSheet } from '#components';
import { useImagePicker } from '../hooks';
import EventModal from '#components/modals/EventModal';

const Main = () => {
  const { imageUri: uri, pickImage } = useImagePicker();

  return (
    <View style={s.root}>
      <EventModal />
      <Text>Main Screen!</Text>

      <Button onPress={pickImage}>Pick an image from camera roll</Button>
      {uri !== 'undefined' && (
        <Image style={s.image} source={{ uri }} resizeMode="contain" />
      )}
    </View>
  );
};

export default Main;

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
