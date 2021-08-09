import React from 'react';
import { View, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AlertWithValue } from '#components/alert';
import { RenderError } from '#components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '#navigators/ScreenNames';
import { colors } from '#constants';
import { StyleSheet, Text, TextInput, Button } from '#components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const initialValues = {
  title: '',
  contents: '',
};

const validationSchema = Yup.object({
  title: Yup.string(),

  contents: Yup.string(),
});

const ContactUsDetail = () => {
  const nav = useNavigation();
  const onSubmit = async values => {
    AlertWithValue('문의 등록', '닫기', JSON.stringify(values, null, 2));
    // TODO: POST - 새로운 Contact Us 생성
    nav?.goBack();
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  const { title, contents } = values;

  return (
    <KeyboardAwareScrollView contentContainerStyle={s.root}>
      <View style={s.placer}>
        <Text isBold style={s.title}>
          CONTACT US
        </Text>

        <View style={s.separator} />

        <View
          style={[
            s.titleSection,
            { width: wp('84.7%'), minHeight: hp('6.2%') },
          ]}
        >
          <Text isBold style={s.subtitle}>
            TELL US MORE
          </Text>
        </View>

        <View style={s.descriptionView}>
          <Text style={s.descriptionText}>
            If there’s any inquiries about W.REASDER , let us know it. We are
            going to reply you as soon as possible. Thank you.
          </Text>
        </View>

        <Text isBold style={s.underTitle}>
          THEME
        </Text>

        <View style={[s.inputView, { marginBottom: 48 }]}>
          <TextInput
            style={s.input}
            value={title}
            onBlur={handleBlur('title')}
            onChangeText={handleChange('title')}
            placeholder="Write down a theme of your inquery"
          />
          <RenderError touched={touched.title} errors={errors.title} />
        </View>

        <Text isBold style={s.underTitle}>
          CONTENTS
        </Text>

        <View style={s.inputView}>
          <TextInput
            style={s.input}
            value={contents}
            onBlur={handleBlur('contents')}
            onChangeText={handleChange('contents')}
            placeholder="Write down contents of your inquery"
          />
          <TextInput style={s.dummyInput} />
          <TextInput style={s.dummyInput} />
          <TextInput style={s.dummyInput} />
          <TextInput style={s.dummyInput} />
          <RenderError touched={touched.contents} errors={errors.contents} />
        </View>
        <View>
          {/* <Button style={s.summitButton} onPress={handleSubmit}>
            보내기
          </Button> */}
          <Button
            style={s.summitButton}
            textStyle={s.summitText}
            isBold
            onPress={handleSubmit}
          >
            SEND
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ContactUsDetail;

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  placer: {
    marginHorizontal: '8.3%',
  },
  title: {
    marginTop: 45.6,
    fontSize: 21,
    color: '#fff',
  },
  separator: {
    maxWidth: '50%',
    minHeight: 1,
    backgroundColor: colors.light.ivory5,
    marginTop: '2%',
    marginBottom: '10.8%',
  },
  titleSection: {
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderBottomStartRadius: 17,
    borderColor: colors.light.ivory5,
    justifyContent: 'flex-end',
  },
  subtitle: {
    color: colors.light.ivory5,
    marginLeft: '2.8%',
    marginBottom: 10.4,
    fontSize: 17,
  },
  descriptionView: {
    marginTop: 10.1,
    marginLeft: '3.2%',
  },
  descriptionText: {
    fontSize: 10,
    maxWidth: 288,
    maxHeight: 29,
    color: colors.light.ivory5,
  },
  underTitle: {
    marginTop: Platform.OS === 'android' ? 10.7 : 24.7,
    fontSize: 17,
    color: '#fff',
    marginLeft: 5.9,
  },

  instructionText: {},
  // titleView: {
  //   marginTop: '15%',
  // },
  // contentsView: {
  //   marginTop: '15%',
  // },

  input: {
    borderBottomWidth: 1,
    borderColor: colors.light.ivory2,
    marginHorizontal: 0,
    paddingLeft: 10,
    paddingBottom: 0,
    // ...Platform.select({
    //   android: {
    //     marginBottom: 0,
    //   },
    // }),
    minWidth: '96.7%',
    maxWidth: '96.7%',
    fontSize: Platform.OS === 'android' ? 13 : 12,
  },
  dummyInput: {
    // margin: 0,
    borderBottomWidth: 1,
    borderColor: colors.light.ivory2,
    marginHorizontal: 0,
    minWidth: '96.7%',
    maxWidth: '96.7%',
    padding: 0,
  },

  summitButton: {
    maxWidth: 305,
    minHeight: 33.8,
    paddingVertical: 13,
    marginTop: Platform.OS === 'android' ? 30 : 37.7,
    borderRadius: 13,
    backgroundColor: colors.light.ivory5,
  },
  summitText: {
    color: colors.light.ivory1,
    fontSize: 17,
  },
});
