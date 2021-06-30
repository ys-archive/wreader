import React from 'react';
import { View, Alert } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '#navigators/ScreenNames';
import { StyleSheet, Text, TextInput, Button } from '#components';
import { Ionicons } from '@expo/vector-icons';

const initialValues = {
  email: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('이메일 형식에 맞지 않습니다. (예시: wreader1@gmail.com ...)')
    .required('필수 항목입니다.'),
});

const FindPassword = () => {
  const nav = useNavigation();
  const onSubmit = values => {
    Alert.alert('onLogin!', JSON.stringify(values, null, 2), [
      {
        text: 'OK!',
        onPress: () => console.log('alert closed!!'),
        style: 'destructive',
      },
    ]);
    nav?.navigate(ScreenNames.ChangePassword);
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });
  const { email } = values;

  return (
    <View style={s.root}>
      <View>
        <Text>인증메일이 발송되었습니다.</Text>
        <Text>인증메일을 확인 후 [메일 인증환료]</Text>
        <Text>버튼을 터치해 주세요.</Text>

        <Ionicons name="ios-mail-outline" size={70} color="black" />
      </View>
      <View style={s.emailSection}>
        <TextInput
          style={s.email}
          value={email}
          onBlur={handleBlur('email')}
          onChangeText={handleChange('email')}
          placeholder="example@gmail.com..."
        />
        {touched.email && errors.email ? (
          <View>
            <Text>{errors.email}</Text>
          </View>
        ) : null}
      </View>
      <View>
        <Text>인증메일이 도착하지 않았나요?</Text>
        <Text>[인증메일 재발송] 버튼을 터치해 주세요.</Text>
        <Button
          style={s.resendAuthMail}
          textStyle={s.resendAuthMailText}
          onPress={() => {}}
        >
          인증메일 재발송
        </Button>
        <Button style={s.summitButton} onPress={handleSubmit}>
          메일 인증완료
        </Button>
      </View>
    </View>
  );
};

export default FindPassword;

const s = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: '25%',
    width: '100%',
  },
  emailSection: {
    alignItems: 'center',
  },
  email: {},
  resendAuthMail: {
    alignSelf: 'flex-end',
  },
  resendAuthMailText: {
    color: 'blue',
  },
  summitButton: {
    marginTop: '10%',
    paddingHorizontal: '40%',
    paddingVertical: '4%',
    borderWidth: 1,
    borderRadius: 15,
  },
});
