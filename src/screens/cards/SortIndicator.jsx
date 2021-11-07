import React from "react"
import { StyleSheet, Text } from "#components"
import { filterBox } from "../../constants/images"
import { View, Image } from "react-native"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { colors } from "../../constants/colors"

import { useStoreState } from "easy-peasy"
import { selSort } from "../../store/selectors"

const initStates = () => {
  const isSortedByLikes = useStoreState(selSort.isSortedByLikes)

  return {
    isSortedByLikes,
  }
}

const SortIndicator = () => {
  const { isSortedByLikes } = initStates()

  console.log(`is sorted by likes? : ${isSortedByLikes}`)
  const popularFontFamily = isSortedByLikes ? "heavy" : "xlight"
  const dateFontFamily = !isSortedByLikes ? "heavy" : "xlight"

  return (
    <>
      <Image
        style={{
          position: "absolute",
          top: hp("8%"),
          right: wp("6%"),
          zIndex: 1000,
        }}
        source={filterBox}
      />
      <View style={s.labelView}>
        <Text fontFamily={popularFontFamily} style={s.label}>
          POPULAR
        </Text>
        <View style={s.separator} />
        <Text fontFamily={dateFontFamily} style={s.label}>
          NEW
        </Text>
      </View>
    </>
  )
}

export default SortIndicator

const s = StyleSheet.create({
  labelView: {
    position: "absolute",
    top: hp("11%"),
    right: wp("12%"),
    zIndex: 1001,
  },
  label: {
    fontSize: 18,
    textAlign: "center",
    color: colors.light.ivory2,
  },
  separator: {
    backgroundColor: colors.light.ivory2,
    minHeight: 1,
    marginVertical: 5,
  },
})

// switch (depth) {
//   case DEPTH_NAME.CHAPTER:
//     PopularTextJSX = (
//       <Text
//         fontFamily={!isChaptersSorted ? "heavy" : "xlight"}
//         style={s.label}
//       >
//         POPULAR
//       </Text>
//     )
//     NewTextJSX = (
//       <Text
//         fontFamily={isChaptersSorted ? "heavy" : "xlight"}
//         style={s.label}
//       >
//         NEW
//       </Text>
//     )
//     break

//   case DEPTH_NAME.USER_CHAPTER:
//     PopularTextJSX = (
//       <Text
//         fontFamily={!isUserChaptersSorted ? "heavy" : "xlight"}
//         style={s.label}
//       >
//         POPULAR
//       </Text>
//     )
//     NewTextJSX = (
//       <Text
//         fontFamily={isUserChaptersSorted ? "heavy" : "xlight"}
//         style={s.label}
//       >
//         NEW
//       </Text>
//     )
//     break

//   case DEPTH_NAME.NEXT:
//     PopularTextJSX = (
//       <Text fontFamily={!isNextSorted ? "heavy" : "xlight"} style={s.label}>
//         POPULAR
//       </Text>
//     )
//     NewTextJSX = (
//       <Text fontFamily={isNextSorted ? "heavy" : "xlight"} style={s.label}>
//         NEW
//       </Text>
//     )
//     break
// }
