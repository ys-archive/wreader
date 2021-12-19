import React, { useRef } from "react";
import { View, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AlertWithValue } from "#components/alert";
import { RenderError } from "#components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

import { colors } from "#constants";
import { StyleSheet, Text, TextInput, Button } from "#components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const initialValues = {
  title: "",
  sentence: "",
};

const validationSchema = Yup.object({
  title: Yup.string(),

  sentence: Yup.string().min(0).max(20),
});

const ContactUsDetail = () => {
  const nav = useNavigation();

  // const textInputRef1 = useRef(null);
  // const textInputRef2 = useRef(null);
  // const textInputRef3 = useRef(null);
  // const textInputRef4 = useRef(null);

  const onSubmit = async values => {
    AlertWithValue("문의 등록", "닫기", JSON.stringify(values, null, 2));
    // TODO: POST - 새로운 Contact Us 생성
    nav?.goBack();
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  const { title, sentence } = values;

  return (
    <KeyboardAwareScrollView>
      <View style={s.root}>
        <View style={s.placer}>
          <Text fontFamily="regular" style={s.title}>
            CONTACT US
          </Text>
          <View style={s.separator} />
          <View
            style={[
              s.titleSection,
              { width: wp("84.7%"), minHeight: hp("6.2%") },
            ]}
          >
            <Text fontFamily="regular" style={s.subtitle}>
              TELL US MORE
            </Text>
          </View>
          <View style={s.descriptionView}>
            <Text style={s.descriptionText}>
              If there’s any inquiries about W.REASDER , let us know it. We are
              going to reply you as soon as possible. Thank you.
            </Text>
          </View>
          <Text fontFamily="regular" style={s.underTitle}>
            THEME
          </Text>
          <View style={[s.inputView, { marginBottom: 48 }]}>
            <TextInput
              style={s.input}
              value={title}
              onBlur={handleBlur("title")}
              onChangeText={handleChange("title")}
              placeholder='Write down a theme of your inquery'
            />
            <RenderError touched={touched.title} errors={errors.title} />
          </View>
          <Text fontFamily="regular" style={s.underTitle}>
            CONTENTS
          </Text>
          <View style={s.inputView}>
            <TextInput
              style={s.input}
              value={sentence}
              multiline
              maxLength={300}
              // minHeight={300}
              maxHeight={300}
              numberOfLines={12}
              onBlur={handleBlur("sentence")}
              onChangeText={handleChange("sentence")}
              placeholder='Write down sentence of your inquery'
            />
          </View>
          <View>
            <Button
              style={s.summitButton}
              textStyle={s.summitText}
              fontFamily="regular"
              onPress={handleSubmit}
            >
              SEND
            </Button>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ContactUsDetail;

const s = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: hp("100%"),
    backgroundColor: colors.light.background,
  },
  placer: {
    marginHorizontal: "8.3%",
  },
  title: {
    marginTop: 45.6,
    fontSize: 21,
    color: "#fff",
  },
  separator: {
    maxWidth: "50%",
    minHeight: 1,
    backgroundColor: colors.light.ivory5,
    marginTop: "2%",
    marginBottom: "10.8%",
  },
  titleSection: {
    borderLeftWidth: 0.5,
    borderBottomWidth: 0.5,
    borderBottomStartRadius: 17,
    borderColor: colors.light.ivory5,
    justifyContent: "flex-end",
  },
  subtitle: {
    color: colors.light.ivory5,
    marginLeft: "2.8%",
    marginBottom: 10.4,
    fontSize: 17,
  },
  descriptionView: {
    marginTop: 10.1,
    marginLeft: "3.2%",
  },
  descriptionText: {
    fontSize: 10,
    maxWidth: 288,
    maxHeight: 29,
    color: colors.light.ivory5,
  },
  underTitle: {
    marginTop: Platform.OS === "android" ? 10.7 : 24.7,
    fontSize: 17,
    color: "#fff",
    marginLeft: 5.9,
  },

  instructionText: {},
  // titleView: {
  //   marginTop: '15%',
  // },
  // sentenceView: {
  //   marginTop: '15%',
  // },

  input: {
    borderBottomWidth: 1,
    borderColor: colors.light.ivory2,

    marginHorizontal: 0,
    marginVertical: 10,

    paddingLeft: 10,
    paddingBottom: 4,

    minWidth: "101%",
    maxWidth: "101%",
    fontSize: Platform.OS === "android" ? 13 : 12,

    // textDecorationLine: 'underline',
  },
  // dummyInput: {
  //   // margin: 0,
  //   borderBottomWidth: 1,
  //   borderColor: colors.light.ivory2,
  //   marginHorizontal: 0,
  //   minWidth: '101%',
  //   maxWidth: '101%',
  //   padding: 0,
  // },

  summitButton: {
    maxWidth: 305,
    minHeight: 33.8,
    paddingVertical: 13,
    marginTop: Platform.OS === "android" ? 30 : 37.7,
    borderRadius: 13,
    backgroundColor: colors.light.ivory5,
  },
  summitText: {
    color: colors.light.ivory1,
    fontSize: 17,
  },
});

/* <TextInput
              style={s.input}
              // ref={textInputRef1}
              // value={sentence}
              // maxLength={20}
              // onBlur={handleBlur('sentence')}
              onChangeText={e => {
                handleChange('sentence')(e);
                if (e && e.length === 20) {
                  textInputRef2.current.focus();
                }
              }}
              placeholder="Write down sentence of your inquery"
            />
            <RenderError touched={touched.sentence} errors={errors.sentence} />
            <TextInput
              style={s.input}
              ref={textInputRef2}
              value={sentence2}
              maxLength={20}
              onBlur={handleBlur('sentence2')}
              onChangeText={handleChange('sentence2')}
              onChangeText={e => {
                handleChange('sentence2')(e);
                if (e && e.length === 20) {
                  textInputRef3.current.focus();
                }
              }}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  if (sentence2.length === 0) {
                    textInputRef1.current.focus();
                  }
                }
              }}
            />
            <TextInput
              style={s.input}
              ref={textInputRef3}
              value={sentence3}
              maxLength={20}
              onBlur={handleBlur('sentence3')}
              onChangeText={handleChange('sentence3')}
              onChangeText={e => {
                handleChange('sentence3')(e);
                if (e && e.length === 20) {
                  textInputRef4.current.focus();
                }
              }}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  if (sentence3.length === 0) {
                    textInputRef2.current.focus();
                  }
                }
              }}
            />
            <TextInput
              style={s.input}
              ref={textInputRef4}
              value={sentence4}
              maxLength={20}
              onBlur={handleBlur('sentence4')}
              onChangeText={handleChange('sentence4')}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  if (sentence4.length === 0) {
                    textInputRef3.current.focus();
                  }
                }
              }}
            /> */
