import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from '#components';

import SignupPolicyTexts from './components/SignupPolicyTexts';
import SignupForms from './components/forms/SignupForms';

const Signup = () => {
  // TODO: headerRight -> signin 으로 돌아가기
  return (
    <View style={s.root}>
      <SignupPolicyTexts />
      <SignupForms />
    </View>
  );
};

export default Signup;

const s = StyleSheet.create({
  root: {
    flex: 1,
    marginVertical: '25%',
    marginHorizontal: 10,
    // justifyContent: 'center',
    alignItems: 'center',
  },
});
