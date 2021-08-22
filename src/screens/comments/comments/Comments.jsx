import React, { useMemo, useState } from 'react';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { StyleSheet, Text, TextInput, Button } from '#components';
import { Cancel } from '#components/icon';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useNavigation } from '@react-navigation/native';
// import * as ScreenNames from '../../navigators/ScreenNames';
import { colors } from '../../../constants';
import { dummyProfile } from '#constants/images';

import { useStoreState } from 'easy-peasy';
import {
  selectUserId,
  selectProfileLocalImagePath,
  selectProfileImageUrl,
} from '../../../store/selectors';
import { CommentsService } from '../../../services';

import { useCommentsLogic } from './useCommentsLogic';
import CommentItem_Me from '../comment-item/CommentItem_Me';
import CommentItem_Other from '../comment-item/CommentItem_Other';

// import { data } from '../Comments_DummyData';
import { useCommentForm } from './useCommentForm';

const Comments = ({ route }) => {
  const nav = useNavigation();
  const myProfileLocalImagePath = useStoreState(selectProfileLocalImagePath);
  const myProfileImageUrl = useStoreState(selectProfileImageUrl);
  const userId = useStoreState(selectUserId);

  console.log('route (Comments): ', route);
  const { chapterId } = route.params;

  const [newComment, setNewComment] = useState('');
  const [isNewCommentWritten, u1] = useState(false);
  const onWriteNewComment = () => u1(prv => !prv);

  const data = useCommentsLogic(chapterId, isNewCommentWritten);
  console.log(data.item);

  if (!data) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const postNewComment = async () => {
    console.log(chapterId, newComment, userId);
    const status = await CommentsService.POST_createComment(
      chapterId,
      newComment,
      userId,
    );
    if (status === 200) {
      onWriteNewComment();
    }
    console.log(status);
    setNewComment('');
  };

  // const { contents } = values;

  const onCloseComment = () => {
    nav.goBack();
    console.log('댓글 닫기');
  };

  const renderComments = comments => {
    const { id, user_id: otherId, reply, userImg, usreNick } = comments.item;

    if (+otherId === userId) {
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
      <FlatList
        style={s.contentsSection}
        data={data.item}
        renderItem={renderComments}
        keyExtractor={item => item.id}
      />

      {/* 새 댓글 섹션 */}
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
          value={newComment}
          // onBlur={handleBlur('contents')}
          onChangeText={text => setNewComment(text)}
          placeholder="Add a comment ..."
          placeholderTextColor={colors.light.text2}
        />
        <Button isBold textStyle={s.replyPostText} onPress={postNewComment}>
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
  //   // height: hp('100%'),
  // },
  contentsSection: {
    flex: 0,
    marginTop: hp('5.7%'),
    marginHorizontal: '9.7%',
    height: hp('90%'),
  },
  writeCommentSection: {
    flexDirection: 'row',

    // position: 'absolute',
    // bottom: 0,

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
    minWidth: wp('62.8%'),
    maxWidth: wp('62.8%'),
    borderColor: colors.light.ivory1,
  },
  replyPostText: {
    position: 'relative',
    // right: 50,
    top: 20,
    fontSize: 12,
    color: colors.light.ivory1,
    // zIndex: 50,
  },
});
