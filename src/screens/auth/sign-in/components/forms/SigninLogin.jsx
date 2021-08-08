import React from 'react';
import { View } from 'react-native';
import { StyleSheet, Text, Button } from '#components';
import { colors } from '#constants';

const SigninLogin = ({ onSubmit }) => {
  return (
    <Button
      style={s.button}
      textStyle={s.buttonInnerText}
      isBold
      onPress={onSubmit}
    >
      SIGN IN
    </Button>
  );
};

export default SigninLogin;

const s = StyleSheet.create({
  button: {
    width: 237.3,
    height: 28.2,
    paddingVertical: 13,
    paddingHorizontal: 20,
    marginTop: 13.5,
    borderRadius: 13,
    backgroundColor: colors.light.ivory5,
  },
  buttonInnerText: {
    color: colors.light.ivory1,
    fontSize: 18,
  },
});
