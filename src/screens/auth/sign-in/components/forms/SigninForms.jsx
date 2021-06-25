import React from 'react';
import { View, Alert } from 'react-native';
// import { useStoreActions } from 'easy-peasy';
// import { actionsLogin } from '#store/actions';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import SigninInput from './SigninInput';
import SigninLogin from './SigninLogin';

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

const SigninForms = () => {
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema,
      // TODO: 실제 로그인 처리 (SWR)
      onSubmit,
    });

  return (
    <View>
      <SigninInput
        values={values}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
      />
      <SigninLogin onSubmit={handleSubmit} />
    </View>
  );
};

export default SigninForms;
