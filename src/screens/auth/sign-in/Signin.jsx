import React from 'react';
import { ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet } from '#components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '../../../navigators/ScreenNames';

import { bg } from '#constants/images';
import { LogoSignin, Cancel } from '#components/icon';
import { colors } from '#constants';

import SigninForms from './components/forms/SigninForms';
import SigninFindPasswordSignup from './components/SigninFindPasswordSignup';

const Signin = () => {
  const nav = useNavigation();
  const onPressGoBackIcon = () => {
    // nav.navigate(ScreenNames.Signin);
    nav.goBack();
  };

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
        <Cancel
          onPress={onPressGoBackIcon}
          style={{ top: '7%', right: '5%' }}
        />
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
