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

const MyProfileImage = () => {
  const [defaultUri, setDefaultUri] = useState('');
  const [isUploaded, completeUpload] = useState(false);
  const { pickImage, imageUri: uploadedImageUri } = useImagePicker();

  const pickNewProfileImage = async () => {
    // Image Picker 를 통해서 이미지 선택
    await pickImage();
    completeUpload(true);
  };

  useEffect(() => {
    firebase
      .database()
      .ref('profileImage')
      .on('value', snapshot => {
        const val = snapshot.val();
        if (!val) {
          console.log('no data found!');
          return;
        }
        setDefaultUri(val.uri);
      });
  }, []);

  return (
    <View style={s.profileImageView}>
      {/* {image} */}
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
