import React from 'react';
import { View, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from '#components/alert';
import { RenderError } from '#components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '#navigators/ScreenNames';
import { StyleSheet, Text, TextInput, Button } from '#components';
import { Ionicons } from '@expo/vector-icons';
import { LockFindPassword, Email, LockPassword } from '#components/icon';
import { colors } from '#constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SignupPolicyTexts from '../sign-up/components/SignupPolicyTexts';

const initialValues = {
  password: '',
  passwordRepeat: '',
};

const validationSchema = Yup.object({
  password: Yup.string()
    .max(28, "lettres can't be longer than 28")
    .min(8, 'your password must be 8 or more characters long')
    .required("You can't leave out this field"),

  passwordRepeat: Yup.string()
    .oneOf([Yup.ref('password'), null], 'neither password matches')
    .max(28, "lettres can't be longer than 28")
    .min(8, 'your password must be 8 or more characters long')
    .required("You can't leave out this field"),
});

const ChangePassword = () => {
  const nav = useNavigation();
  const onSubmit = values => {
    Alert('Changing password succeeds!');
    nav?.navigate(ScreenNames.Signin);
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const { password, passwordRepeat } = values;

  const checkValidPassword = () => {
    if (password === passwordRepeat) {
      Alert('입력하신 비밀번호가 서로 같습니다.');
      setFieldValue('isGoodToProceed', true);
      return;
    }

    Alert('입력하신 비밀번호가 서로 다릅니다.');
    setFieldValue('isGoodToProceed', false);
    setFieldValue('password', '');
    setFieldValue('passwordRepeat', '');
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={s.root}>
      <View style={s.placer}>
        <SignupPolicyTexts
          title="FORGOT PASSWORD"
          subtitle="VERFYING YOUR ACCOUNT"
          subtitleDetail1="A VERIFYING MAIL SENT TO YOUR E-MAIL ACCOUNT."
          subtitleDetail2="PLEASE CHECK THE E-MAIL AND"
          subtitleDetail3="PRESS THE [VERIFYING COMPLETE] BUTTON"
        />

        <View style={s.lockSection}></View>

        <LockFindPassword
          style={{ position: 'absolute', left: '34%', top: '28%' }}
        />

        <View>
          <View>
            <LockPassword />
            <TextInput
              style={s.passwordInput}
              value={password}
              onBlue={handleBlur('password')}
              onChangeText={handleChange('password')}
              placeholder="PASSWORD"
              secureTextEntry
            />
            <RenderError touched={touched.password} errors={errors.password} />
          </View>

          <View>
            <LockPassword />
            <TextInput
              style={s.passwordInput}
              value={passwordRepeat}
              onBlue={handleBlur('passwordRepeat')}
              onChangeText={handleChange('passwordRepeat')}
              placeholder="REPEAT THE PASSWORD"
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

        <Button
          style={s.summitButton}
          textStyle={s.summitText}
          isBold
          onPress={handleSubmit}
        >
          CHANGE PASSWORD
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ChangePassword;

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  placer: {
    flex: 1,
    height: '100%',
    marginHorizontal: '5.7%',
  },
  lockSection: {
    // flex: 0.5,
    width: '100%',
    minHeight: 250,
  },
  passwordInput: {
    marginLeft: 0,
    paddingLeft: 55,
    maxWidth: wp('83%'),
    minWidth: wp('83%'),
  },
  summitButton: {
    marginTop: '50%',
    // paddingHorizontal: '20%',
    paddingVertical: '4%',
    borderRadius: 11,
    backgroundColor: colors.light.ivory5,
  },
  summitText: {
    color: colors.light.white,
    fontSize: 18,
  },
  checkPasswordText: {
    color: colors.light.white,
    fontSize: 14,
  },
  checkPasswordButton: {
    position: 'absolute',
    right: '5%',
    top: '70%',
  },
});
