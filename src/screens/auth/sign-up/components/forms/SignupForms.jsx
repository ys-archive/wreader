import React from 'react';
import { View } from 'react-native';
// import { AlertWithValue } from '#components/alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '#navigators/ScreenNames';

// TODO: 회원가입에 store 필요?
// import { useStoreActions } from 'easy-peasy';
// import { actionsSignup } from '#store/actions';

import SignupInput from './SignupInput';
import SignupPolicyAndConditions from './SignupPolicyAndConditions';

const initialValues = {
  email: '',
  password: '',
  passwordRepeat: '',
  isAllAllowed: false,
  isAgreementAllowed: false,
  isPrivacyPolicyAllowed: false,
  isMarketingAllowedOptional: false,
  isGoodToProceed: false,
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

  isAllAllowed: Yup.bool(),

  isAgreementAllowed: Yup.bool().oneOf([true], '이용약관 동의는 필수입니다.'),

  isPrivacyPolicyAllowed: Yup.bool().oneOf(
    [true],
    '개인정보 취급방침 동의는 필수입니다.',
  ),

  isMarketingAllowedOptional: Yup.bool(),

  isGoodToProceed: Yup.bool().oneOf([true]),
});

const SignupForms = () => {
  // const signup = useStoreActions(actionsSignup);
  const nav = useNavigation();

  const onSubmit = values => {
    // AlertWithValue('signup2', '닫기', JSON.stringify(values, null, 2));
    nav?.navigate(ScreenNames.Signup2, values);
  };

  const {
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View>
      <SignupInput
        values={values}
        onChange={handleChange}
        setFieldValue={setFieldValue}
        onBlur={handleBlur}
        errors={errors}
        touched={touched}
      />
      <SignupPolicyAndConditions
        onSubmit={handleSubmit}
        values={values}
        setFieldValue={setFieldValue}
        // onBlur={handleBlur}
        // errors={errors}
        // touched={touched}
      />
    </View>
  );
};

export default SignupForms;
