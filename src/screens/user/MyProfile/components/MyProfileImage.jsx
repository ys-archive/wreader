import React from 'react';
import { View } from 'react-native';
import { StyleSheet, LocalImage } from '#components';
import { Ionicons } from '@expo/vector-icons';

const MyProfileImage = () => {
  // TODO: 등록한 이미지 리스트에서 가져오기
  return (
    <View style={s.profileImageView}>
      <LocalImage style={s.profileImage} source={require('!images/dog.jpg')} />
      <Ionicons style={s.cameraIcon} name="camera" size={48} color="black" />
    </View>
  );
};

export default MyProfileImage;

const s = StyleSheet.create({
  profileImageView: {
    alignSelf: 'center',
  },
  profileImage: {
    maxWidth: 200,
    maxHeight: 200,
    borderRadius: 100,
  },
  cameraIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
});
