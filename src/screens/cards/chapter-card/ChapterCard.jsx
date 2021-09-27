import React from 'react';

import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { Text, TextInput } from '#components';
import { Like, Reply, NotLike } from '#components/icon';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { colors, StyleDefine } from '#constants';

import { makeCategoryBGImagePath, dummyProfile } from '#constants/images';

import { useStoreState } from 'easy-peasy';
import { selImage, selSwiper } from '#store/selectors';

import { useChapterCardLike } from './chapter-card.module/useChapterCardLike';
import { useChapterCardComments } from './chapter-card.module/useChapterCardComments';
import { useChapterCard_AddStory } from './chapter-card.module/useChapterCard_AddStory';
import { useChapterCard_Labels } from './chapter-card.module/useChapterCard_Labels';
import { useChapterCard_OtherProfile } from './chapter-card.module/useChapterCard_OtherProfile';

const initStates = () => {
  const profile = useStoreState(selImage.profile);
  const depth = useStoreState(selSwiper.depth);

  return {
    profile,
    depth,
  };
};

const ChapterCard = ({ data, categoryTitle, order = 0 }) => {
  const { profile, depth } = initStates();

  const {
    id: chapterId, // 현재 챕터 Id
    categoryId,
    userId: otherUserId,
    content,
    replyCount, // -> reply
    like_count: likeCount, // -> like
    // group_index: groupIdx, // candiate 붙이는 용도 (검사값)
    chapterImg, // -> cover image url
    userImg, // author profile image url
    userNick: authorNickName, // -> author
    isLike,
  } = data;

  // console.log('\n');
  // console.log(
  //   '----------------------------------------------------------------------',
  // );
  // // console.log('userId: ', userId);
  // console.log(data);
  // console.log(
  //   '----------------------------------------------------------------------',
  // );
  // console.log('\n');

  const onPressLike = useChapterCardLike(chapterId, isLike, likeCount);
  const onPressReply = useChapterCardComments(chapterId);
  const AddStoryJSX = useChapterCard_AddStory();
  const { TheEndLabelJSX, FullStoryJSX } = useChapterCard_Labels(order);
  const onPressOtherProfile = useChapterCard_OtherProfile(otherUserId);

  return (
    <View style={s.root}>
      {AddStoryJSX}

      <ImageBackground
        style={{
          width: wp('83.3%'),
          height: hp('81.2%'),
          borderRadius: StyleDefine.borderRadiusOutside,
          overflow: 'hidden',
          alignItems: 'center',
        }}
        source={
          chapterImg
            ? { uri: chapterImg }
            : makeCategoryBGImagePath(categoryTitle)
        }
      >
        {/* 프로필 및 작가 이름 */}
        <TouchableOpacity onPress={onPressOtherProfile}>
          <View style={s.authorSection}>
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 100,
              }}
              source={userImg ? { uri: userImg } : dummyProfile}
            />
            <Text fontFamily="heavy" style={s.authorNameText}>
              {authorNickName || 'Jessica Momo'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* 챕터 내부 */}
        <ImageBackground
          style={{
            width: wp('75.6%'),
            height: hp('69.7%'),
            backgroundColor: colors.light.whiteTransparent,
            borderRadius: StyleDefine.borderRadiusInside,
          }}
        >
          {TheEndLabelJSX}
          {/* {PreviousJSX} */}
          {/* {NextJSX} */}
          {FullStoryJSX}

          {/* 챕터 제목 */}
          <View style={s.titleSection}>
            <Text fontFamily="semibold" style={s.title}>
              THE FIRST HEART
            </Text>
          </View>

          <View style={s.separator}></View>

          <View style={s.chapterOrderSection}>
            <Text fontFamily="semibold" style={s.chapterOrderPlaceholder}>
              CHAPTER
            </Text>
            <Text fontFamily="regular" style={s.chapterOrderText}>
              {order + 1}
            </Text>
          </View>

          {/* 챕터 내용 */}
          <View style={s.contentSection}>
            <Text style={s.contentText} fontFamily="light">
              &nbsp;{content ?? ''}
            </Text>
          </View>

          {/* 좋아요, 댓글 */}
          <View style={s.bottomSection}>
            <View style={s.bottomInfoPlacer}>
              <View style={s.likeSection}>
                {isLike === 1 ? (
                  <Like
                    onPress={onPressLike}
                    iconStyle={{ tintColor: '#e77' }}
                  />
                ) : (
                  <NotLike onPress={onPressLike} />
                )}
                <Text style={s.likeText}>{likeCount}</Text>
              </View>

              <View style={s.replySection}>
                <Reply onPress={onPressReply} />
                <Text style={s.replyText}>{replyCount}</Text>
              </View>
            </View>

            <TouchableWithoutFeedback onPress={onPressReply}>
              <View style={s.bottomReplyPlacer}>
                <Image
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 100,
                    backgroundColor: '#fff',
                  }}
                  source={profile ? { uri: profile } : dummyProfile}
                />

                <TextInput
                  style={s.replyTextInput}
                  placeholder="Add a comment ..."
                  editable={false}
                  placeholderTextColor={colors.light.text2}
                />

                {/* <Button
                  fontFamily="heavy"
                  textStyle={s.replyPostText}
                  onPress={onPressReply}
                >
                  Post
                </Button> */}
              </View>
            </TouchableWithoutFeedback>
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
    maxWidth: wp('100%'),
    minHeight: hp('100%'),
    maxHeight: hp('100%'),
    // flex: 1,
    backgroundColor: colors.light.primaryTransparent,
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
    color: colors.light.ivory3,
  },
  titleSection: {
    marginLeft: wp('5.5%'),
    marginTop: hp('4.2%'),
  },

  title: {
    fontSize: 27,
    // color: colors.light.ivory4,
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
    color: colors.light.ivory5,
  },
  chapterOrderText: {
    fontSize: 26,
    color: colors.light.ivory5,
    marginLeft: '8%',
    marginTop: '-6%',
  },
  contentSection: {
    marginLeft: wp('5.5%'),
    marginTop: hp('6.1%'),
  },
  contentText: {
    fontSize: 22,
    lineHeight: 35,
    // color: colors.light.ivory4
  },
  bottomSection: {
    // flexDirection: 'row',
    position: 'absolute',
    bottom: '0%',
    minWidth: wp('75.6%'),
    minHeight: 72.2,
    borderBottomStartRadius: StyleDefine.borderRadiusInside,
    borderBottomEndRadius: StyleDefine.borderRadiusInside,
    backgroundColor: colors.light.ivory3,
    // minHeight: hp('12.2%'),
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
    color: colors.light.ivory1,
    marginLeft: wp('1.8%'),
  },
  replySection: {
    flexDirection: 'row',
    // marginLeft: wp('8.8%'),
  },
  replyText: {
    color: colors.light.ivory1,
    marginLeft: wp('1.8%'),
  },
  bottomReplyPlacer: {
    flexDirection: 'row',
    paddingTop: hp('1.4%'),
    paddingLeft: wp('9.5%'),
    paddingBottom: hp('1.4%'),
    maxWidth: wp('75%'),
    width: '100%',
    // backgroundColor: '#fff'
  },
  replyTextInput: {
    padding: 0,
    margin: 0,
    marginLeft: 10,
    paddingLeft: 3,
    minWidth: wp('50%'),
    maxWidth: wp('50%'),
    borderColor: colors.light.ivory1,
  },
  replyPostText: {
    position: 'relative',
    right: 45,
    top: 7,
    fontSize: 10,
    color: colors.light.ivory1,
  },
});
