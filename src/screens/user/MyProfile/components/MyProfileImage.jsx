import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { StyleSheet } from '#components';
import { Ionicons } from '@expo/vector-icons';
import { useImagePicker } from '#hooks';
import firebase from 'firebase';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as FileSystem from 'expo-file-system';

const uploadLocalImagePath = async uri => {
  const ref = firebase.database().ref().child('profileImage');
  await ref.set(uri);

  console.log('이미지 로컬경로 저장 성공!');
};

const uploadImageFile = async blob => {
  const ref = firebase.storage().ref().child('profileImage');
  await ref.put(blob);

  console.log(
    `이미지 데이터 저장 성공!~~~ 다운로드 링크 (업로드 테스트 용): ${await ref.getDownloadURL()}`,
  );
};

const MyProfileImage = () => {
  const [isUploaded, completeUpload] = useState(false);
  const [defaultUri, setDefaultUri] = useState('');
  const { pickImage, imageUri: uploadedImageUri } = useImagePicker(
    uploadLocalImagePath,
    uploadImageFile,
    16,
    9,
  );

  const pickNewProfileImage = async () => {
    // Image Picker 를 통해서 이미지 선택
    await pickImage();
    completeUpload(true);
  };

  useEffect(() => {
    async function loadProfileImage() {
      const ref = firebase.storage().ref().child('profileImage');
      setDefaultUri(await ref.getDownloadURL());
    }

    async function loadLocalImage() {
      const ref = firebase.database().ref().child('profileImage');
      ref.on('value', async snapshot => {
        const uri = snapshot.val();
        if (!uri) {
          await loadProfileImage();
        }

        const dirInfo = await FileSystem.getInfoAsync(uri);

        if (dirInfo.exists) {
          console.log('로컬 이미지 파일 존재! 이것 사용');
          setDefaultUri(uri);
        } else {
          console.log('로컬 이미지 파일 X -> 이미지 서버 접근');
          await loadProfileImage();
        }
      });
    }

    loadLocalImage();
  }, []);

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
