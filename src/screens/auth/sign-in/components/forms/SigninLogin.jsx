import React from 'react';
import { View } from 'react-native';
import { StyleSheet, Text, Button } from '#components';
import { colors } from '#constants';

const SigninLogin = ({ onSubmit }) => {
  return (
    <View>
      <Button style={s.button} textStyle={s.buttonInnerText} isBold>
        SIGN IN
      </Button>
    </View>
  );
};

export default SigninLogin;

const s = StyleSheet.create({
  button: {
    width: 237.3,
    height: 28.2,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 13,
    backgroundColor: colors.light.ivory4,
  },
  buttonInnerText: {
    color: colors.light.ivory1,
    fontSize: 18,
  },
});
