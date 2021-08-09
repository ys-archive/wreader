import React from 'react';
import { View, ScrollView, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet } from '#components';
import { useNavigation } from '@react-navigation/native';

import SignupPolicyTexts from './components/SignupPolicyTexts';
import SignupForms from './components/forms/SignupForms';

import { colors } from '#constants';

const Signup = () => (
  <KeyboardAwareScrollView contentContainerStyle={s.root}>
    <View style={s.placer}>
      <SignupPolicyTexts
        title="CREATE ACCOUNT"
        subtitle="WELCOME TO W.READER"
        subtitleDetail1="TO USE OUR SERVICE, PLEASE WRITE DOWN"
        subtitleDetail2="YOUR INFORMATION AND AGREE TO POLICIES"
        basicInfo="ACCOUNT INFO"
      />
      <SignupForms />
    </View>
  </KeyboardAwareScrollView>
);

export default Signup;

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  placer: {
    flex: 1,
    height: '100%',
    marginHorizontal: '5.7%',
    ...Platform.select({
      android: {
        marginTop: '7%',
      },
    }),
  },
});
