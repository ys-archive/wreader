import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Alert } from '#components/alert';
import { TextInput, Text, Button } from '#components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import UserService from '#service/UserService';
import { useStoreState } from 'easy-peasy';
import { selectUserId } from '#store/selectors';
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

  // TODO: PUT 결과 보고 (nick 이 required 맞는지, default -> 기존 nick 사용), lift-up 할지 그냥 쓸지 결정
  const onSubmit = async values => {
    const code = await UserService.PUT_updateUser(userId);

    if (code === 1) {
      Alert('비밀번호 변경!');
      // TODO: 변경한 비밀번호로 재 로그인 해야됨?
    } else {
      Alert('비밀번호 변경 실패');
    }
    // TODO: 이전 or 메인으로 navigate
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
