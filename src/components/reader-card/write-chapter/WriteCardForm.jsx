import React, { useCallback, useRef } from 'react';
import { View, Platform } from 'react-native';
import { StyleSheet, TextInput, Button, RenderError } from '#components';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '#constants';

import { useStoreState } from 'easy-peasy';

import { selAuth, selSwiper } from '../../../store/selectors';

import { useWriteNewCard } from '../../../contexts/chapterDataContext';
import { useWriteChapterCardForm } from './useWriteChapterCardForm';

import { useNavigation } from '@react-navigation/native';

const borderRadiusInside = 17;

const WriteCardForm = ({ chapterId, categoryId, children }) => {
  const userId = useStoreState(selAuth.userId);
  // const coords = useStoreState(selSwiper.coords);

  const [_, setNewCandidateWritten] = useWriteNewCard();

  const nav = useNavigation();

  const textInputRef1 = useRef(null);
  const textInputRef2 = useRef(null);
  const textInputRef3 = useRef(null);
  const textInputRef4 = useRef(null);
  const textInputRef5 = useRef(null);
  const textInputRef6 = useRef(null);

  const afterFormSubmitted = useCallback(() => {
    nav?.goBack();
    setNewCandidateWritten();
  }, []);

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useWriteChapterCardForm(userId, categoryId, chapterId, afterFormSubmitted);

  const {
    // title,
    sentence1,
    sentence2,
    sentence3,
    sentence4,
    sentence5,
    sentence6,
    // sentence7,
    // sentence8,
    // sentence9,
    // sentence10,
  } = values;

  return (
    <>
      <View style={s.textInputSection}>
        <TextInput
          style={s.input}
          ref={textInputRef1}
          maxLength={20}
          autoFocus
          value={sentence1}
          onBlur={handleBlur('sentence1')}
          onChangeText={e => {
            handleChange('sentence1')(e);

            if (e && e.length === 20) {
              textInputRef2.current.focus();
            }
          }}
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
          ref={textInputRef2}
          maxLength={20}
          value={sentence2}
          onBlur={handleBlur('sentence2')}
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
          maxLength={20}
          value={sentence3}
          onBlur={handleBlur('sentence3')}
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
          maxLength={20}
          value={sentence4}
          onBlur={handleBlur('sentence4')}
          onChangeText={e => {
            handleChange('sentence4')(e);

            if (e && e.length === 20) {
              textInputRef5.current.focus();
            }
          }}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              if (sentence4.length === 0) {
                textInputRef3.current.focus();
              }
            }
          }}
        />
        <TextInput
          style={s.input}
          ref={textInputRef5}
          maxLength={20}
          value={sentence5}
          onBlur={handleBlur('sentence5')}
          onChangeText={e => {
            handleChange('sentence5')(e);

            if (e && e.length === 20) {
              textInputRef6.current.focus();
            }
          }}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              if (sentence5.length === 0) {
                textInputRef4.current.focus();
              }
            }
          }}
        />
        <TextInput
          style={s.input}
          ref={textInputRef6}
          maxLength={20}
          value={sentence6}
          onBlur={handleBlur('sentence6')}
          onChangeText={handleChange('sentence6')}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              if (sentence6.length === 0) {
                textInputRef5.current.focus();
              }
            }
          }}
        />
        {/* <TextInput
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
        /> */}
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
