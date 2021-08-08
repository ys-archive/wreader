import React from 'react';
import { View, Platform, ScrollView } from 'react-native';
import { RenderError } from '#components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '#navigators/ScreenNames';
import { StyleSheet, Text, TextInput, Button } from '#components';
import SignupPolicyTexts from '../sign-up/components/SignupPolicyTexts';
import { Alert } from '#components/alert';
import { colors } from '#constants';
import { LockFindPassword, Email } from '#components/icon';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const initialValues = {
  email: '',
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email(
      'please, provide it again in email format (e.g. wreader1@gmail.com ...)',
    )
    .required("You can't leave out this field"),
});

const FindPassword = () => {
  const nav = useNavigation();

  const onSubmit = values => {
    Alert('존재하는 메일입니다!');
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
    <KeyboardAwareScrollView contentContainerStyle={s.root}>
      <View style={s.placer}>
        <SignupPolicyTexts
          title="FORGOT PASSWORD"
          subtitle="VERFYING YOUR ACCOUNT"
          subtitleDetail1="A VERIFYING MAIL SENT TO YOUR E-MAIL ACCOUNT."
          subtitleDetail2="PLEASE CHECK THE E-MAIL AND"
          subtitleDetail3="PRESS THE [VERIFYING COMPLETE] BUTTON"
        />

        <View style={s.lockSection}></View>

        <LockFindPassword
          style={{ position: 'absolute', left: '34%', top: '28%' }}
        />

        <View>
          <Email style={{ top: '34%', left: '10%' }} />
          <TextInput
            style={s.emailInput}
            value={email}
            onBlur={handleBlur('email')}
            onChangeText={handleChange('email')}
            placeholder="example@gmail.com..."
          />
          <RenderError touched={touched.email} errors={errors.email} />
        </View>

        <View style={s.resendSection}>
          <View>
            <Text style={s.resendInstructionText}>
              IF YOU DIDN’T GET A VERIFYING MAIL
            </Text>
            <Text style={s.resendInstructionText}>
              PRESS THE [RE-SEND] BOTTON
            </Text>
          </View>
          <Button
            style={s.resendAuthMailButton}
            textStyle={s.resendAuthMailText}
            isBold
            onPress={() => {}}
          >
            RE-SEND
          </Button>
        </View>

        <Button
          style={s.summitButton}
          textStyle={s.summitText}
          isBold
          onPress={handleSubmit}
        >
          VERIFY COMPLETE
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default FindPassword;

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  placer: {
    flex: 1,
    height: '100%',
    marginHorizontal: '5.7%',
  },
  lockSection: {
    // flex: 0.5,
    width: '100%',
    minHeight: 250,
  },
  emailInput: {
    marginLeft: 0,
    paddingLeft: 65,
    maxWidth: wp('83%'),
    minWidth: wp('83%'),
  },
  resendSection: {
    marginTop: 40,
    // flex: 0.4,
    flexDirection: 'row',
  },
  resendInstructionText: {
    color: colors.light.ivory1,
    fontSize: 11,
    marginLeft: 30,
    letterSpacing: -0.7,
  },
  resendAuthMailButton: {
    // marginTop: 48,
    // width: '120%',
    marginLeft: 45,
    paddingHorizontal: '4%',
    // marginHorizontal: 0,
    // flex: 1,
    paddingVertical: '2.5%',
    borderRadius: 10,
    backgroundColor: colors.light.ivory5,
  },
  resendAuthMailText: {
    // color: 'blue',
    color: colors.light.ivory1,
    fontSize: 15
  },
  summitButton: {
    marginTop: '50%',
    // paddingHorizontal: '20%',
    paddingVertical: '4%',
    borderRadius: 11,
    backgroundColor: colors.light.ivory5,
  },
  summitText: {
    color: colors.light.white,
    fontSize: 18,
  },
});
