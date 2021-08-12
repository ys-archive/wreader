import React from 'react';
import { View, Platform, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, TextInput, Button, RenderError, Text } from '#components';
import { AlertWithValue, Alert } from '#components/alert';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '#navigators/ScreenNames';

import AddImage from '../icon/AddImage';
import { colors } from '#constants';

import { useStoreState, useStoreActions } from 'easy-peasy';
import {
  selectUserId,
  selectCurrentChapterIdx,
  selectCurrentCategoryIdx,
} from '#store/selectors';

import { ChapterService } from '../../services';

import { makeCategoryBGImagePath, dummyProfile } from '#constants/images';

import { useSetNewCandidateWritten } from '#contexts/chapterDataContext';

const initialValues = {
  // title: '',
  sentence1: '',
  sentence2: '',
  sentence3: '',
  sentence4: '',
  sentence5: '',
  sentence6: '',
  sentence7: '',
  sentence8: '',
  sentence9: '',
  sentence10: '',
  sentence11: '',
};

const validationSchema = Yup.object({
  // title: Yup.string().required('You have to input a title'),

  sentence1: Yup.string().min(4).max(20).required('Max is 20'),
  sentence2: Yup.string().min(0).max(20),
  sentence3: Yup.string().min(0).max(20),
  sentence4: Yup.string().min(0).max(20),
  sentence5: Yup.string().min(0).max(20),
  sentence6: Yup.string().min(0).max(20),
  sentence7: Yup.string().min(0).max(20),
  sentence8: Yup.string().min(0).max(20),
  sentence9: Yup.string().min(0).max(20),
  sentence10: Yup.string().min(0).max(20),
  sentence11: Yup.string().min(0).max(20),
});

const borderRadiusOutside = 20;
const borderRadiusInside = 17;

const WriteChapterCard = ({ categoryTitle, chapterIdx }) => {
  const userId = useStoreState(selectUserId);

  const currentCategoryIdx = useStoreState(selectCurrentCategoryIdx);
  const currentChapterIdx = useStoreState(selectCurrentChapterIdx);

  const setNewCandidateWritten = useSetNewCandidateWritten();

  const onSubmit = async values => {
    const {
      sentence1,
      sentence2,
      sentence3,
      sentence4,
      sentence5,
      sentence6,
      sentence7,
      sentence8,
      sentence9,
      sentence10,
      sentence11,
    } = values;

    console.log('챕터 저장: ', values);
    // TODO: 현재 챕터 가져와 groupIdx 로 쓰기
    // TODO: 현재 선택한 카테고리
    const status = await ChapterService.POST_createChapter(
      userId,
      currentChapterIdx,
      // sentence1.append(sentence2).append(sentence3).append(sentence4),
      `${sentence1 || ''}${sentence2 || ''}${sentence3 || ''}${
        sentence4 || ''
      }` +
        `${sentence5 || ''}${sentence6 || ''}${sentence7 || ''}${
          sentence8 || ''
        }` +
        `${sentence9 || ''}${sentence10 || ''}${sentence11 || ''}`,
      currentCategoryIdx + 5,
    );

    if (status === 200) {
      AlertWithValue(
        'Chapter written!',
        'Close',
        JSON.stringify(values, null, 2),
      );
    } else {
      Alert('Writing chapter fails');
    }

    // TODO: 처리한 카드 기다렸다가 렌더
    setNewCandidateWritten();
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  const {
    title,
    sentence1,
    sentence2,
    sentence3,
    sentence4,
    sentence5,
    sentence6,
    sentence7,
    sentence8,
    sentence9,
    sentence10,
    sentence11,
  } = values;

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
    <KeyboardAwareScrollView>
      <ImageBackground
        style={{
          width: wp('100%'),
          height: hp('100%'),
          alignItems: 'center',
          justifyContent: 'center',
        }}
        source={makeCategoryBGImagePath(categoryTitle)}
      >
        <View
          style={{
            width: wp('83.3%'),
            height: hp('81.2%'),
            borderRadius: borderRadiusOutside,
            overflow: 'hidden',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            paddingHorizontal: wp('10.4%'),
          }}
        >
          <View>
            <TextInput
              style={s.titleInput}
              // value={title}
              // onBlur={handleBlur('title')}
              // onChangeText={handleChange('title')}
              // placeholder={'Title'}
              placeholderTextColor="rgba(0, 0, 0, 0.2)"
              // mutliline
            />
          </View>

          <Text isBold style={s.chapterText}>
            CHAPTER&nbsp;&nbsp;
            <Text isBold style={s.chapterNumberText}>
              {chapterIdx + 1}
            </Text>
          </Text>

          <View>
            <TextInput
              style={s.input}
              value={sentence1}
              onBlur={handleBlur('sentence1')}
              onChangeText={handleChange('sentence1')}
              placeholder="Write a story for this chapter..."
              placeholderTextColor="rgba(0, 0, 0, 0.2)"
            />
            {/* <RenderError
              touched={touched.sentence1}
              errors={errors.sentence1}
            /> */}
            <TextInput
              style={s.input}
              value={sentence2}
              onBlur={handleBlur('sentence2')}
              onChangeText={handleChange('sentence2')}
              // placeholder="Write a story for this chapter..."
              // placeholderTextColor="rgba(0, 0, 0, 0.2)"
            />
            <TextInput
              style={s.input}
              value={sentence3}
              onBlur={handleBlur('sentence3')}
              onChangeText={handleChange('sentence3')}
              // placeholder="Write a story for this chapter..."
              // placeholderTextColor="rgba(0, 0, 0, 0.2)"
            />
            <TextInput
              style={s.input}
              value={sentence4}
              onBlur={handleBlur('sentence4')}
              onChangeText={handleChange('sentence4')}
              // placeholder="Write a story for this chapter..."
              // placeholderTextColor="rgba(0, 0, 0, 0.2)"
            />
            <TextInput
              style={s.input}
              value={sentence5}
              onBlur={handleBlur('sentence5')}
              onChangeText={handleChange('sentence5')}
            />
            <TextInput
              style={s.input}
              value={sentence6}
              onBlur={handleBlur('sentence6')}
              onChangeText={handleChange('sentence6')}
            />
            <TextInput
              style={s.input}
              value={sentence7}
              onBlur={handleBlur('sentence7')}
              onChangeText={handleChange('sentence7')}
            />
            <TextInput
              style={s.input}
              value={sentence8}
              onBlur={handleBlur('sentence8')}
              onChangeText={handleChange('sentence8')}
            />
            <TextInput
              style={s.input}
              value={sentence9}
              onBlur={handleBlur('sentence9')}
              onChangeText={handleChange('sentence9')}
            />
            <TextInput
              style={s.input}
              value={sentence10}
              onBlur={handleBlur('sentence10')}
              onChangeText={handleChange('sentence10')}
            />
            <TextInput
              style={s.input}
              value={sentence11}
              onBlur={handleBlur('sentence11')}
              onChangeText={handleChange('sentence11')}
            />
          </View>

          <View style={s.bottomSection}>
            <AddImage style={s.imageIcon} onPress={onPressCameraIcon} />
            <Button
              style={s.summitButton}
              textStyle={s.summitInsideText}
              onPress={handleSubmit}
              isBold
            >
              SAVE
            </Button>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

export default WriteChapterCard;

const s = StyleSheet.create({
  titleInput: {
    maxWidth: '50%',
    minWidth: '50%',

    borderBottomWidth: 1,
    borderColor: '#000',

    padding: 0,
    margin: 0,
    marginTop: '15%',
    marginBottom: hp('4%'),
    paddingLeft: 0,

    fontSize: 28,
    fontWeight: '200',
    color: 'rgba(0, 0, 0, 0.3)',
  },
  input: {
    borderBottomWidth: 0.3,
    borderColor: '#000',
    minWidth: '100%',
    maxWidth: '100%',

    margin: 0,
    padding: 0,
    paddingLeft: 0,
    marginBottom: wp('4%'),

    fontSize: 21,
    fontWeight: '200',
    color: 'rgba(0, 0, 0, 0.3)',
  },
  chapterText: {
    fontSize: 17,
    marginBottom: hp('7%'),
  },
  chapterNumberText: {
    fontSize: 28,
  },
  bottomSection: {
    maxWidth: '120%',
    minWidth: '120%',

    // marginTop: hp('50%'),
    flexDirection: 'row',
    // justifyContent: 'center',
    // justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  imageIcon: {
    color: colors.light.ivory1,
    position: 'relative',
    right: 1,
    bottom: -7,
    // marginRight: 150,
  },
  summitButton: {
    backgroundColor: colors.light.ivory5,
    paddingVertical: 11,
    paddingHorizontal: 15,
    position: 'relative',
    right: -135,
    bottom: -10,
    borderRadius: borderRadiusInside - 6,
  },
  summitInsideText: {
    fontSize: 16,
    color: colors.light.ivory1,
  },
});
