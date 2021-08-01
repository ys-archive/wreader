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

const SigninForms = () => {
  const login = useStoreActions(actionsLogin);
  const setEmail = useStoreActions(actionsSetEmail);
  const setPassword = useStoreActions(actionsSetPassword);
  const setUserId = useStoreActions(actionsSetUserId);
  const setUserInfo = useStoreActions(actionsSetUserInfo);
  const nav = useNavigation();

  const onSubmit = async values => {
    const { email, password } = values;
    // console.log(email, password);

    const { code, item } = await AuthService.POST_login(email, password);
    // code === 1: 로그인 성공
    if (code === 1) {
      console.log('로그인 완료!', item);
      login();
      setEmail(email);
      setPassword(password);
      setUserId(item.id);
      setUserInfo(item);
      Alert('로그인 성공');
      nav.navigate(ScreenNames.Main);
    }

    // code === 100 : 탈퇴 신청 중 회원
    if (code === 100) {
      Alert('로그인 실패 (탈퇴 신청 중인 회원입니다)');
    }

    // code === 102 : 잘못된 이메일
    // code === 103 : 잘못된 비밀번호
    if (code === 102 || code === 103) {
      Alert('로그인 실패! (이메일이나 비밀번호가 잘못되었습니다)');
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
      <SigninLogin onSubmit={handleSubmit} />
    </View>
  );
};

export default SigninForms;
