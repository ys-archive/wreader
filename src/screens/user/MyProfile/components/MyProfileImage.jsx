import React from 'react';
import { View } from 'react-native';
import { StyleSheet, LocalImage } from '#components';
import { Ionicons } from '@expo/vector-icons';

const MyProfileImage = () => {
  // TODO: 1. Image Picker 를 통해서 이미지 선택
  // TODO: 2. 선택한 이미지 업로드
  // TODO: 2-success. alert(성공), 선택한 이미지로 바로 프로필 이미지 변경
  // TODO: 2-fail. alert(실패), 상태 초기화

  // TODO: -> 를 hook 으로 빼기

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
