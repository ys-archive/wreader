import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Alert } from '#components/alert';
import { TextInput, Text, Button, RenderError } from '#components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserService } from '#services';
import { useStoreState } from 'easy-peasy';
import { selectUserId, selectUserInfo } from '#store/selectors';

import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '#navigators/ScreenNames';
import { colors } from '#constants';
import * as SecureStore from 'expo-secure-store';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const initialValues = {
  username: '',
};

const validationSchema = Yup.object({
  useraname: Yup.string()
    .max(15, "user name can't be over than 18 letters")
    .required('no empty user name'),
});

const MyProfileUserName = ({ isEditingUserName }) => {
  const nav = useNavigation();
  const userId = useStoreState(selectUserId);
  const userInfo = useStoreState(selectUserInfo);

  const { nick, instagram, facebook, intro } = userInfo;

  const onSubmit = async values => {
    const { username } = values;
    if (username) {
      const password = await SecureStore.getItemAsync('password');
      const code = await UserService.PUT_updateUserInfo(
        userId,
        password,
        username,
        instagram,
        facebook,
        intro,
      );

      if (code === 1) {
        Alert('Changing nickname succeeds');
      } else {
        Alert('Changing nickname fails');
      }
    } else {
      Alert('Changing nickname fails');
    }

    setFieldValue('username', '');
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
    onSubmit,
  });

  const { username } = values;

  return (
    <View style={s.root}>
      {isEditingUserName ? (
        <>
          <TextInput
            style={s.textInput}
            value={username}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            placeholder="WRITE NEW USER NAME"
          />
          <RenderError touched={touched.username} errors={errors.username} />
          <Button
            style={s.button}
            isBold
            textStyle={s.buttonText}
            onPress={handleSubmit}
          >
            UPDATE
          </Button>
        </>
      ) : (
        <Text isBold style={s.userName}>
          {nick || 'NONE'}
        </Text>
      )}
    </View>
  );
};

export default MyProfileUserName;

const s = StyleSheet.create({
  root: {
    width: '100%',
    maxHeight: 21,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoPlaceholder: {
    color: colors.light.white,
    fontSize: 17,
  },
  userName: {
    fontSize: 21,
    color: '#fff',
  },

  textInput: {
    marginTop: 1,
    marginLeft: 0,
    paddingLeft: 5,
    maxWidth: '55%',
    minWidth: '55%',
    padding: 0,
    margin: 0,
  },
  button: {
    position: 'relative',
    right: 0,
    top: 0,
  },
  buttonText: {
    color: colors.light.white,
    fontSize: 15,
  },
});
