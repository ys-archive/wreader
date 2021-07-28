import React from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { StyleSheet } from '#components';

import MyProfileBasicInfo from './components/MyProfileBasicInfo';
import MyProfileImage from './components/MyProfileImage';
import MyProfileAccountInfo from './components/MyProfileAccountInfo';

const MyProfile = () => {
  return (
    <ScrollView>
      <KeyboardAvoidingView style={s.root}>
        <MyProfileImage />
        <MyProfileAccountInfo />
        <MyProfileBasicInfo />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default MyProfile;

const s = StyleSheet.create({
  root: {
    justifyContent: 'center',
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
});
