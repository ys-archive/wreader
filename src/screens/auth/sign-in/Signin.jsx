import React from 'react';
import { ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet } from '#components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { bg } from '#constants/images';
import { LogoSignin } from '#components/icon';
import { colors } from '#constants';

import SigninForms from './components/forms/SigninForms';
import SigninFindPasswordSignup from './components/SigninFindPasswordSignup';

const Signin = () => {
  return (
    <KeyboardAwareScrollView contentContainerStyle={s.root}>
      <ImageBackground
        style={{
          minWidth: '100%',
          minHeight: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.light.background,
          flex: 1,
        }}
        source={bg}
        resizeMode="cover"
      >
        <LogoSignin />
        <SigninForms />
        <SigninFindPasswordSignup />
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

export default Signin;

const s = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: colors.light.background,
  },
});
