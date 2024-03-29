import React from "react";
import {
  View,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { StyleSheet, Text } from "#components";
import { commentBox } from "#constants/images";
import { colors } from "#constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useChapterCard_OtherProfile } from "../../cards/chapter-card/chapter-card.module/useChapterCard_OtherProfile";

const CommentItem_Other = ({ userId, profileImage, userName, contents }) => {
  const onPressOtherProfile = useChapterCard_OtherProfile(userId);
  return (
    <View style={s.root}>
      <TouchableWithoutFeedback onPress={onPressOtherProfile}>
        <View style={s.profile}>
          {profileImage && profileImage !== "" ? (
            <Image
              source={{ uri: profileImage }}
              style={{ width: 30, height: 30, borderRadius: 50 }}
            />
          ) : (
            <View
              style={{
                backgroundColor: "#000",
                width: 30,
                height: 30,
                borderRadius: 50,
              }}
            />
          )}
          <Text fontFamily='bold' style={s.userName}>
            {userName}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <ImageBackground
        source={commentBox}
        style={{
          minWidth: wp("51.9%"),
          maxWidth: wp("51.9%"),
          // minHeight: hp('7.9%'),
          // borderColor: '#000',
          // borderWidth: 1,
          justifyContent: "center",
          paddingVertical: 14.5,
          paddingHorizontal: 15.7,
        }}
        resizeMode='stretch'
      >
        <View style={s.contentsPlacer}>
          <Text style={s.contents}>{contents}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CommentItem_Other;

const s = StyleSheet.create({
  root: {
    marginBottom: hp("1.6%"),
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("0.6%"),
  },
  userName: {
    color: colors.light.white,
    fontSize: 17,
    marginLeft: hp("1.6%"),
  },
  contentsPlacer: {
    // paddingVertical: 14.5,
    // paddingHorizontal: 15.7,
    // borderColor: '#000',
    // borderWidth: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  contents: {
    color: colors.light.white,
    fontSize: 17,
  },
});
