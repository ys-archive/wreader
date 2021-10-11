import React, { useEffect, useState, useRef } from 'react';
import { View, Platform } from 'react-native';
import { StyleSheet, Text, TextInput, RenderError, Button } from '#components';
import { Alert } from '#components/alert';
import { Edit2 } from '#components/icon';
import { colors } from '#constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '#navigators/ScreenNames';

import { UserService } from '#services';

import { useStoreState } from 'easy-peasy';
import { selAuth } from '../../../../store/selectors';

const initialValues = {
  instagramUrl: '',
  facebookUrl: '',
  introduction1: '',
  introduction2: '',
  introduction3: '',
};

const validationSchema = Yup.object({
  instagramUrl: Yup.string(),
  facebookUrl: Yup.string(),
  introduction1: Yup.string(),
  introduction2: Yup.string(),
  introduction3: Yup.string(),
});

const MyProfileBasicInfo = () => {
  const nav = useNavigation();

  const bioTextInputRef1 = useRef(null);
  const bioTextInputRef2 = useRef(null);
  const bioTextInputRef3 = useRef(null);

  const userId = useStoreState(selAuth.userId);
  const password = useStoreState(selAuth.password);
  const userInfo = useStoreState(selAuth.info);

  const { nick, instagram, facebook, intro } = userInfo;

  const [isEditingUserInfo, setEditingUserInfo] = useState(false);
  const toggleEditingUserInfo = () => setEditingUserInfo(prv => !prv);

  const onSubmit = async values => {
    const {
      instagramUrl,
      facebookUrl,
      introduction1,
      introduction2,
      introduction3,
    } = values;
    const introduction = '';
    const code = await UserService.PUT_updateUserInfo(
      userId,
      password,
      nick,
      instagramUrl,
      facebookUrl,
      introduction,
    );

    if (code === 1) {
      Alert('Profile successfully updated!');
    } else {
      Alert('Profile fails at updating!');
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

  const {
    instagramUrl,
    facebookUrl,
    introduction1,
    introduction2,
    introduction3,
  } = values;

  useEffect(() => {
    // console.log(userInfo);
    if (!userInfo) {
      return;
    }

    setFieldValue('instagramUrl', userInfo.instagram || '');
    setFieldValue('facebookUrl', userInfo.facebook || '');
    setFieldValue('introduction', userInfo.intro || '');
  }, [userInfo]);

  return (
    <View style={s.root}>
      <Text fontFamily="heavy" style={s.title}>
        INFORMATION
      </Text>

      <Edit2
        style={{ position: 'absolute', right: -10, top: 0 }}
        onPress={toggleEditingUserInfo}
      />

      <View style={s.separator} />

      <View style={s.inputSection}>
        <View style={[s.inputView, { paddingTop: 0 }]}>
          <Text fontFamily="regular" style={s.infoPlaceholder}>
            INSTAGRAM
          </Text>
          {isEditingUserInfo ? (
            <>
              <TextInput
                style={{ ...s.textInput, ...s.textInputFirst }}
                value={instagramUrl}
                onBlur={handleBlur('instagramUrl')}
                onChangeText={handleChange('instagramUrl')}
                placeholder="instagram.com/(ID)"
              />
              <RenderError
                touched={touched.instagramUrl}
                errors={errors.instagramUrl}
              />
            </>
          ) : (
            <Text fontFamily="regular" style={s.infoText}>
              {instagram || 'NONE'}
            </Text>
          )}
        </View>

        <View style={s.inputView}>
          <Text fontFamily="regular" style={s.infoPlaceholder}>
            FACEBOOK
          </Text>
          {isEditingUserInfo ? (
            <>
              <TextInput
                style={{ ...s.textInput, ...s.textInputSecond }}
                value={facebookUrl}
                onBlur={handleBlur('facebookUrl')}
                onChangeText={handleChange('facebookUrl')}
                placeholder="facebook.com/(ID)"
              />
              <RenderError
                touched={touched.facebookUrl}
                errors={errors.facebookUrl}
              />
            </>
          ) : (
            <Text
              fontFamily="regular"
              style={{ ...s.infoText, ...s.infoTextSecond }}
            >
              {facebookUrl || 'NONE'}
            </Text>
          )}
        </View>

        <View style={s.inputView}>
          <Text
            fontFamily="regular"
            style={[s.infoPlaceholder, { alignSelf: 'flex-start' }]}
          >
            BIO
          </Text>
          {isEditingUserInfo ? (
            <>
              <View style={s.introInputs}>
                <TextInput
                  style={{ ...s.textInput, ...s.textInputLast }}
                  ref={bioTextInputRef1}
                  value={introduction1}
                  onBlur={handleBlur('introduction1')}
                  onChangeText={e => {
                    handleChange('introduction1')(e);

                    if (e && e.length === 25) {
                      bioTextInputRef2.current.focus();
                    }
                  }}
                  placeholder="let them know about you"
                />
                {/* <RenderError
                  touched={touched.introduction1}
                  errors={errors.introduction1}
                /> */}

                <TextInput
                  style={{ ...s.textInput, ...s.textInputLast }}
                  ref={bioTextInputRef2}
                  value={introduction2}
                  onBlur={handleBlur('introduction2')}
                  onChangeText={e => {
                    handleChange('introduction2')(e);

                    if (e && e.length === 25) {
                      bioTextInputRef3.current.focus();
                    }
                  }}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace') {
                      if (introduction2.length === 0) {
                        bioTextInputRef1.current.focus();
                      }
                    }
                  }}
                />

                <TextInput
                  style={{ ...s.textInput, ...s.textInputLast }}
                  ref={bioTextInputRef3}
                  value={introduction3}
                  maxLength={25}
                  onBlur={handleBlur('introduction3')}
                  onChangeText={handleChange('introduction3')}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace') {
                      if (introduction3.length === 0) {
                        bioTextInputRef2.current.focus();
                      }
                    }
                  }}
                />
              </View>
            </>
          ) : (
            <Text
              fontFamily="regular"
              style={{ ...s.infoText, ...s.infoTextLast }}
            >
              {intro || 'NONE'}
            </Text>
          )}
        </View>
      </View>

      {isEditingUserInfo && (
        <Button
          style={s.button}
          isBold
          textStyle={s.buttonText}
          onPress={handleSubmit}
        >
          UPDATE
        </Button>
      )}
    </View>
  );
};

export default MyProfileBasicInfo;

const s = StyleSheet.create({
  root: {
    marginTop: hp('4.5%'),
  },
  placer: {
    marginLeft: wp('12.4%'),
  },

  title: {
    // marginTop: 45.6,
    fontSize: 21,
    color: '#fff',
    // textSpacing: -0.7
  },
  separator: {
    maxWidth: '55%',
    minHeight: 1,
    backgroundColor: colors.light.ivory5,
    marginTop: '2%',
    // marginBottom: '10.8%',
  },

  infoPlaceholder: {
    color: colors.light.white,
    fontSize: 15,
  },

  inputSection: {
    marginTop: hp('3.7%'),
    justifyContent: 'center',
  },

  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: hp('4%'),
  },

  textInput: {
    ...Platform.select({
      android: {
        marginTop: -10.6,
      },
      ios: {
        marginTop: -4.8,
      },
    }),
    paddingLeft: 5,
    maxWidth: wp('45%'),
    minWidth: wp('45%'),
    // padding: 0,
    margin: 0,
  },
  textInputFirst: {
    marginLeft: 15,
  },
  textInputSecond: {
    marginLeft: 21,
  },
  textInputLast: {
    // marginLeft: 84,
    maxWidth: wp('52%'),
    minWidth: wp('52%'),
  },

  infoText: {
    color: colors.light.white,
    fontSize: 15,
    marginLeft: 21,
  },
  infoTextSecond: {
    marginLeft: 25,
  },
  infoTextLast: {
    marginLeft: 78,
  },

  introInputs: {
    marginLeft: 50,
  },
  dummyInput: {
    paddingTop: hp('3%'),
    // marginLeft: 18,
    paddingLeft: 5,
    maxWidth: wp('52%'),
    minWidth: wp('52%'),
    padding: 0,
    margin: 0,
  },

  button: {
    position: 'absolute',
    right: -25,

    ...Platform.select({
      ios: {
        top: 150,
      },
      android: {
        top: 165,
      },
    }),
  },
  buttonText: {
    color: colors.light.white,
    fontSize: 13,
  },
});
