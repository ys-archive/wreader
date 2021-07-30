import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet } from '#components';

import SigninLogoTitle from './components/SigninLogoTitle';
import SigninForms from './components/forms/SigninForms';
import SigninFindPasswordSignup from './components/SigninFindPasswordSignup';

const Signin = () => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={s.root}
    >
      <View style={s.root}>
        <SigninLogoTitle />
        <SigninForms />
        <SigninFindPasswordSignup />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signin;

const s = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
