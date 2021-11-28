import React from "react"
import { View, ImageBackground, Platform } from "react-native"
import { StyleSheet, Text } from "#components"
// import AddStory from '../../icon/AddStory';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { colors } from "#constants"
import { StyleDefine } from "../../../constants"

import { makeCategoryBGImagePath } from "#constants/images"

const CategoryCard = ({ data }) => {
  const { title, subTitle, imageUri } = data

  return (
    <View style={s.root}>
      <ImageBackground
        style={{
          width: wp("83.4%"),
          height: hp("78.2%"),
          borderRadius: StyleDefine.borderRadiusOutside,
          overflow: "hidden",
        }}
        source={makeCategoryBGImagePath(title)}
        // source={{ uri: bgImgUri }}
        resizeMode='cover'
      >
        <View style={s.cardTitleView}>
          <Text fontFamily='heavy' style={s.title}>
            {title}
          </Text>
        </View>

        <View style={s.cardSubTitleView}>
          <Text style={s.subTitle}>{subTitle}</Text>
        </View>
      </ImageBackground>
    </View>
  )
}

export default CategoryCard

const s = StyleSheet.create({
  root: {
    minWidth: wp("100%"),
    minHeight: hp("100%"),
    maxWidth: wp("100%"),
    maxHeight: hp("100%"),
    backgroundColor: colors.light.primaryTransparent,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitleView: {
    position: "absolute",
    top: "70%",
    backgroundColor: "#fff",
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    minWidth: 207.7,
    minHeight: 41,
    justifyContent: "center",
  },
  title: {
    position: "relative",
    left: "10.6%",
    color: colors.light.ivory4,
    fontSize: 25,
  },
  cardSubTitleView: {
    position: "absolute",
    top: "80%",
  },
  subTitle: {
    position: "relative",
    left: "10.6%",
    color: "#fff",
    fontSize: Platform.OS === "IOS" ? 25 : 22,
  },
})
