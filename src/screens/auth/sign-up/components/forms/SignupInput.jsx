import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Alert } from '#components/alert';
import { StyleSheet, TextInput, Button, Text } from '#components';
import { AuthService } from '#services';

const SignupInput = ({
  values,
  onChange,
  setFieldValue,
  onBlur,
  errors,
  touched,
}) => {
  const { email, password, passwordRepeat } = values;

  const checkEmailValidToUse = async () => {
    const code = await AuthService.GET_CheckUserExists(email);
    console.log(code);

    if (code === 1) {
      Alert('사용가능한 메일입니다.');
      setFieldValue('isGoodToProceed', true);
    }

    if (code === 101) {
      Alert('이미 사용중인 메일입니다. 다른 이메일을 입력해주세요');
      setFieldValue('isGoodToProceed', false);
      // setFieldValue('email', '');
    }
  };

  const checkValidPassword = () => {
    const isValid = password === passwordRepeat;
    if (isValid) {
      Alert('입력하신 비밀번호가 서로 같습니다.');
    } else {
      Alert('입력하신 비밀번호가 서로 다릅니다.');
    }
    setFieldValue('isGoodToProceed', isValid);
  };

  return (
    <View>
      <TextInput
        value={email}
        onChangeText={onChange('email')}
        onBlur={onBlur('email')}
        placeholder="이메일을 입력해 주세요"
      />
      {/* {touched.email && errors.email ? (
        <View>
          <Text>{errors.email}</Text>
        </View>
      ) : null} */}
      {/* TODO: 이메일 인증 로직 */}
      {/* TODO: Formik 연동 후 이메일을 다시 입력하게함! */}
      <Button style={s.checkEmailButton} onPress={checkEmailValidToUse}>
        중복 확인
      </Button>
      <TextInput
        value={password}
        onChangeText={onChange('password')}
        onBlur={onBlur('password')}
        placeholder="비밀번호를 입력해 주세요"
        secureTextEntry
      />
      <TextInput
        value={passwordRepeat}
        onChangeText={onChange('passwordRepeat')}
        onBlur={onBlur('passwordRepeat')}
        placeholder="비밀번호를 다시 입력해 주세요"
        secureTextEntry
      />
      {/* {touched.passwordRepeat && errors.passwordRepeat ? (
        <View>
          <Text>{errors.passwordRepeat}</Text>
        </View>
      ) : null} */}
      {/* TODO: 비밀번호 체크 */}
      <Button style={s.checkPasswordButton} onPress={checkValidPassword}>
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
