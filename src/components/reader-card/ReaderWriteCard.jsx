import React from 'react';
import {
  View,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '#navigators/ScreenNames';
import { StyleSheet, TextInput, Button } from '#components';
import { Feather } from 'react-native-vector-icons';

const initialValues = {
  sentence1: '',
  sentence2: '',
};

const validationSchema = Yup.object({
  sentence1: Yup.string()
    .max(20)
    .required('반드시 입력하셔야합니다 (20자 내외)'),

  sentence2: Yup.string()
    .max(20)
    .required('반드시 입력하셔야합니다 (20자 내외)'),
});

const ReaderWriteCard = ({ children }) => {
  const nav = useNavigation();
  const onSubmit = values => {
    Alert.alert('title!', JSON.stringify(values, null, 2), [
      {
        text: 'OK!',
        onPress: () => console.log('alert closed!!'),
        style: 'destructive',
      },
    ]);
    // TODO: alert 회원가입이 완료되었습니다
    // TODO: or alert 회원가입이 실패했습니다.
    // TODO: 실제 가입 처리
    nav?.goBack();
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema,
      // TODO: 실제 가입 처리
      onSubmit,
    });

  const { sentence1, sentence2 } = values;

  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={s.root}
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={s.inputView}>
          <TextInput
            // style={s.input}
            value={sentence1}
            onBlur={handleBlur('sentence1')}
            onChangeText={handleChange('sentence1')}
            placeholder="챕터 내용을 입력해주세요 (20자이내)"
          />
          {/* {touched.sentence1 && errors.sentence1 ? (
              <View>
                <Text>{errors.sentence1}</Text>
              </View>
            ) : null} */}
        </View>
        <View style={s.inputView}>
          <TextInput
            // style={s.input}
            value={sentence2}
            onBlur={handleBlur('sentence2')}
            onChangeText={handleChange('sentence2')}
            placeholder="챕터 내용을 입력해주세요 (20자이내)"
          />
          {/* {touched.sentence2 && errors.sentence2 ? (
              <View>
                <Text>{errors.sentence2}</Text>
              </View>
            ) : null} */}
        </View>
        <Feather name="camera" size={24} color="black" />
        <Button style={s.summitButton} onPress={handleSubmit}>
          저장하기
        </Button>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ReaderWriteCard;

const s = StyleSheet.create({
  root: {
    // width,
    // height,
    // alignItems: 'center',
  },
});
