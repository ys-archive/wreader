import React, { useCallback } from "react"
import { View, Platform, ImageBackground } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { StyleSheet, Text } from "#components"

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

import AddImage from "../../../components/icon/AddImage"
import { colors, StyleDefine } from "../../../constants"

import { makeCategoryBGImagePath } from "#constants/images"

import { useImagePicker } from "../../../hooks"
import { useStoreState } from "easy-peasy"
import { selImage } from "../../../store/selectors"

import WriteCardForm from "./WriteCardForm"

import LoadingModal from "../../../components/modals/LoadingModal"

const initStates = () => {
  // selectors
  const cardImageUrl = useStoreState(selImage.card)
  const isCardStartUploading = useStoreState(selImage.isCardStartUploading)
  return {
    cardImageUrl,
    isCardStartUploading,
  }
}

const WriteChapterCard = ({ route }) => {
  const {
    params: { categoryTitle, chapterId, categoryId, parentId, order, depth },
  } = route
  const { cardImageUrl, isCardStartUploading } = initStates()

  const pickImage = useImagePicker(9, 21)

  const onPickCardImage = async () => {
    await pickImage()
  }

  return (
    <KeyboardAwareScrollView>
      {isCardStartUploading && <LoadingModal />}
      <ImageBackground
        style={{
          width: wp("100%"),
          height: hp("100%"),
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:
            Platform.OS === "android" ? "rgba(255, 255, 255, 0.2)" : "",
        }}
        source={
          !cardImageUrl
            ? makeCategoryBGImagePath(categoryTitle)
            : { uri: cardImageUrl }
        }
      >
        <View
          style={{
            width: wp("83.3%"),
            height: hp("81.2%"),
            borderRadius: StyleDefine.borderRadiusOutside,
            overflow: "hidden",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            paddingHorizontal: wp("10.4%"),
          }}
        >
          {/* todo: 현재 새 카드의 title 은 사용하지 않음 */}
          <Text fontFamily='heavy' style={s.categoryTitle}>
            {categoryTitle}
          </Text>
          <View
            style={{
              marginTop: "3%",
              marginBottom: "7%",
              minHeight: 1.5,
              backgroundColor: "#000",
            }}
          />

          <Text fontFamily='semibold' style={s.chapterText}>
            CHAPTER&nbsp;&nbsp;
            <Text fontFamily='regular' style={s.chapterNumberText}>
              {order}
            </Text>
          </Text>

          <WriteCardForm
            chapterId={chapterId}
            categoryId={categoryId}
            parentId={parentId}
            depth={depth}
          >
            <AddImage style={s.imageIcon} onPress={onPickCardImage} />
          </WriteCardForm>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  )
}

export default WriteChapterCard

const s = StyleSheet.create({
  categoryTitle: {
    marginTop: hp("5%"),
    fontSize: 33,
    // color: colors.light.ivory4,
  },

  titleInput: {
    maxWidth: "50%",
    minWidth: "50%",

    borderBottomWidth: 1,
    borderColor: "#000",

    padding: 0,
    margin: 0,
    marginTop: "15%",
    marginBottom: hp("4%"),
    paddingLeft: 0,

    fontSize: 28,
    fontWeight: "200",
    color: "rgba(0, 0, 0, 0.3)",
  },

  chapterText: {
    fontSize: 17,
    marginBottom: hp("9%"),
  },
  chapterNumberText: {
    fontSize: 28,
  },

  imageIcon: {
    color: colors.light.ivory1,
    position: "relative",
    right: 1,
    bottom: -7,
    // marginRight: 150,
  },
})
