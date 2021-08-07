import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AlertWithValue } from '#components/alert';
import { RenderError } from '#components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '#navigators/ScreenNames';
import { StyleSheet, Text, TextInput, Button } from '#components';

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
      <View style={s.instructionText}>
        <Text>Wreader와 관련된 문의사항을 입력하여</Text>
        <Text>보내주시면 운영팀에서 확인 후 신속하게</Text>
        <Text>답변드리도록 하겠습니다.</Text>
      </View>
      <View style={s.titleView}>
        <Text isBold>※ 문의제목</Text>
        <TextInput
          style={s.input}
          value={title}
          onBlur={handleBlur('title')}
          onChangeText={handleChange('title')}
          placeholder="문의제목을 입력해주세요"
        />
        <RenderError touched={touched.title} errors={errors.title} />
      </View>
      <View style={s.contentsView}>
        <Text isBold>※ 문의내용</Text>
        <TextInput
          style={{ ...s.input, ...s.inputContent }}
          multiline
          // numberOfLines={5}
          value={contents}
          onBlur={handleBlur('contents')}
          onChangeText={handleChange('contents')}
          placeholder="문의내용을 입력해주세요"
        />
        <RenderError touched={touched.Contents} errors={errors.Contents} />
      </View>
      <View>
        <Button style={s.summitButton} onPress={handleSubmit}>
          보내기
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ContactUsDetail;

const s = StyleSheet.create({
  root: {
    flex: 1,

    padding: 20,
  },
  instructionText: {},
  titleView: {
    marginTop: '15%',
  },
  contentsView: {
    marginTop: '15%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
  },
  inputContent: {
    height: 250,
  },
  summitButton: {
    marginTop: '5%',
    paddingHorizontal: '25%',
    paddingVertical: '4%',
    borderWidth: 1,
    borderRadius: 15,
  },
});
