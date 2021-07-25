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
import AuthService from '#service/AuthService';

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

const Signup2Form = ({ route }) => {
  const nav = useNavigation();
  const { email, password, isMarketingAllowedOptional } = route.params;

  const onSubmit = async values => {
    // TODO: 실제 가입 처리 ( alert 회원가입이 완료 or 실패 되었습니다 )
    // TODO: POST Create User service

    const { nickname, instagramUrl, facebookUrl, introduction } = values;
    const { code, status } = await AuthService.POST_createUser(
      email,
      password,
      nickname,
      instagramUrl,
      facebookUrl,
      introduction,
      isMarketingAllowedOptional,
    );

    if (code === 1) {
      Alert.alert('회원가입 완료', JSON.stringify(values, null, 2), [
        {
          text: 'OK!',
          onPress: () => console.log('alert closed!!'),
          style: 'destructive',
        },
      ]);
      // 다시 로그인 화면으로 되돌아감
      nav?.navigate(ScreenNames.Signin);
    }

    if (code === 101) {
      Alert.alert(
        '회원가입 실패 (입력한 이메일이 이미 존재합니다)',
        JSON.stringify(values, null, 2),
        [
          {
            text: 'OK!',
            onPress: () => console.log('alert closed!!'),
            style: 'destructive',
          },
        ],
      );
    }
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  const { nickname, instagramUrl, facebookUrl, introduction } = values;

  return (
    <View style={s.root}>
      <View style={s.inputSection}>
        <View style={s.left}>
          <Text>닉네임</Text>
          <Text>인스타그램</Text>
          <Text>페이스북</Text>
          <Text>소개</Text>
        </View>
        <View style={s.right}>
          <TextInput
            style={s.input}
            value={nickname}
            onBlur={handleBlur('nickname')}
            onChangeText={handleChange('nickname')}
            placeholder="닉네임을 입력하세요(20자 이내)"
          />
          <Button style={s.checkNickNameButton} onPress={() => {}}>
            중복 확인
          </Button>
          {/* {touched.nickname && errors.nickname ? (
              <View>
                <Text>{errors.nickname}</Text>
              </View>
            ) : null} */}
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
      </View>
      <Button style={s.summitButton} onPress={handleSubmit}>
        완료
      </Button>
    </View>
  );
};

export default Signup2Form;

const s = StyleSheet.create({
  root: {
    marginTop: '10%',
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputSection: {
    flexDirection: 'row',
    maxWidth: '90%',
  },
  left: {
    justifyContent: 'space-around',
  },
  right: {},
  input: {
    maxWidth: '80%',
  },
  checkNickNameButton: {
    position: 'relative',
    left: '35%',
    bottom: '17%',
  },
  summitButton: {
    marginTop: '10%',
    paddingHorizontal: '40%',
    paddingVertical: '4%',
    borderWidth: 1,
    borderRadius: 15,
  },
});
