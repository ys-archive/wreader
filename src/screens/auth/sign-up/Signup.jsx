import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from '#components';

import SignupPolicyTexts from './components/SignupPolicyTexts';
import SignupInput from './components/SignupInput';
import SignupPolicyAndConditions from './components/SignupPolicyAndConditions';

import { AccountStateProvider } from './hooks/useAccountState';

const Signup = () => {
  // TODO: headerRight -> signin 으로 돌아가기
  return (
    <View style={s.root}>
      <SignupPolicyTexts />
      <AccountStateProvider>
        <SignupInput />
        <SignupPolicyAndConditions />
      </AccountStateProvider>
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
