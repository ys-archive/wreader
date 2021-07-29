import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Alert } from '#components/alert';
import { TextInput, Text, Button } from '#components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import UserService from '#service/UserService';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { selectUserId } from '#store/selectors';
import { actionsLogout } from '#store/actions';
import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '#navigators/ScreenNames';

const initialValues = {
  password: '',
};

const validationSchema = Yup.object({
  password: Yup.string()
    .max(28, '28 자 이내여야 합니다.')
    .required('필수 입력 항목입니다.'),
});

const MyProfilePassword = () => {
  const nav = useNavigation();
  const userId = useStoreState(selectUserId);
  const logoutAfterChangingPassword = useStoreActions(actionsLogout);

  const onSubmit = async values => {
    const { password } = values;
    const code = await UserService.PUT_updateUserPassword(userId, password);

    if (code === 1) {
      Alert('비밀번호 변경! 다시 로그인 해주세요');
      logoutAfterChangingPassword();
    } else {
      Alert('비밀번호 변경 실패');
    }
    nav.navigate(ScreenNames.Main);
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  const { password } = values;

  return (
    <View style={s.root}>
      <Text>비밀번호:&nbsp;</Text>
      <View style={s.inputSection}>
        <TextInput
          style={s.textInput}
          value={password}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          placeholder="새 비밀번호를 입력하세요"
        />
        <Button
          style={s.button}
          textStyle={s.buttonText}
          onPress={handleSubmit}
        >
          수정
        </Button>
        {/* {touched.password && errors.password ? (
          <View>
            <Text>{errors.password}</Text>
          </View>
        ) : null} */}
      </View>
    </View>
  );
};

export default MyProfilePassword;

const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: '75%',
    alignItems: 'center',
  },
  inputSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 18,
  },
  textInput: {
    // marginLeft: 10,
    width: '60%',
    padding: 0,
    textAlign: 'center',
  },
  button: {
    // paddingVertical: 5,
    // paddingHorizontal: 15,
  },
  buttonText: {
    textAlign: 'center',
  },
});
