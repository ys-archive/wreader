import React from 'react';
import { View, Platform, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, TextInput, Text } from '#components';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AddImage from '../../icon/AddImage';
import { colors, StyleDefine } from '../../../constants';

import { makeCategoryBGImagePath } from '#constants/images';

import { useImagePicker } from '../../../hooks';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { selImage, selSwiper, selAuth } from '../../../store/selectors';
import { actData, actImage, actSwiper } from '../../../store/actions';

import uuid from 'react-native-uuid';
import WriteCardForm from './WriteCardForm';

import { ImageService } from '../../../services';

const uploadDirName = `writeCardImage-${uuid.v4()}`;

const initStates = () => {
  // const coords = useStoreState(selSwiper.coords);
  const setCardImageUrl = useStoreActions(actImage.setCard);
  const completeUploadCardImage = useStoreActions(
    actImage.completeUploadingCard,
  );
  const cardImageUrl = useStoreState(selImage.card);

  return {
    // coords,
    setCardImageUrl,
    completeUploadCardImage,
    cardImageUrl,
  };
};

const WriteChapterCard = ({ route }) => {
  const { categoryTitle, chapterId, categoryId, order, depth } = route.params;
  const { setCardImageUrl, completeUploadCardImage, cardImageUrl } =
    initStates();

  const pickImage = useImagePicker(
    async uri => {
      // 로컬 이미지 uri 저장 콜백
      // setProfileLocalImagePath(await uploadLocalImagePath(uploadDirName, uri));
    },
    async blob => {
      // 이미지 원본 먼저 업로드
      const downloadUrl = await ImageService.uploadImageFile(
        uploadDirName,
        blob,
      );
      setCardImageUrl(downloadUrl);
      completeUploadCardImage();
    },
    9,
    21,
  );

  const onPickCardImage = async () => await pickImage();

  return (
    <KeyboardAwareScrollView>
      <ImageBackground
        style={{
          width: wp('100%'),
          height: hp('100%'),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:
            Platform.OS === 'android' ? 'rgba(255, 255, 255, 0.2)' : '',
        }}
        source={
          !cardImageUrl
            ? makeCategoryBGImagePath(categoryTitle)
            : { uri: cardImageUrl }
        }
      >
        <View
          style={{
            width: wp('83.3%'),
            height: hp('81.2%'),
            borderRadius: StyleDefine.borderRadiusOutside,
            overflow: 'hidden',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            paddingHorizontal: wp('10.4%'),
          }}
        >
          {/* todo: 현재 새 카드의 title 은 사용하지 않음 */}
          {/* <TextInput
            style={s.titleInput}
            placeholder={'Title'}
            placeholderTextColor="rgba(0, 0, 0, 0.2)"
            editable={false}
          /> */}
          <View style={{ marginTop: '20%', marginBottom: hp('4%') }} />

          <Text isBold style={s.chapterText}>
            CHAPTER&nbsp;&nbsp;
            <Text isBold style={s.chapterNumberText}>
              {order + 1}
            </Text>
          </Text>

          <WriteCardForm
            chapterId={chapterId}
            categoryId={categoryId}
            depth={depth}
          >
            <AddImage style={s.imageIcon} onPress={onPickCardImage} />
          </WriteCardForm>
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

  chapterText: {
    fontSize: 17,
    marginBottom: hp('9%'),
  },
  chapterNumberText: {
    fontSize: 28,
  },

  imageIcon: {
    color: colors.light.ivory1,
    position: 'relative',
    right: 1,
    bottom: -7,
    // marginRight: 150,
  },
});
