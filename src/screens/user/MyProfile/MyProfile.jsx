import React from 'react';
import { View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { StyleSheet, Text } from '#components';

import MyProfileBasicInfo from './components/MyProfileBasicInfo';
import MyProfileImage from './components/MyProfileImage';
import MyProfileAccountInfo from './components/MyProfileAccountInfo';

const MyProfile = () => {
  // TODO: get user email from store
  // TODO: get user nickname from store
  // TODO: get user instagram from store
  // TODO: get user facebook from store
  // TODO: get user introduction from store
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
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 25,
    paddingHorizontal: 10,
  },
});
