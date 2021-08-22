import React, { useMemo } from 'react';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  FlatList,
  Image,
} from 'react-native';
import { StyleSheet, Text, TextInput, Button } from '#components';
import { Cancel } from '#components/icon';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useNavigation } from '@react-navigation/native';
// import * as ScreenNames from '../../navigators/ScreenNames';
import { colors } from '../../constants';
import { dummyProfile } from '#constants/images';

import { useStoreState } from 'easy-peasy';
import {
  selectUserId,
  selectProfileLocalImagePath,
  selectProfileImageUrl,
} from '../../store/selectors';

import { useCommentsLogic } from './useCommentsLogic';
import CommentItem_Me from './CommentItem_Me';
import CommentItem_Other from './CommentItem_Other';

import { data } from './Comments_DummyData';

const Comments = ({ route }) => {
  const nav = useNavigation();
  const myProfileLocalImagePath = useStoreState(selectProfileLocalImagePath);
  const myProfileImageUrl = useStoreState(selectProfileImageUrl);
  const userId = useStoreState(selectUserId);
  // const data = useCommentsLogic(route, userId);

  const onCloseComment = () => {
    nav.goBack();
    console.log('댓글 닫기');
  };

  const onPressPostReply = () => {};

  const renderComments = comments => {
    const { id, user_id: otherId, reply, userImg, usreNick } = comments.item;
    if (otherId === userId) {
      return <CommentItem_Me key={id} contents={reply} />;
    } else {
      return (
        <CommentItem_Other
          key={id}
          profileImage={userImg}
          userName={usreNick}
          contents={reply}
        />
      );
    }
  };

  return (
    <SafeAreaView style={s.root}>
      {/* Title */}
      <View style={s.topSection}>
        <Text isBold style={s.title}>
          COMMENTS
        </Text>
      </View>
      {/* 뒤로 가기 */}
      <Cancel
        onPress={onCloseComment}
        style={{ zIndex: 50, top: hp('5.9%'), right: wp('5.7%') }}
        iconStyle={{ width: 12, height: 12 }}
      />

      {/* 댓글들 */}
      <View style={s.contentsPlacer}>
        <FlatList
          style={s.contentsSection}
          data={data}
          renderItem={renderComments}
          keyExtractor={item => item.id}
        />
      </View>

      <View style={s.writeCommentSection}>
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
          }}
          source={
            myProfileLocalImagePath !== ''
              ? { uri: myProfileLocalImagePath }
              : myProfileImageUrl !== ''
              ? { uri: myProfileImageUrl }
              : dummyProfile
          }
        />
        <TextInput
          style={s.replyTextInput}
          placeholder="Add a comment ..."
          placeholderTextColor={colors.light.text2}
        />
        <Button isBold textStyle={s.replyPostText} onPress={onPressPostReply}>
          Post
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Comments;

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  topSection: {
    top: 15,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    marginTop: hp('3.1%'),
    color: colors.light.ivory4,
  },
  contentsPlacer: {
    height: hp('100%'),
  },
  contentsSection: {
    flex: 0,
    marginHorizontal: '9.7%',
    height: hp('100%'),
    marginTop: hp('4.6%'),
  },
  writeCommentSection: {
    flexDirection: 'row',

    position: 'absolute',
    bottom: 0,

    backgroundColor: colors.light.ivory5,

    borderTopStartRadius: 17,
    borderTopEndRadius: 17,

    paddingLeft: wp('9.5%'),
    paddingVertical: 19.5,

    maxWidth: wp('100%'),
    height: hp('9.7%'),
  },
  replyTextInput: {
    padding: 0,
    margin: 0,
    marginLeft: 10,
    paddingLeft: 3,
    minWidth: wp('64.8%'),
    maxWidth: wp('64.8%'),
    borderColor: colors.light.ivory1,
  },
  replyPostText: {
    position: 'relative',
    right: 50,
    top: 20,
    fontSize: 12,
    color: colors.light.ivory1,
  },
});
