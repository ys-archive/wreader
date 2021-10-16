import React, { useCallback, useRef } from 'react';
import { View, Platform } from 'react-native';
import {
  StyleSheet,
  TextInput,
  Button,
  RenderError,
} from '../../../components';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '#constants';

import { useStoreState, useStoreActions } from 'easy-peasy';
import { selAuth } from '../../../store/selectors';
import { actData } from '../../../store/actions';

import { useWriteChapterCardForm } from './useWriteChapterCardForm';

import { useNavigation } from '@react-navigation/native';

import { StyleDefine } from '../../../constants';
import { DEPTH_NAME } from '../../../store/reducers/swiper.depth';

const initStates = () => {
  const userId = useStoreState(selAuth.userId);
  const updateHasNew = useStoreActions(actData.updateHasNew);
  const fetchOneChapter = useStoreActions(actData.fetchOneChapter);
  const fetchOneUserChapter = useStoreActions(actData.fetchOneUserChapter);
  const fetchOneNext = useStoreActions(actData.fetchOneNext);

  return {
    userId,
    updateHasNew,
    fetchOneChapter,
    fetchOneUserChapter,
    fetchOneNext,
  };
};

const WriteCardForm = ({ chapterId, categoryId, depth, children }) => {
  const nav = useNavigation();

  const {
    userId,
    updateHasNew,
    fetchOneChapter,
    fetchOneUserChapter,
    fetchOneNext,
  } = initStates();

  const afterFormSubmitted = () => {
    console.log('depth in WriteCard -->', depth);
    switch (depth) {
      case DEPTH_NAME.CHAPTER:
        updateHasNew({ d0: true });
        fetchOneChapter();
        break;

      case DEPTH_NAME.USER_CHAPTER:
        updateHasNew({ d2: true });
        // fetchOneUserChapter();
        break;

      case DEPTH_NAME.NEXT:
        updateHasNew({ d3: true });
        // fetchOneNext();
        break;
    }

    nav.goBack();
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useWriteChapterCardForm(userId, chapterId, categoryId, afterFormSubmitted);

  const { sentence } = values;

  return (
    <>
      <View style={s.textInputSection}>
        <TextInput
          style={s.input}
          maxLength={120}
          autoFocus
          value={sentence}
          onBlur={handleBlur('sentence')}
          multiline
          maxHeight={400}
          onChangeText={handleChange('sentence')}
          // if (e && e.length % 20 === 0) e = `${e}\n`;
          placeholder="Write a story for this chapter..."
          placeholderTextColor={colors.light.ivory4}
        />
        <RenderError
          touched={touched.sentence}
          errors={errors.sentence}
          color={colors.light.ivory3}
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

    // textDecorationLine: 'underline',
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
    borderRadius: StyleDefine.borderRadiusInside - 6,
  },
  summitInsideText: {
    fontSize: 16,
    color: colors.light.ivory1,
  },
});

// const textInputRef1 = useRef(null);
// const textInputRef2 = useRef(null);
// const textInputRef3 = useRef(null);
// const textInputRef4 = useRef(null);
// const textInputRef5 = useRef(null);
// const textInputRef6 = useRef(null);

/* <TextInput
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
        /> */
