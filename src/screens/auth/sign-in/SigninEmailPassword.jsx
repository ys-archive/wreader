import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { TextInput } from '#components';

const SigninEmailPassword = ({
  style = {},
  email,
  password,
  onChangeEmailText,
  onChangePasswordText,
}) => (
  <View style={{ ...s.root, ...style }}>
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

SigninEmailPassword.propTypes = {
  style: PropTypes.object,
  email: PropTypes.string,
  password: PropTypes.string,
  onChangeEmailText: PropTypes.func.isRequired,
  onChangePasswordText: PropTypes.func.isRequired,
};

SigninEmailPassword.defaultProps = {
  style: {},
  email: '',
  password: '',
};

export default SigninEmailPassword;

const s = StyleSheet.create({
  root: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
