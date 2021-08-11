import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Alert } from '#components/alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '#navigators/ScreenNames';
import { StyleSheet, Text, TextInput, Button } from '#components';
import { UserService } from '#services';
import { useStoreState } from 'easy-peasy';
import {
  selectUserId,
  selectPassword,
  selectUserInfo,
} from '#store/selectors';

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
  // TODO: 기본 Profile 정보 불러와 로드하기

  const nav = useNavigation();
  const userId = useStoreState(selectUserId);
  const password = useStoreState(selectPassword);
  const userInfo = useStoreState(selectUserInfo);

  const onSubmit = async values => {
    const { nickname, instagramUrl, facebookUrl, introduction } = values;
    const code = await UserService.PUT_updateUserInfo(
      userId,
      password,
      nickname,
      instagramUrl,
      facebookUrl,
      introduction,
    );

    if (code === 1) {
      Alert('프로필 업데이트됨!');
    } else {
      Alert('프로필 업데이트실패!');
    }

    nav.navigate(ScreenNames.MainStack);
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
    // TODO: 실제 가입 처리
    onSubmit,
  });

  const { nickname, instagramUrl, facebookUrl, introduction } = values;

  useEffect(() => {
    console.log(userInfo);
    if (!userInfo) {
      return;
    }

    setFieldValue('nickname', userInfo.nick || '');
    setFieldValue('instagramUrl', userInfo.instagram || '');
    setFieldValue('facebookUrl', userInfo.facebook || '');
    setFieldValue('introduction', userInfo.intro || '');
  }, [userInfo]);

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
    // marginTop: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
