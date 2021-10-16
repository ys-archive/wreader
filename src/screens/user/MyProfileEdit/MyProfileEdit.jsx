import React from "react"
import { View } from "react-native"
// import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { StyleSheet } from "#components"
import { colors } from "#constants"

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

import MyProfileBasicInfo from "./components/MyProfileBasicInfo"
import MyProfileImage from "./components/MyProfileImage"
import MyProfileAccountInfo from "./components/MyProfileAccountInfo"

import LoadingModal from "../../../components/modals/LoadingModal"

import { useStoreState } from "easy-peasy"
import { selImage } from "../../../store/selectors"

const MyProfileEdit = () => {
  const isProfileStartUploading = useStoreState(
    selImage.isProfileStartUploading,
  )
  return (
    <KeyboardAwareScrollView contentContainerStyle={s.root}>
      {isProfileStartUploading && <LoadingModal />}
      <View style={s.placer}>
        <MyProfileImage />
        <MyProfileAccountInfo />
        <MyProfileBasicInfo />
      </View>
    </KeyboardAwareScrollView>
  )
}

export default MyProfileEdit

const s = StyleSheet.create({
  root: {
    width: wp("100%"),
    minHeight: hp("100%"),
    maxHeight: hp("100%"),
    backgroundColor: colors.light.background,
  },
  placer: {
    width: wp("100%"),
    minHeight: hp("100%"),
    maxHeight: hp("100%"),

    marginHorizontal: "7.5%",
    ...Platform.select({
      android: {
        marginTop: "7%",
      },
    }),
  },
})
