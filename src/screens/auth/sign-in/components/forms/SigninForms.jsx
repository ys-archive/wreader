import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Alert } from '#components/alert';

import { useStoreActions } from 'easy-peasy';
import {
  actionsLogin,
  actionsSetEmail,
  actionsSetUserId,
  actionsSetUserInfo,
  actionsSetPassword,
} from '#store/actions';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import * as ScreenNames from '#navigators/ScreenNames';
import { AuthService } from '#services';

import SigninInput from './SigninInput';
import SigninAutoLogin from './SigninAutoLogin';
import SigninLogin from './SigninLogin';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email(
      'please, provide it again in email format (e.g. wreader1@gmail.com ...)',
    )
    .required("You can't leave out this field"),

  password: Yup.string()
    .max(28, "lettres can't be more than 28")
    .required("You can't leave out this field"),
});

const SigninForms = () => {
  const login = useStoreActions(actionsLogin);
  const setEmail = useStoreActions(actionsSetEmail);
  const setPassword = useStoreActions(actionsSetPassword);
  const setUserId = useStoreActions(actionsSetUserId);
  const setUserInfo = useStoreActions(actionsSetUserInfo);
  const nav = useNavigation();

  const onSubmit = async values => {
    const { email, password } = values;

    if (!email) {
      Alert('Please, fill out the email');
      return;
    }

    if (!password) {
      Alert('Please, fill out the password');
      return;
    }

    const { code, item } = await AuthService.POST_login(email, password);
    if (code === 1) {
      // console.log('!', item);
      login();
      setEmail(email);
      setPassword(password);
      setUserId(item.id);
      setUserInfo(item);
      // Alert('로그인 성공');
      nav.navigate(ScreenNames.Main);
    }

    if (code === 100) {
      Alert("Fail (it's in the withdrawal status)");
      return;
    }

    if (code === 102 || code === 103) {
      Alert('Fail (neither email or password is correct)');
      return;
    }
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

  useEffect(() => {
    setFieldValue('email', '');
    setFieldValue('password', '');
  }, []);

  return (
    <View>
      <SigninInput
        values={values}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
      />
      <SigninAutoLogin />
      <SigninLogin onSubmit={handleSubmit} />
    </View>
  );
};

export default SigninForms;
