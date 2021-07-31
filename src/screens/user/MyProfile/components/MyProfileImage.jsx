import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { StyleSheet } from '#components';
import { Ionicons } from '@expo/vector-icons';
import { useImagePicker } from '#hooks';
import { useStoreActions } from 'easy-peasy';
import {
  actionsSetProfileImageUrl,
  actionsSetProfileLocalImagePath,
} from '#store/actions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useStoreState } from 'easy-peasy';
import { selectUserId } from '#store/selectors';
import { UserService } from '#services';
import {
  uploadLocalImagePath,
  uploadImageFile,
} from './ProfileImageFunctionalities';
import { useProfileImageLoader } from '#hooks';

const uploadDirName = 'profileImage';

const MyProfileImage = () => {
  const userId = useStoreState(selectUserId);

  const [isUploaded, completeUpload] = useState(false);
  const [defaultUri, setDefaultUri] = useState('');
  const setProfileImageUrl = useStoreActions(actionsSetProfileImageUrl);
  const setProfileLocalImagePath = useStoreActions(
    actionsSetProfileLocalImagePath,
  );

  // 프로필 이미지 로드
  useProfileImageLoader(setDefaultUri);

  const { pickImage, imageUri: uploadedImageUri } = useImagePicker(
    // 로컬 이미지 uri 저장 콜백
    async uri => {
      const uri = await uploadLocalImagePath(uploadDirName, uri);
      setProfileLocalImagePath(uri);
    },
    // 이미지 download url 저장 콜백
    async blob => {
      // 이미지 원본 먼저 업로드
      const downloadUrl = await uploadImageFile(uploadDirName, blob);

      // 이미지 원본을 스토리지 저장 후 post 로 유저 정보로 전송
      await UserService.POST_registerUserProfilePhoto(userId, downloadUrl);
      setProfileImageUrl(downloadUrl);
    },
    16,
    9,
  );

  const pickNewProfileImage = async () => {
    // Image Picker 를 통해서 이미지 선택
    await pickImage();
    completeUpload(true);
  };

  return (
    <View style={s.profileImageView}>
      <Image
        style={{ width: wp('80%'), height: hp('35%'), borderRadius: 200 }}
        source={{ uri: !isUploaded ? defaultUri : uploadedImageUri }}
      />
      <Ionicons
        style={s.cameraIcon}
        name="camera"
        size={48}
        color="black"
        onPress={pickNewProfileImage}
      />
    </View>
  );
};

export default MyProfileImage;

const s = StyleSheet.create({
  profileImageView: {
    alignSelf: 'center',
    minHeight: hp('30%'),
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
    right: 0,
    bottom: 0,
    // zIndex: -1,
  },
});
