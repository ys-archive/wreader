import React, { useState, useCallback } from "react"
import { View, Image, Platform } from "react-native"
import { StyleSheet, Button } from "#components"
import { colors } from "../../../../constants/colors"

import { Photo, Cancel } from "#components/icon"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

import { useImagePicker, useProfileImageLoader } from "../../../../hooks"

import { useStoreState, useStoreActions } from "easy-peasy"
import { actImage } from "../../../../store/actions"
import { selAuth, selImage } from "../../../../store/selectors"

import { UserService } from "../../../../services"
import { ImageService } from "../../../../services"

const uploadDirName = "profileImage"

const initStates = () => {
  const userId = useStoreState(selAuth.userId)
  const tempBlob = useStoreState(selImage.tempBlob)

  const setProfileImageUrl = useStoreActions(actImage.setProfile)
  const startUploadingProfile = useStoreActions(actImage.startUploadingProfile)
  const completeUploadProfileImage = useStoreActions(
    actImage.completeUploadingProfile,
  )
  const profileImageUrl = useStoreState(selImage.profile)

  return {
    userId,
    tempBlob,
    setProfileImageUrl,
    startUploadingProfile,
    completeUploadProfileImage,
    profileImageUrl,
  }
}

const MyProfileImage = () => {
  const {
    userId,
    tempBlob,
    setProfileImageUrl,
    startUploadingProfile,
    completeUploadProfileImage,
    profileImageUrl,
  } = initStates()
  const [isEditingProfileImage, setIsEditingProfileImage] = useState(false)

  // 프로필 이미지 로드
  useProfileImageLoader(true)

  const pickImage = useImagePicker(4, 3, false)

  const onSave = useCallback(async () => {
    startUploadingProfile()

    const downloadUrl = await ImageService.uploadImageFile(
      uploadDirName,
      tempBlob,
    )

    // 이미지 원본을 스토리지 저장 후 post 로 유저 정보로 전송
    await UserService.POST_registerUserProfilePhoto(userId, downloadUrl)

    completeUploadProfileImage()
    setIsEditingProfileImage(false)
  }, [tempBlob, userId])

  const pickNewProfileImage = async () => {
    setIsEditingProfileImage(true)
    await pickImage()
  }

  return (
    <View style={s.root}>
      {profileImageUrl ? (
        <Image
          style={{
            width: Platform.OS === "ios" ? wp("30%") : wp("28"),
            height: hp("13.5%"),
            borderRadius: 200,
          }}
          source={{
            uri: profileImageUrl,
          }}
        />
      ) : (
        <View
          style={{
            width: wp("33.3%"),
            height: hp("15%"),
            borderRadius: 200,
            backgroundColor: "#000",
          }}
        />
      )}
      <Photo
        style={{ position: "absolute", bottom: "6.4%", right: "32.3%" }}
        iconStyle={{ width: 23, height: 17 }}
        onPress={pickNewProfileImage}
      />
      {isEditingProfileImage && (
        <>
          <Button
            style={s.button}
            isBold
            textStyle={s.buttonText}
            onPress={onSave}
          >
            UPDATE
          </Button>
          <Cancel
            onPress={() => setIsEditingProfileImage(false)}
            style={s.closeUpdate}
          />
        </>
      )}
    </View>
  )
}

export default MyProfileImage

const s = StyleSheet.create({
  root: {
    // flex: 1,
    marginTop: hp("3.9%"),
    alignItems: "center",
    marginBottom: hp("1.3%"),
  },
  profileImage: {
    maxWidth: 200,
    maxHeight: 200,
    // width: wp('50%'),
    // height: hp('50%'),
    borderRadius: 100,
  },
  cameraIcon: {
    position: "absolute",
    right: wp("1.8%"),
    // top: ,
    // zIndex: -1,
  },

  button: {
    position: "absolute",
    right: 40,

    ...Platform.select({
      ios: {
        top: 115,
      },
      android: {
        right: 30,
        top: 83,
      },
    }),
  },

  closeUpdate: {
    ...Platform.select({
      ios: {
        top: 108,
      },
      android: {
        top: 80,
      },
    }),
    right: "5%",
  },

  buttonText: {
    color: colors.light.white,
    fontSize: 13,
  },
})
