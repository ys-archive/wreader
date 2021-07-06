import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TextInput, Button } from '#components';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  password: '',
};

const validationSchema = Yup.object({
  password: Yup.string()
    .max(28, '28 자 이내여야 합니다.')
    .required('필수 입력 항목입니다.'),
});

const MyProfilePassword = () => {
  const onSubmit = values => {
    Alert.alert('onChangePassword!', JSON.stringify(values, null, 2), [
      {
        text: 'OK!',
        onPress: () => console.log('alert closed!!'),
        style: 'destructive',
      },
    ]);
    // TODO: password 변경
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
      <TextInput
        style={s.textInput}
        value={password}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        placeholder="새 비밀번호를 입력하세요"
      />
      <Button style={s.button} textStyle={s.buttonText} onPress={handleSubmit}>
        수정
      </Button>
      {/* {touched.password && errors.password ? (
        <View>
          <Text>{errors.password}</Text>
        </View>
      ) : null} */}
    </View>
  );
};

export default MyProfilePassword;

const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
    maxWidth: '100%',

    // flex: 1,
  },
  textInput: {
    width: '60%',
    borderWidth: 1,
    borderColor: 'black',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonText: {
    textAlign: 'center',
  },
});
