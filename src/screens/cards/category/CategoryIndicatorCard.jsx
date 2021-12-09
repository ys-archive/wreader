import React from "react"
import { View, ImageBackground } from "react-native"
import { StyleSheet } from "#components"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

import { StyleDefine } from "../../../constants"

import { makeCategoryBGImagePath } from "#constants/images"

import { useStoreState } from "easy-peasy"
import { selData } from "../../../store/selectors"

const CategoryIndicatorCard = ({ pos, order }) => {
  const categories = useStoreState(selData.categories)

  const category = categories[order]
  if (!category) {
    return null
  }
  const categoryTitle = category.title

  return (
    <View style={[s.root, pos]}>
      <ImageBackground
        style={[
          {
            width: wp("83.4%"),
            height: hp("78.2%") * 0.9,
            borderRadius: StyleDefine.borderRadiusOutside,
            overflow: "hidden",
          },
        ]}
        source={makeCategoryBGImagePath(categoryTitle)}
      />
    </View>
  )
}

export default CategoryIndicatorCard

const s = StyleSheet.create({
  root: {
    minWidth: wp("100%"),
    minHeight: hp("100%"),
    maxWidth: wp("100%"),
    maxHeight: hp("100%"),
    justifyContent: "center",
    alignItems: "center",
  },
})
