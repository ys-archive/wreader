import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { StyleSheet } from '#components';
// import { Ionicons } from '@expo/vector-icons';

import { Photo } from '#components/icon';
import { colors } from '#constants';

import { useImagePicker, useProfileImageLoader } from '../../../../hooks';

import { useStoreState, useStoreActions } from 'easy-peasy';
import {
  actionsCompleteUploadProfileImage,
  actionsSetProfileImageUrl,
  // actionsSetProfileLocalImagePath,
} from '../../../../store/actions';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { selectUserId } from '#store/selectors';
import { UserService } from '../../../../services';
import { ImageService } from '../../../../services';
import { selectProfileImageUrl } from '../../../../store/selectors';

const uploadDirName = 'profileImage';

const MyProfileImage = () => {
  const userId = useStoreState(selectUserId);

  const setProfileImageUrl = useStoreActions(actionsSetProfileImageUrl);
  const completeUploadProfileImage = useStoreActions(
    actionsCompleteUploadProfileImage,
  );
  const uri = useStoreState(selectProfileImageUrl);
  // const setProfileLocalImagePath = useStoreActions(
  //   actionsSetProfileLocalImagePath,
  // );

  // 프로필 이미지 로드
  useProfileImageLoader();

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

      // 이미지 원본을 스토리지 저장 후 post 로 유저 정보로 전송
      await UserService.POST_registerUserProfilePhoto(userId, downloadUrl);
      setProfileImageUrl(downloadUrl);
      completeUploadProfileImage();
    },
  );

  const pickNewProfileImage = async () => await pickImage();

  return (
    <View style={s.root}>
      {uri ? (
        <Image
          // style={{ width: wp('55%'), height: hp('25%'), borderRadius: 200 }}
          style={{ width: wp('30%'), height: hp('15%'), borderRadius: 200 }}
          source={{
            uri,
          }}
        />
      ) : (
        <View
          style={{
            width: wp('33.3%'),
            height: hp('15%'),
            borderRadius: 200,
            backgroundColor: '#000',
          }}
        />
      )}
      <Photo
        style={{ position: 'absolute', bottom: '6.4%', right: '32.3%' }}
        iconStyle={{ width: 23, height: 17 }}
        onPress={pickNewProfileImage}
      />
    </View>
  );
};

export default MyProfileImage;

const s = StyleSheet.create({
  root: {
    // flex: 1,
    marginTop: hp('3.9%'),
    alignItems: 'center',
    marginBottom: hp('1.3%'),
  },
  profileImage: {
    maxWidth: 200,
    maxHeight: 200,
    // width: wp('50%'),
    // height: hp('50%'),
    borderRadius: 100,
  },
  cameraIcon: {
    position: 'absolute',
    right: wp('1.8%'),
    // top: ,
    // zIndex: -1,
  },
});
