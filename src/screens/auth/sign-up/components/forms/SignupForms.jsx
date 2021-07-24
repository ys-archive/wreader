import React from 'react';
import { View, Alert } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '#navigators/ScreenNames';

// import { AccountStateProvider } from '../../hooks/useAccountState';
import SignupInput from './SignupInput';
import SignupPolicyAndConditions from './SignupPolicyAndConditions';

const initialValues = {
  email: '',
  password: '',
  passwordRepeat: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('이메일 형식에 맞지 않습니다. (예시: wreader1@gmail.com ...)')
    .required('필수 항목입니다.'),

  password: Yup.string()
    .max(28, '28 자 이내여야 합니다.')
    .required('필수 입력 항목입니다.'),

  passwordRepeat: Yup.string().oneOf(
    [Yup.ref('password'), null],
    '재입력한 비밀번호가 일치하지 않습니다!',
  ),
});

const SignupForms = () => {
  const onSubmit = values => {
    Alert.alert('onLogin!', JSON.stringify(values, null, 2), [
      {
        text: 'OK!',
        onPress: () => console.log('alert closed!!'),
        style: 'destructive',
      },
    ]);
    // TODO: 입력한 데이터 (email, password, passwordRepeat)를
    // TODO: 함꼐 넘겨 Signup2 의 정보 와 함께 최종 회원가입시에 POST 처리 (CreateUser)
    nav?.navigate(ScreenNames.Signup2);
  };

  const nav = useNavigation();
  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  return (
    <View>
      <SignupInput
        values={values}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
      />
      <SignupPolicyAndConditions onSubmit={handleSubmit} />
    </View>
  );
};

export default SignupForms;
