import React from 'react';
import { View } from 'react-native';
import { TextInput, Text, StyleSheet, Alert, RenderError } from '#components';
import { Email, LockPassword } from '#components/icon';
import { colors } from '#constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SigninInput = ({ values, onChange, onBlur, errors, touched }) => {
  const { email, password } = values;

  return (
    <View style={s.root}>
      <View style={s.inputSection}>
        <Email />
        <TextInput
          value={email}
          onChangeText={onChange('email')}
          onBlur={onBlur('email')}
          placeholder="EMAIL ACCOUNT"
        />
      </View>
      <RenderError touched={touched.email} errors={errors.email} />

      <View style={s.inputSection}>
        <LockPassword />
        <TextInput
          value={password}
          onChangeText={onChange('password')}
          onBlur={onBlur('password')}
          placeholder="PASSWORD"
          secureTextEntry
        />
      </View>
      <RenderError touched={touched.password} errors={errors.password} />
    </View>
  );
};

export default SigninInput;

const s = StyleSheet.create({
  root: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: hp('43%'),
  },
  inputSection: {
    flexDirection: 'row',
  },
});
