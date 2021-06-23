import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { TextInput } from '#components';

const SigninEmailPassword = ({ style = {} }) => {
  const [email, setEmail] = useState('');
  const onChangeEmailText = text => setEmail(text);

  const [password, setPassword] = useState('');
  const onChangePasswordText = text => setPassword(text);

  return (
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
};

SigninEmailPassword.propTypes = {
  style: PropTypes.object,
};

SigninEmailPassword.defaultProps = {
  style: {},
};

export default SigninEmailPassword;

const s = StyleSheet.create({
  root: {
    // flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // width: '100%',
    // height: 100,
  },
});
