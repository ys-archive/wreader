import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { TextInput } from '#components';

const SigninInput = ({
  email,
  password,
  onChangeEmailText,
  onChangePasswordText,
}) => (
  <View style={s.root}>
    <TextInput
      text={email}
      onChangeText={onChangeEmailText}
      placeholder="이메일을 입력해 주세요"
    />
    <TextInput
      text={password}
      onChangeText={onChangePasswordText}
      placeholder="비밀번호를 입력해 주세요"
    />
  </View>
);

SigninInput.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onChangeEmailText: PropTypes.func.isRequired,
  onChangePasswordText: PropTypes.func.isRequired,
};

SigninInput.defaultProps = {
  email: '',
  password: '',
};

export default SigninInput;

const s = StyleSheet.create({
  root: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
