import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Alert } from '#components/alert';
import { StyleSheet, TextInput, Button, Text, RenderError } from '#components';
import { AuthService } from '#services';

import { Email, LockPassword } from '#components/icon';
import { colors } from '#constants';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
      <View>
        <Email />
        <TextInput
          value={email}
          onChangeText={onChange('email')}
          onBlur={onBlur('email')}
          placeholder="E-MAIL ACCOUNT"
          style={{
            marginHorizontal: 0,
            minWidth: '96.7%',
            maxWidth: '96.7%',
          }}
        />
        <RenderError touched={touched.email} errors={errors.email} />
        <Button
          style={s.checkEmailButton}
          textStyle={s.checkEmailText}
          isBold
          onPress={checkEmailValidToUse}
        >
          VERIFY
        </Button>
      </View>

      <View>
        <LockPassword />
        <TextInput
          value={password}
          onChangeText={onChange('password')}
          onBlur={onBlur('password')}
          placeholder="PASSWORD"
          style={{
            marginHorizontal: 0,
            minWidth: '96.7%',
            maxWidth: '96.7%',
          }}
          secureTextEntry
        />
      </View>
      <View>
        <LockPassword />
        <TextInput
          value={passwordRepeat}
          onChangeText={onChange('passwordRepeat')}
          onBlur={onBlur('passwordRepeat')}
          placeholder="REPEAT THE PASSWORD"
          style={{
            marginHorizontal: 0,
            minWidth: '96.7%',
            maxWidth: '96.7%',
          }}
          secureTextEntry
        />
        <RenderError
          touched={touched.passwordRepeat}
          errors={errors.passwordRepeat}
        />
      </View>

      <Button
        style={s.checkPasswordButton}
        textStyle={s.checkEmailText}
        isBold
        onPress={checkValidPassword}
      >
        CHECK
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
    top: '41%',
  },
  checkEmailText: {
    color: colors.light.white,
    fontSize: 14,
  },
  checkPasswordButton: {
    position: 'absolute',
    right: '0%',
    top: '81%',
  },
});
