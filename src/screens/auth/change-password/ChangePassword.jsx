import React from 'react';
import { View, Alert } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '#navigators/ScreenNames';
import { StyleSheet, Text, TextInput, Button } from '#components';
import { Ionicons } from '@expo/vector-icons';

const initialValues = {
  password: '',
  passwordRepeat: '',
};

const validationSchema = Yup.object({
  password: Yup.string()
    .max(28, '28 자 이내여야 합니다.')
    .required('필수 입력 항목입니다.'),

  passwordRepeat: Yup.string().oneOf(
    [Yup.ref('password'), null],
    '재입력한 비밀번호가 일치하지 않습니다!',
  ),
});

const ChangePassword = () => {
  const nav = useNavigation();
  const onSubmit = values => {
    Alert.alert('onLogin!', JSON.stringify(values, null, 2), [
      {
        text: 'OK!',
        onPress: () => console.log('alert closed!!'),
        style: 'destructive',
      },
    ]);
    // TODO: data 를 넘긴다!
    nav?.navigate(ScreenNames.Signin);
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });
  const { password, passwordRepeat } = values;

  return (
    <View style={s.root}>
      <View style={s.row1}>
        <Ionicons name="checkmark" size={70} color="black" />
        <Text>새로운 비밀번호를 입력 해주세요.</Text>
      </View>
      <View>
        <TextInput
          value={password}
          onBlue={handleBlur('password')}
          onChangeText={handleChange('password')}
          placeholder="비밀번호 입력 해주세요 (4 ~ 12자)"
          secureTextEntry
        />
        {touched.password && errors.password ? (
          <View>
            <Text>{errors.password}</Text>
          </View>
        ) : null}
        <TextInput
          value={passwordRepeat}
          onBlue={handleBlur('passwordRepeat')}
          onChangeText={handleChange('passwordRepeat')}
          placeholder="비밀번호를 다시 입력 해주세요 (4 ~ 12자)"
          secureTextEntry
        />
        {touched.passwordRepeat && errors.passwordRepeat ? (
          <View>
            <Text>{errors.passwordRepeat}</Text>
          </View>
        ) : null}
      </View>
      <Button style={s.summitButton} onPress={handleSubmit} isBold>
        비밀번호 변경완료
      </Button>
    </View>
  );
};

export default ChangePassword;

const s = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: '25%',
    width: '100%',
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summitButton: {
    marginTop: '10%',
    paddingHorizontal: '10%',
    paddingVertical: '4%',
    borderWidth: 1,
    borderRadius: 15,
  },
});
