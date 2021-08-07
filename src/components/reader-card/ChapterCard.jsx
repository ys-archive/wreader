import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { Text, Alert, Button } from '#components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '#constants';

import { TextInput } from '#components';
import { ViewCount, Like, Reply } from '#components/icon';

import { makeCategoryBGImagePath, dummyProfile } from '#constants/images';

import { useStoreState } from 'easy-peasy';
import {
  selectProfileLocalImagePath,
  selectProfileImageUrl,
  selectIsLoggedIn,
  selectUserId,
} from '#store/selectors';
import CommentsModal from '#components/modals/CommentsModal';

import { ChapterService } from '#services';

const borderRadiusOutside = 20;
const borderRadiusInside = 17;

const ChapterCard = ({
  chapterOrder,
  chapterData,
  categoryTitle,
  triggerUpdatingLike,
}) => {
  const [isCommentsOpen, setCommentsOpen] = useState(false);

  const {
    id: chapterId, // 현재 챕터 Id
    categoryId,
    _, // -> like
    content,
    replyCount, // -> reply
    like_count: likeCount, // -> like
    group_index: groupIdx, // candiate 붙이는 용도 (검사값)
    userImg: authorImageUri, // -> author
    userNick: authorNickName, // -> author
    chapterImg: chapterCoverImageUri, // -> cover
    isLike,
  } = chapterData;

  // console.log('현재 챕터의 작가 프로필 이미지 path: ', authorImageUri);

  const isLoggedIn = useStoreState(selectIsLoggedIn);
  const userId = useStoreState(selectUserId);

  const myProfileLocalImagePath = useStoreState(selectProfileLocalImagePath);
  const myProfileImageUrl = useStoreState(selectProfileImageUrl);

  const onPressLike = async () => {
    if (!isLoggedIn) {
      Alert('좋아요는 로그인 후에 가능합니다', '닫기');
      return;
    }

    console.log(userId, chapterId);

    await triggerUpdatingLike();

    // 이미 좋아요 했음
    if (isLike === 1) {
      await ChapterService.DELETE_unlikeChapter(chapterId, userId);
      console.log('좋아요 취소');
    } else {
      await ChapterService.POST_likeChapter(chapterId, userId);
      console.log('좋아요');
    }
  };

  const onPressReply = () => {
    setCommentsOpen(prv => !prv);
    console.log('댓글 열림 : ', isCommentsOpen);
  };

  const onPressPostReply = () => {
    console.log('댓글 쓰기');
  };

  return (
    <View style={s.root}>
      <ImageBackground
        style={{
          minWidth: wp('83.3%'),
          minHeight: hp('81.2%'),
          borderRadius: borderRadiusOutside,
          overflow: 'hidden',
          alignItems: 'center',
        }}
        source={
          chapterCoverImageUri
            ? {
                uri: chapterCoverImageUri,
              }
            : makeCategoryBGImagePath(categoryTitle)
        }
        // resizeMode="contain"
      >
        {/* 프로필 및 작가 이름 */}
        <View style={s.authorSection}>
          <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 100,
            }}
            // source={authorImageUri !== '' ? { uri: authorImageUri } : dummyProfile}
            source={dummyProfile}
          />
          <Text isBold style={s.authorNameText}>
            {authorNickName || 'Jessica Momo'}
          </Text>
        </View>
        <ImageBackground
          style={{
            minWidth: wp('75.6%'),
            minHeight: hp('69.7%'),
            backgroundColor: colors.light.chapterBGInside,
            borderRadius: borderRadiusInside,
          }}
        >
          {/* 챕터 제목 */}
          <View style={s.titleSection}>
            {/* TODO: API 수정 요청 */}
            <Text isBold style={s.title}>
              THE FIRST HEART
            </Text>
          </View>

          <View style={s.separator}></View>

          <View style={s.chapterOrderSection}>
            <Text isBold style={s.chapterOrderPlaceholder}>
              CHAPTER
            </Text>
            <Text isBold style={s.chapterOrderText}>
              {chapterOrder}
            </Text>
          </View>

          {/* 챕터 내용 */}
          <View style={s.contentSection}>
            <Text style={s.contentText}>&nbsp;&nbsp;{content ?? ''}</Text>
          </View>

          {/* 좋아요, 댓글 */}
          <View style={s.bottomSection}>
            <View style={s.bottomInfoPlacer}>
              <View style={s.likeSection}>
                <Like onPress={onPressLike} />
                <Text style={s.likeText}>{likeCount}</Text>
              </View>

              <View style={s.replySection}>
                <Reply onPress={onPressReply} />
                <CommentsModal
                  setCommentsOpen={setCommentsOpen}
                  isCommentsOpen={isCommentsOpen}
                />
                <Text style={s.replyText}>{replyCount}</Text>
              </View>
            </View>

            <View style={s.bottomReplyPlacer}>
              <Image
                style={{
                  width: 24,
                  height: 24,
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
              <Button
                isBold
                textStyle={s.replyPostText}
                onPress={onPressPostReply}
              >
                Post
              </Button>
            </View>
          </View>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
};

export default ChapterCard;

const s = StyleSheet.create({
  root: {
    minWidth: wp('100%'),
    minHeight: hp('100%'),
    backgroundColor: colors.light.primary,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorSection: {
    flexDirection: 'row',
    minWidth: wp('83.3%'),
    paddingLeft: wp('6.7%'),
    minHeight: hp('9.5%'),
    alignItems: 'center',
  },
  authorNameText: {
    marginLeft: wp('2%'),
    fontSize: 15,
    color: colors.light.boldText2,
  },
  titleSection: {
    marginLeft: wp('5.5%'),
    marginTop: hp('4.2%'),
  },
  title: {
    fontSize: 22,
  },
  separator: {
    maxWidth: 100,
    minHeight: 1,
    backgroundColor: '#000',
    marginLeft: wp('5.5%'),
    marginTop: hp('1.3%'),
  },
  chapterOrderSection: {
    flexDirection: 'row',
    paddingLeft: wp('5.5%'),
    paddingTop: hp('2.6%'),
    position: 'absolute',
    // top: '32.6%',
    top: 78.0,
  },
  chapterOrderPlaceholder: {
    fontSize: 15,
  },
  chapterOrderText: {
    fontSize: 26,
    marginLeft: '8%',
    marginTop: '-6%',
  },
  contentSection: {
    marginLeft: wp('5.5%'),
    marginTop: hp('6.1%'),
  },
  contentText: {
    fontSize: 15,
  },
  bottomSection: {
    // flexDirection: 'row',
    position: 'absolute',
    bottom: '0%',
    minWidth: wp('75.6%'),
    borderBottomStartRadius: borderRadiusInside,
    borderBottomEndRadius: borderRadiusInside,
    backgroundColor: colors.light.boldText2,
    // minHeight: hp('12.2%'),
    minHeight: 72.2,
    paddingTop: hp('2.4%'),
    // paddingLeft: wp('5.5%'),
  },
  bottomInfoPlacer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    minWidth: wp('56.8%'),
    // marginTop: hp('2.5%')
  },
  likeSection: {
    flexDirection: 'row',
    // marginLeft: wp('8.8%'),
  },
  likeText: {
    color: colors.light.text2,
    marginLeft: wp('1.8%'),
  },
  replySection: {
    flexDirection: 'row',
    // marginLeft: wp('8.8%'),
  },
  replyText: {
    color: colors.light.text2,
    marginLeft: wp('1.8%'),
  },
  bottomReplyPlacer: {
    flexDirection: 'row',
    paddingTop: hp('1.4%'),
    paddingLeft: wp('9.5%'),
    paddingBottom: hp('1.4%'),
    maxWidth: wp('50%'),
  },
  replyTextInput: {
    padding: 0,
    margin: 0,
    marginLeft: 10,
    borderColor: colors.light.text2,
  },
  replyPostText: {
    position: 'relative',
    right: 45,
    top: 7,
    fontSize: 10,
    color: colors.light.text2,
  },
});
