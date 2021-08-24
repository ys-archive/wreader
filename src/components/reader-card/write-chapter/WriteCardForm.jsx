import React, { useCallback } from 'react';
import { View, Platform } from 'react-native';
import { StyleSheet, TextInput, Button, RenderError } from '#components';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '#constants';

import { useStoreState } from 'easy-peasy';
import {
  selectUserId,
  selectCurrentChapterIdx,
  selectCurrentCategoryIdx,
} from '#store/selectors';

import { useWriteNewCard } from '../../../contexts/chapterDataContext';
import { useWriteChapterCardForm } from './useWriteChapterCardForm';

import { useNavigation } from '@react-navigation/native';

const borderRadiusInside = 17;

const WriteCardForm = ({ children }) => {
  const userId = useStoreState(selectUserId);

  const currentCategoryIdx = useStoreState(selectCurrentCategoryIdx);
  const currentChapterIdx = useStoreState(selectCurrentChapterIdx);
  const [_, setNewCandidateWritten] = useWriteNewCard();

  const nav = useNavigation();

  const afterFormSubmitted = useCallback(() => {
    nav?.goBack();
    setNewCandidateWritten();
  }, []);

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useWriteChapterCardForm(
      userId,
      currentCategoryIdx,
      currentChapterIdx,
      afterFormSubmitted,
    );

  const {
    // title,
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
  } = values;

  return (
    <>
      <View style={s.textInputSection}>
        <TextInput
          style={s.input}
          value={sentence1}
          onBlur={handleBlur('sentence1')}
          onChangeText={handleChange('sentence1')}
          placeholder="Write a story for this chapter..."
          placeholderTextColor="rgba(0, 0, 0, 0.2)"
        />
        <RenderError
          touched={touched.sentence1}
          errors={errors.sentence1}
          color="rgba(0, 0, 0, 0.5)"
        />
        
        <TextInput
          style={s.input}
          value={sentence2}
          onBlur={handleBlur('sentence2')}
          onChangeText={handleChange('sentence2')}
        />
        <TextInput
          style={s.input}
          value={sentence3}
          onBlur={handleBlur('sentence3')}
          onChangeText={handleChange('sentence3')}
        />
        <TextInput
          style={s.input}
          value={sentence4}
          onBlur={handleBlur('sentence4')}
          onChangeText={handleChange('sentence4')}
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
      </View>

      <View style={s.bottomSection}>
        {/* Add Image 아이콘 */}
        {children}

        {/* 작성한 카드 저장 */}
        <Button
          style={s.summitButton}
          textStyle={s.summitInsideText}
          onPress={handleSubmit}
          isBold
        >
          SAVE
        </Button>
      </View>
    </>
  );
};

export default WriteCardForm;

const s = StyleSheet.create({
  textInputSection: {
    minHeight: Platform.OS === 'ios' ? wp('110%') : wp('90%'),
    maxHeight: Platform.OS === 'ios' ? wp('110%') : wp('90%'),
  },
  input: {
    borderBottomWidth: 0.3,
    borderColor: '#000',
    minWidth: '100%',
    maxWidth: '100%',

    margin: 0,
    padding: 0,
    paddingLeft: 0,
    marginBottom: Platform.OS === 'ios' ? wp('4%') : wp('1.8%'),

    fontSize: 21,
    fontWeight: '200',
    color: 'rgba(0, 0, 0, 0.3)',
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
