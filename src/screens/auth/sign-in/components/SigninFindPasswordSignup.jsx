import React from 'react';
// import PropTypes from 'prop-types';
import { View } from 'react-native';
import { StyleSheet, Separator, Button, Text } from '#components';
import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '../../../../navigators/ScreenNames';
import { colors } from '#constants';

const SigninFindPasswordSignup = () => {
  const nav = useNavigation();

  const onPressFindPassword = () => {
    nav?.navigate(ScreenNames.FindPassword);
  };

  const onPressSignup = () => {
    nav?.navigate(ScreenNames.Signup);
  };

  return (
    <View style={s.root}>
      <Button
        style={s.findPWButton}
        textStyle={s.findPWText}
        onPress={onPressFindPassword}
      >
        Forgot Password?
      </Button>

      <Text style={s.or}>OR</Text>

      <Button
        style={s.signupButton}
        textStyle={s.signupText}
        isBold
        onPress={onPressSignup}
      >
        SIGN UP
      </Button>
    </View>
  );
};

export default SigninFindPasswordSignup;

const s = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  findPWButton: {
    marginTop: 6,
  },
  findPWText: {
    fontSize: 20,
    color: colors.light.white,
  },
  or: {
    fontSize: 20,
    color: colors.light.whiteTransparent,
    marginTop: 20,
  },
  signupButton: {
    minWidth: 237.3,
    height: 28.2,
    paddingVertical: 13,
    paddingHorizontal: 120,
    marginTop: 33.5,
    borderRadius: 13,
    backgroundColor: colors.light.ivory4,
  },
  signupText: {
    color: colors.light.ivory1,
    fontSize: 18,
  },
});
