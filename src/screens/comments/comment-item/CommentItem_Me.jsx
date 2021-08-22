import React from 'react';
import { View, ImageBackground } from 'react-native';
import { StyleSheet, Text } from '#components';
import { commentBox } from '#constants/images';
import { colors } from '#constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CommentItem_Me = ({ contents }) => {
  return (
    <View style={s.root}>
      <ImageBackground
        source={commentBox}
        tintColor={colors.light.ivory2}
        style={{
          minWidth: wp('51.9%'),
          maxWidth: wp('51.9%'),
          transform: [{ scaleX: -1 }],

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

export default CommentItem_Me;

const s = StyleSheet.create({
  root: {
    marginBottom: hp('1.6%'),
    alignItems: 'flex-end',
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
    transform: [{ scaleX: -1 }],
  },
  contents: {
    color: colors.light.white,
    fontSize: 17,
  },
});
