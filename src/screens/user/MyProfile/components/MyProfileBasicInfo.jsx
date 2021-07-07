import React from 'react';
import {
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '#navigators/ScreenNames';
import { StyleSheet, Text, TextInput, Button } from '#components';

const initialValues = {
  nickname: '',
  instagramUrl: '',
  facebookUrl: '',
  introduction: '',
};

const validationSchema = Yup.object({
  nickname: Yup.string()
    .min(2, '2자 이상으로 정해주세요!')
    .required('필수 항목입니다.'),

  instagramUrl: Yup.string(),

  facebookUrl: Yup.string(),

  introduction: Yup.string().max(50, '최대 50자까지 작성 하실 수 있습니다.'),
});

const MyProfileBasicInfo = () => {
  const onSubmit = values => {
    Alert.alert('onLogin!', JSON.stringify(values, null, 2), [
      {
        text: 'OK!',
        onPress: () => console.log('alert closed!!'),
        style: 'destructive',
      },
    ]);
    // TODO: alert 회원가입이 완료되었습니다
    // TODO: or alert 회원가입이 실패했습니다.
    // TODO: 실제 가입 처리
    nav?.navigate(ScreenNames.Signin);
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema,
      // TODO: 실제 가입 처리
      onSubmit,
    });

  const { nickname, instagramUrl, facebookUrl, introduction } = values;

  return (
    <View style={s.root}>
      <Text isBold>⁕&nbsp;기본정보</Text>
      <View style={s.inputSection}>
        <View style={s.inputView}>
          <View style={s.inputNamePlacer}>
            <Text>닉네임</Text>
          </View>
          <TextInput
            style={s.input}
            value={nickname}
            onBlur={handleBlur('nickname')}
            onChangeText={handleChange('nickname')}
            placeholder="닉네임을 입력하세요(20자 이내)"
          />
          {/* {touched.nickname && errors.nickname ? (
                  <View>
                    <Text>{errors.nickname}</Text>
                  </View>
                ) : null} */}
        </View>

        <View style={s.inputView}>
          <View style={s.inputNamePlacer}>
            <Text>인스타그램</Text>
          </View>
          <TextInput
            style={s.input}
            value={instagramUrl}
            onBlur={handleBlur('instagramUrl')}
            onChangeText={handleChange('instagramUrl')}
            placeholder="(선택)"
          />
          {/* {touched.instagramUrl && errors.instagramUrl ? (
                  <View>
                    <Text>{errors.instagramUrl}</Text>
                  </View>
                ) : null} */}
        </View>

        <View style={s.inputView}>
          <View style={s.inputNamePlacer}>
            <Text>페이스북</Text>
          </View>
          <TextInput
            style={s.input}
            value={facebookUrl}
            onBlur={handleBlur('facebookUrl')}
            onChangeText={handleChange('facebookUrl')}
            placeholder="(선택)"
          />
          {/* {touched.facebookUrl && errors.facebookUrl ? (
                <View>
                  <Text>{errors.facebookUrl}</Text>
                </View>
              ) : null} */}
        </View>

        <View style={s.inputView}>
          <View style={s.inputNamePlacer}>
            <Text>소개</Text>
          </View>
          <TextInput
            style={s.input}
            value={introduction}
            onBlur={handleBlur('introduction')}
            onChangeText={handleChange('introduction')}
            placeholder="나를 소개할 문구를 적어주세요 (50자)"
          />
          {/* {touched.introduction && errors.introduction ? (
                  <View>
                    <Text>{errors.introduction}</Text>
                  </View>
                ) : null} */}
        </View>

        <Button style={s.summitButton} onPress={handleSubmit}>
          완료
        </Button>
      </View>
    </View>
  );
};

export default MyProfileBasicInfo;

const s = StyleSheet.create({
  root: {
    marginTop: 25,
  },
  inputSection: {
    alignItems: 'center',
  },
  inputView: {
    maxWidth: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputNamePlacer: {
    width: '25%',
  },
  input: {
    maxWidth: '70%',
    padding: 0,
  },
  summitButton: {
    marginTop: '10%',
    paddingHorizontal: '40%',
    paddingVertical: '4%',
    borderWidth: 1,
    borderRadius: 15,
  },
});
