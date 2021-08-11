import React from 'react';
import { View } from 'react-native';
// import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet } from '#components';
import { colors } from '#constants';

import MyProfileBasicInfo from './components/MyProfileBasicInfo';
import MyProfileImage from './components/MyProfileImage';
import MyProfileAccountInfo from './components/MyProfileAccountInfo';

const MyProfileEdit = () => {
  return (
    <KeyboardAwareScrollView contentContainerStyle={s.root}>
      <View style={s.placer}>
        <MyProfileImage />
        <MyProfileAccountInfo />
        <MyProfileBasicInfo />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default MyProfileEdit;

const s = StyleSheet.create({
  root: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.light.background,
  },
  placer: {
    flex: 1,
    height: '100%',
    marginHorizontal: '9.5%',
    ...Platform.select({
      android: {
        marginTop: '7%',
      },
    }),
  },
});
