import React from 'react';
// import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet } from '#components';

import MyProfileBasicInfo from './components/MyProfileBasicInfo';
import MyProfileImage from './components/MyProfileImage';
import MyProfileAccountInfo from './components/MyProfileAccountInfo';

const MyProfileEdit = () => {
  return (
    <KeyboardAwareScrollView contentContainerStyle={s.root}>
      <MyProfileImage />
      <MyProfileAccountInfo />
      <MyProfileBasicInfo />
    </KeyboardAwareScrollView>
  );
};

export default MyProfileEdit;

const s = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
});
