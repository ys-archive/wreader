import React, { useEffect, useState } from "react"
import { View, SafeAreaView, Image, Platform } from "react-native"
import { StyleSheet, Text } from "#components"
import { Cancel, Like, Instagram, Facebook, Person } from "#components/icon"
import { colors } from "#constants"

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

import { useNavigation } from "@react-navigation/native"
import UserService from "../../services/UserService"

const OtherProfile = ({ route }) => {
  const nav = useNavigation()
  const { userId } = route.params

  const [data, setData] = useState(null)

  useEffect(() => {
    ;(async function fetchOtherUserProfile() {
      const { data } = await UserService.GET_getUserInfo(userId)
      if (data) setData(data)
    })()
  }, [userId])

  if (!data || !data.item) return null

  console.log("Other Profile: ", data.item)

  const { nick, instagram, facebook, intro } = data.item

  let path = ""
  if (data.item.img) {
    path = data.item.img.path
  }

  const onPressGoBackIcon = () => nav.goBack()

  const profileImage = path ? (
    <Image
      style={{
        width: wp("55.6%"),
        height: Platform.OS === "ios" ? 230 : 220,
        borderRadius: Platform.OS === "ios" ? 200 : 300,
      }}
      source={{ uri: path }}
    />
  ) : (
    <View
      style={{
        width: wp("55.6%"),
        height: Platform.OS === "ios" ? 230 : 220,
        borderRadius: 200,
        backgroundColor: "#000",
      }}
    />
  )

  return (
    <SafeAreaView style={s.root}>
      <View style={s.placer}>
        {/* 뒤로 가기 아이콘 */}
        <Cancel onPress={onPressGoBackIcon} style={{ zIndex: 50 }} />

        {/* 윗 빈 공간 채우기 */}
        <View style={s.filler} />

        {/* 프로필 이미지 */}
        <View style={s.topSection}>{profileImage}</View>

        {/* 닉네임 */}
        <View style={s.userNamePlacer}>
          <Text fontFamily="regular" style={s.userName}>
            {nick}
          </Text>
        </View>

        <View style={s.socialSection}>
          {/* 좋아요 */}
          <View style={s.social}>
            <Like style={s.socialIcon} />
            <Text fontFamily="regular" style={s.socialText}>
              1500
            </Text>
          </View>

          {/* 인스타그램 링크 */}
          <View style={s.social}>
            <Instagram style={s.socialIcon} />
            <Text fontFamily="regular" style={s.socialText}>
              {instagram || "NONE"}
            </Text>
          </View>

          {/* 페이스북 링크 */}
          <View style={s.social}>
            <Facebook style={s.socialIcon} />
            <Text fontFamily="regular" style={s.socialText}>
              {facebook || "NONE"}
            </Text>
          </View>
        </View>

        {/* 자기 소개 */}
        <View style={s.introductionSection}>
          <Text fontFamily="regular" style={s.introductionText}>
            {intro || "NONE"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default OtherProfile

const s = StyleSheet.create({
  root: {
    flex: 1,
    height: "100%",
    backgroundColor: colors.light.background,
  },
  placer: {
    flex: 1,
    height: "100%",
    marginHorizontal: "5.7%",
    ...Platform.select({
      android: {
        marginTop: "7%",
      },
    }),
  },

  filler: {
    minHeight: hp("18.5%"),
    maxHeight: hp("18.5%"),
  },

  topSection: {
    alignSelf: "center",
    minHeight: hp("30%"),
  },
  userNamePlacer: {
    ...Platform.select({ android: { marginTop: hp("2.5%") } }),
    alignItems: "center",
  },
  userName: {
    color: "white",
    fontSize: 28,
  },

  socialSection: {
    // flexDirection: "row",
    ...Platform.select({ ios: { marginTop: hp("2%") } }),
    marginLeft: "20%",
  },

  socialIcon: {
    width: 19.4,
    height: 19.4,
    position: "relative",
    top: Platform.OS === "ios" ? 18 : 23,
    left: 0,
    tintColor: colors.light.ivory5,
  },

  social: {
    marginTop: "2%",
  },
  socialText: {
    marginLeft: "15%",
    fontSize: 21,
    color: colors.light.white,
  },

  introductionSection: {
    maxWidth: wp("76.1%"),
    alignSelf: "center",
    marginTop: hp("6.4%"),
  },
  introductionText: {
    fontSize: 19,
    color: colors.light.white,
    textAlign: "justify",
  },
})
