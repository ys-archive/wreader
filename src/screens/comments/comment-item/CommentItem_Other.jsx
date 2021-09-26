import React from 'react';
import { View, Image, ImageBackground } from 'react-native';
import { StyleSheet, Text } from '#components';
import { commentBox } from '#constants/images';
import { colors } from '#constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CommentItem_Other = ({ profileImage, userName, contents }) => {
  // console.log(profileImage, userName, contents);
  return (
    <View style={s.root}>
      <View style={s.profile}>
        {profileImage !== '' ? (
          <Image
            source={{ uri: profileImage }}
            style={{ width: 30, height: 30, borderRadius: 50 }}
          />
        ) : (
          <View
            style={{
              backgroundColor: '#000',
              width: 30,
              height: 30,
              borderRadius: 50,
            }}
          />
        )}
        <Text isBold style={s.userName}>
          {userName}
        </Text>
      </View>

      <ImageBackground
        source={commentBox}
        style={{
          minWidth: wp('51.9%'),
          maxWidth: wp('51.9%'),
          // minHeight: hp('7.9%'),
          // borderColor: '#000',
          // borderWidth: 1,
          justifyContent: 'center',
          paddingVertical: 14.5,
          paddingHorizontal: 15.7,
        }}
        resizeMode="stretch"
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
    marginBottom: hp('1.6%'),
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('0.6%'),
  },
  userName: {
    color: colors.light.white,
    fontSize: 17,
    marginLeft: hp('1.6%'),
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
