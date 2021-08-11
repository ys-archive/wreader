import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Alert } from '#components/alert';
import { TextInput, Text, Button, RenderError } from '#components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserService } from '#services';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { selectUserId } from '#store/selectors';
import { actionsLogout } from '#store/actions';
import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '#navigators/ScreenNames';
import { colors } from '#constants';
import * as SecureStore from 'expo-secure-store';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const initialValues = {
  password: '',
};

const validationSchema = Yup.object({
  password: Yup.string()
    .max(28, "user name can't be over than 28 letters")
    .required('no empty password'),
});

const MyProfilePassword = ({ isEditingPassword }) => {
  const nav = useNavigation();
  const userId = useStoreState(selectUserId);
  const logoutAfterChangingPassword = useStoreActions(actionsLogout);

  const [currentPasswordLength, setCurrentPasswordLength] = useState(0);

  useEffect(() => {
    (async () => {
      setCurrentPasswordLength(
        (await SecureStore.getItemAsync('password')).length,
      );
    })();
  }, []);

  const onSubmit = async values => {
    const { password } = values;
    if (password) {
      const { nick, instagram, facebook, intro } = userInfo;
      const code = await UserService.PUT_updateUserInfo(
        userId,
        password,
        nick,
        instagram,
        facebook,
        intro,
      );

      if (code === 1) {
        Alert('Changing password succeeds, please log in again');
        logoutAfterChangingPassword();
      } else {
        Alert('Changing password fails');
      }
    } else {
      Alert('Changing password fails');
    }

    setFieldValue('password', '');
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

  const { password } = values;

  return (
    <View style={s.root}>
      <Text style={s.infoPlaceholder}>PW</Text>
      <View style={s.inputSection}>
        {isEditingPassword ? (
          <>
            <TextInput
              style={s.textInput}
              value={password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              placeholder="WRITE NEW PASSWORD"
            />
            <RenderError touched={touched.password} errors={errors.password} />
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
          <Text style={s.passwordText}>
            {new Array(currentPasswordLength).fill('*').map(letter => letter)}
          </Text>
        )}
      </View>
    </View>
  );
};

export default MyProfilePassword;

const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
    paddingTop: hp('3%'),
    alignItems: 'center',
    maxHeight: 17 + hp('3%'),
  },
  infoPlaceholder: {
    color: colors.light.white,
    fontSize: 15,
  },
  passwordText: {
    marginLeft: wp('14.3%'),
    color: colors.light.white,
    fontSize: 15,
    position: 'relative',
    top: '1%',
  },
  inputSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 28,
  },
  textInput: {
    marginTop: -5,
    marginLeft: 50,
    paddingLeft: 5,
    maxWidth: '43%',
    minWidth: '43%',
    padding: 0,
    margin: 0,
  },
  button: {
    position: 'absolute',
    right: 80,
    top: -3,
  },
  buttonText: {
    color: colors.light.white,
    fontSize: 13,
  },
});
