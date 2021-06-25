import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { StyleSheet, TextInput, Button, Text } from '#components';

const SignupInput = ({ values, onChange, onBlur, errors, touched }) => {
  const { email, password, passwordRepeat } = values;
  return (
    <View>
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
      {/* TODO: 이메일 인증 로직 */}
      <Button style={s.checkEmailButton} onPress={() => {}}>
        인증하기
      </Button>
      <TextInput
        value={password}
        onChangeText={onChange('password')}
        onBlur={onBlur('password')}
        placeholder="비밀번호를 입력해 주세요"
      />
      <TextInput
        value={passwordRepeat}
        onChangeText={onChange('passwordRepeat')}
        onBlur={onBlur('passwordRepeat')}
        placeholder="비밀번호를 다시 입력해 주세요"
      />
      {touched.passwordRepeat && errors.passwordRepeat ? (
        <View>
          <Text>{errors.passwordRepeat}</Text>
        </View>
      ) : null}
      {/* TODO: 비밀번호 체크 */}
      <Button style={s.checkPasswordButton} onPress={() => {}}>
        확인
      </Button>
    </View>
  );
};

SignupInput.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
};

export default SignupInput;

const s = StyleSheet.create({
  root: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkEmailButton: {
    position: 'absolute',
    right: '0%',
    top: '10%',
    // textDecorationLine: 'underline line-through',
  },
  checkPasswordButton: {
    position: 'absolute',
    right: '0%',
    top: '77%',
  },
});
