import React from 'react';
import { View, Platform } from 'react-native';
import { Alert } from '#components/alert';
import { RenderError } from '#components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '#navigators/ScreenNames';
import { StyleSheet, Text, TextInput, Button } from '#components';
import { AuthService } from '#services';
import { Me, Instagram, Facebook, Person } from '#components/icon';
import { colors } from '#constants';

const initialValues = {
  nickname: '',
  instagramUrl: '',
  facebookUrl: '',
  introduction: '',
};

const validationSchema = Yup.object({
  nickname: Yup.string()
    .min(2, 'User Name must be at least 2')
    .required('You must fill out with this input'),

  instagramUrl: Yup.string(),

  facebookUrl: Yup.string(),

  introduction: Yup.string().max(50, "You can't type longer than 50"),
});

const Signup2Form = ({ route }) => {
  const nav = useNavigation();

  const onSubmit = async values => {
    const { email, password, isMarketingAllowedOptional } = route.params;
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

    // 회원가입 완료
    if (code === 1) {
      Alert('Sign up Complete');
    }

    // 이메일이 이미 존재
    if (code === 101) {
      Alert('Sign up Fail (Email already exists)');
    }

    // 다시 로그인 화면으로 되돌아감
    nav?.navigate(ScreenNames.Signin);
  };

  const checkNickNameValid = async () => {
    const code = await AuthService.GET_CheckUserNickExists(nickname);

    if (code === 1) {
      Alert('Available user name');
    }

    // 중복!
    else {
      Alert('Already claimed user name');
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
        <View style={s.inputSectionItem}>
          <Me
            iconStyle={{
              position: 'absolute',
              top: Platform.OS === 'android' ? 28 : 20,
              left: 30,
            }}
          />
          <TextInput
            style={s.input}
            value={nickname}
            onBlur={handleBlur('nickname')}
            onChangeText={handleChange('nickname')}
            placeholder="USER NAME"
          />
          <Button
            style={s.checkNickNameButton}
            textStyle={s.checkNickNameText}
            isBold
            onPress={checkNickNameValid}
          >
            VERIFY
          </Button>
          <RenderError touched={touched.nickname} errors={errors.nickname} />
        </View>

        <View style={s.inputSectionItem}>
          <Instagram iconStyle={{ position: 'absolute', top: 0, left: 0 }} />
          <TextInput
            style={s.input}
            value={instagramUrl}
            onBlur={handleBlur('instagramUrl')}
            onChangeText={handleChange('instagramUrl')}
            placeholder="INSTAGRAM ACCOUNT (NOT REQUIRED)"
          />
          <RenderError
            touched={touched.instagramUrl}
            errors={errors.instagramUrl}
          />
        </View>

        <View style={s.inputSectionItem}>
          <Facebook iconStyle={{ position: 'absolute', top: 0, left: 0 }} />
          <TextInput
            style={s.input}
            value={facebookUrl}
            onBlur={handleBlur('facebookUrl')}
            onChangeText={handleChange('facebookUrl')}
            placeholder="FACEBOOK ACCOUNT (NOT REQUIRED)"
          />
          <RenderError
            touched={touched.facebookUrl}
            errors={errors.facebookUrl}
          />
        </View>

        <View style={s.inputSectionItem}>
          <Person
            iconStyle={{
              position: 'absolute',
              top: Platform.OS === 'android' ? 28 : 20,
              left: 28,
            }}
          />
          <TextInput
            style={s.input}
            value={introduction}
            onBlur={handleBlur('introduction')}
            onChangeText={handleChange('introduction')}
            placeholder="Let them know about you"
          />
          <RenderError
            touched={touched.introduction}
            errors={errors.introduction}
          />
        </View>
      </View>
      <Button
        style={s.summitButton}
        textStyle={s.summitText}
        isBold
        onPress={handleSubmit}
      >
        CREATE AN ACCOUNT
      </Button>
    </View>
  );
};

export default Signup2Form;

const s = StyleSheet.create({
  root: {
    marginBottom: 30,
  },
  inputSection: {
    paddingVertical: 10,
  },
  inputSectionItem: {
    flexDirection: 'row',
  },
  input: {
    marginHorizontal: 0,
    minWidth: '96.7%',
    maxWidth: '96.7%',
    ...Platform.select({
      ios: {
        fontSize: 11,
      },
      android: {
        fontSize: 14,
      },
    }),
    // Platform.select({ios: {fontSize: 10}
  },
  checkNickNameButton: {
    position: 'absolute',
    right: 7,
    bottom: 24,
  },
  checkNickNameText: {
    color: colors.light.white,
  },
  summitButton: {
    marginLeft: 0,
    marginTop: Platform.OS === 'ios' ? '50%' : '35%',
    minWidth: '96.7%',
    maxWidth: '96.7%',
    paddingVertical: '4.5%',
    borderRadius: 11,
    backgroundColor: colors.light.ivory5,
  },
  summitText: {
    color: colors.light.white,
    fontSize: 18,
  },
});
