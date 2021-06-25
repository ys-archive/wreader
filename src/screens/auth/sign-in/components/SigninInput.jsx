import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { TextInput, Text } from '#components';

const SigninInput = ({ values, onChange, onBlur, errors, touched }) => {
  const { email, password } = values;
  return (
    <View style={s.root}>
      <TextInput
        value={email}
        onChangeText={onChange('email')}
        onBlur={onBlur('email')}
        placeholder="이메일을 입력해 주세요"
      />
      {touched.email && errors.email ? (
        <View>
          <Text>{errors.email}</Text>
        </View>
      ) : null}
      <TextInput
        value={password}
        onChangeText={onChange('password')}
        onBlur={onBlur('password')}
        placeholder="비밀번호를 입력해 주세요"
      />
      {touched.password && errors.password ? (
        <View>
          <Text>{errors.password}</Text>
        </View>
      ) : null}
    </View>
  );
};

SigninInput.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default SigninInput;

const s = StyleSheet.create({
  root: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
