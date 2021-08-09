import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Text } from '#components';

import { colors } from '#constants';

import Signup2Form from './components/Signup2Form';
import SignupPolicyTexts from '../sign-up/components/SignupPolicyTexts';

const Signup2 = ({ route }) => (
  <KeyboardAwareScrollView contentContainerStyle={s.root}>
    <View style={s.placer}>
      <SignupPolicyTexts
        title="CREATE ACCOUNT"
        subtitle="WELCOME TO W.READER"
        subtitleDetail1="TO USE OUR SERVICE, PLEASE WRITE DOWN"
        subtitleDetail2="YOUR INFORMATION AND AGREE TO POLICIES"
        basicInfo="BASIC INFO"
      />
      <Signup2Form route={route} />
    </View>
  </KeyboardAwareScrollView>
);

export default Signup2;

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
