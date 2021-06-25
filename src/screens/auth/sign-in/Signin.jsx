import React, { useState, useCallback } from 'react';
import { View, Alert } from 'react-native';
import { useStoreActions } from 'easy-peasy';
import { StyleSheet } from '#components';
import { actionsLogin } from '#store/actions';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';

import SigninLogoTitle from './components/SigninLogoTitle';
import SigninInput from './components/SigninInput';
import SigninLogin from './components/SigninLogin';
import SigninFindPasswordSignup from './components/SigninFindPasswordSignup';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('이메일 형식에 맞지 않습니다. (예시: wreader1@gmail.com ...)')
    .required('필수 항목입니다.'),
  password: Yup.string()
    .max(28, '28 자 이내여야 합니다.')
    .required('필수 입력 항목입니다.'),
});

const onSubmit = values => {
  Alert.alert('onLogin!', JSON.stringify(values, null, 2), [
    {
      text: 'OK!',
      onPress: () => console.log('alert closed!!'),
      style: 'destructive',
    },
  ]);
  //
};

const Signin = () => {
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  return (
    <View style={s.root}>
      <SigninLogoTitle />
      <SigninInput
        values={values}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
      />
      <SigninLogin onSubmit={handleSubmit} />

      <SigninFindPasswordSignup />
    </View>
  );
};

export default Signin;

const s = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
