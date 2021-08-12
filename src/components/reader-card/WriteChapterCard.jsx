import React from 'react';
import { View, Platform, ImageBackground, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, TextInput, Button } from '#components';
import { AlertWithValue, Alert } from '#components/alert';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '#navigators/ScreenNames';

import { Feather } from 'react-native-vector-icons';
import { colors } from '#constants';

import { useStoreState, useStoreActions } from 'easy-peasy';
import {
  selectUserId,
  selectCurrentChapterIdx,
  selectCurrentCategoryIdx,
} from '#store/selectors';

import ChapterService from '#services';

import { makeCategoryBGImagePath, dummyProfile } from '#constants/images';

import { useSetNewCandidateWritten } from '#contexts/chapterDataContext';

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

const borderRadiusOutside = 20;
const borderRadiusInside = 17;

const WriteChapterCard = ({ categoryTitle }) => {
  const nav = useNavigation();
  const userId = useStoreState(selectUserId);

  const currentCategoryIdx = useStoreState(selectCurrentCategoryIdx);
  const currentChapterIdx = useStoreState(selectCurrentChapterIdx);

  const setNewCandidateWritten = useSetNewCandidateWritten();

  const onSubmit = async values => {
    const { sentence1, sentence2 } = values;

    // TODO: POST_createChapter
    // TODO: 현재 챕터 가져와 groupIdx 로 쓰기
    // TODO: 현재 선택한 카테고리
    const status = await ChapterService.POST_createChapter(
      userId,
      currentChapterIdx,
      sentence1.append(sentence2),
      currentCategoryIdx,
    );

    if (status === 200) {
      AlertWithValue('유저가 쓴 챕터', '닫기', JSON.stringify(values, null, 2));
    } else {
      Alert('새로운 챕터 저장 실패');
    }

    // TODO: 처리한 카드 기다렸다가 렌더
    setNewCandidateWritten();
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema,
      // TODO: 실제 가입 처리
      onSubmit,
    });

  const { sentence1, sentence2 } = values;

  const onPressCameraIcon = () => {
    console.log('camera icon pressed!');
  };

  // TODO: 1. Image Picker 를 통해서 이미지 선택
  // TODO: 2. 선택한 이미지 업로드
  // TODO: 2-success. alert(성공), 선택한 이미지로 바로 프로필 이미지 변경
  // TODO: 2-fail. alert(실패), 상태 초기화

  // TODO: -> 를 hook 으로 빼기

  // TODO: 새로운 컨텐츠 25자 2세트 + 이미지 (선택) 로 새로운 챕터 등록
  // TODO: POST - Create New Chapter

  return (
    <KeyboardAwareScrollView contentContainerStyle={s.root}>
      <ImageBackground
        style={{
          minWidth: wp('83.3%'),
          minHeight: hp('81.2%'),
          borderRadius: borderRadiusOutside,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        source={makeCategoryBGImagePath(categoryTitle)}
        // resizeMode="contain"
      >
        <View style={s.inputView}>
          <TextInput
            style={s.input}
            value={sentence1}
            onBlur={handleBlur('sentence1')}
            onChangeText={handleChange('sentence1')}
            placeholder="챕터 내용을 입력해주세요 (20자이내)"
          />
          {touched.sentence1 && errors.sentence1 ? (
            <View>
              <Text>{errors.sentence1}</Text>
            </View>
          ) : null}
        </View>
        <View style={s.inputView}>
          <TextInput
            style={s.input}
            value={sentence2}
            onBlur={handleBlur('sentence2')}
            onChangeText={handleChange('sentence2')}
            placeholder="챕터 내용을 입력해주세요 (20자이내)"
          />
          {touched.sentence2 && errors.sentence2 ? (
            <View>
              <Text>{errors.sentence2}</Text>
            </View>
          ) : null}
        </View>
        <View style={s.bottomSection}>
          <Feather
            name="camera"
            size={35}
            style={s.imageIcon}
            onPress={onPressCameraIcon}
          />
          <Button
            style={s.summitButton}
            textStyle={s.summitInsideText}
            onPress={handleSubmit}
            isBold
          >
            저장하기
          </Button>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

export default WriteChapterCard;

const s = StyleSheet.create({
  root: {
    minWidth: wp('100%'),
    minHeight: hp('100%'),
    backgroundColor: colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: borderRadiusInside,
    backgroundColor: '#fff',
    minWidth: wp('76%'),
    minHeight: hp('15%'),
  },
  bottomSection: {
    minWidth: wp('83%'),
    marginTop: hp('25%'),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  imageIcon: {
    color: colors.light.ivory1,
    marginRight: 150,
  },
  summitButton: {
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 3,

    justifyContent: 'center',

    borderRadius: borderRadiusInside,
  },
  summitInsideText: {
    fontSize: 16,
    color: colors.light.ivory1,
  },
});
