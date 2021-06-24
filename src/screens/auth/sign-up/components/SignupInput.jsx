import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { StyleSheet, TextInput, Button } from '#components';
import {
  useEmail,
  useSetEmail,
  useSetPassword,
  useSetValid,
} from '../hooks/useAccountState';

const SignupInput = () => {
  const email = useEmail();
  const setEmail = useSetEmail();

  const [tempPassword, setTempPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const setValid = useSetValid();

  useEffect(() => {
    const isValid = tempPassword === passwordRepeat;
    setValid(isValid);
    if (isValid) {
    }
  }, [tempPassword, passwordRepeat]);

  return (
    <View>
      <TextInput
        placeholder="이메일을 입력해 주세요"
        text={email}
        onChangeText={setEmail}
      />
      <Button style={s.checkEmailButton}>인증하기</Button>
      <TextInput
        placeholder="비밀번호를 입력해 주세요"
        text={tempPassword}
        onChangeText={setTempPassword}
      />
      <TextInput
        placeholder="비밀번호를 다시 입력해 주세요"
        text={passwordRepeat}
        onChangeText={setPasswordRepeat}
      />
      <Button style={s.checkPasswordButton}>확인</Button>
    </View>
  );
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
