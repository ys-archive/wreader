import React from 'react';
import PropTypes from 'prop-types';
import { View, Platform } from 'react-native';
import { Alert } from '#components/alert';
import { StyleSheet, TextInput, Button, Text, RenderError } from '#components';
import { AuthService } from '#services';

import { Email, LockPassword } from '#components/icon';
import { colors } from '#constants';

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

    if (code === 1) {
      Alert('Valid Mail!');
      setFieldValue('isGoodToProceed', true);
      return;
    }

    if (code === 101) {
      Alert('This mail is already in use. please, use another email');
      setFieldValue('isGoodToProceed', false);
      setFieldValue('email', '');
      return;
    }
  };

  const checkValidPassword = () => {
    if (password === passwordRepeat) {
      Alert('both passwords match!');
      setFieldValue('isGoodToProceed', true);
      return;
    }

    Alert('both passwords does not match!');
    setFieldValue('isGoodToProceed', false);
    setFieldValue('password', '');
    setFieldValue('passwordRepeat', '');
  };

  return (
    <View style={s.root}>
      <View style={s.inputSection}>
        <Email style={{ top: '50%' }} />
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
          textStyle={s.checkPasswordText}
          isBold
          onPress={checkEmailValidToUse}
        >
          VERIFY
        </Button>
      </View>

      <View style={s.inputSection}>
        <LockPassword style={{ top: '44%' }} />
        <TextInput
          value={password}
          onChangeText={onChange('password')}
          onBlur={onBlur('password')}
          placeholder="PASSWORD"
          style={{
            marginHorizontal: 0,
            // marginLeft: 10,
            minWidth: '96.7%',
            maxWidth: '96.7%',
          }}
          secureTextEntry
        />
      </View>

      <View style={s.inputSection}>
        <LockPassword style={{ top: '44%' }} />
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
        textStyle={s.checkPasswordText}
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
    marginBottom: 30,
    // flex: 1,
  },
  inputSection: {
    paddingVertical: 5,
  },
  checkEmailButton: {
    position: 'absolute',
    right: '0%',
    top: '55%',
  },
  checkPasswordText: {
    color: colors.light.white,
    fontSize: 14,
  },
  checkPasswordButton: {
    position: 'absolute',
    right: '0%',
    top: '81%',
  },
});
