import React, { useCallback } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { Text, Alert, Button, TextInput } from '../../../';
import { Like, Reply, AddStory } from '#components/icon';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { colors, StyleDefine } from '../../../../constants';

import { makeCategoryBGImagePath, dummyProfile } from '#constants/images';

import { useStoreActions, useStoreState } from 'easy-peasy';
import { selAuth, selImage, selSwiper } from '../../../../store/selectors';
import { actData } from '../../../../store/actions';

import { ChapterService } from '../../../../services';

import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '../../../../navigators/ScreenNames';
import { DEPTH_NAME } from '../../../../store/reducers/swiper.depth';

const initStates = () => {
  const isLoggedIn = useStoreState(selAuth.isLoggedIn);
  const userId = useStoreState(selAuth.userId);
  const profile = useStoreState(selImage.profile);

  const depth = useStoreState(selSwiper.depth);
  const coords = useStoreState(selSwiper.coords);
  const updateHasNew = useStoreActions(actData.updateHasNew);

  return {
    isLoggedIn,
    userId,
    profile,
    depth,
    coords,
    updateHasNew,
  };
};

const ChapterCard = ({ data, categoryTitle, order = 0 }) => {
  const nav = useNavigation();
  const { isLoggedIn, userId, profile, depth, coords, updateHasNew } =
    initStates();
  const {
    id: chapterId, // 현재 챕터 Id
    categoryId,
    // userId: otherUserId,
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
  // console.log('userId: ', userId);
  // console.log(data);
  // console.log(
  //   '----------------------------------------------------------------------',
  // );
  // console.log('\n');

  const onPressLike = useCallback(async () => {
    if (!isLoggedIn) {
      Alert('Need Login to write a new card');
      return;
    }

    console.log('userID: ', userId);
    // 이미 좋아요 했음
    if (isLike === 1) {
      console.log('UNLIKE! chapterID: ', chapterId, ', likeCount: ', likeCount);
      await ChapterService.DELETE_unlikeChapter(chapterId, userId);
    } else {
      console.log('LIKE! chapterID: ', chapterId, ', likeCount: ', likeCount);
      await ChapterService.POST_likeChapter(chapterId, userId);
    }

    switch (depth) {
      case DEPTH_NAME.CHAPTER:
        updateHasNew({ d0: true });
        updateHasNew({ d1: true });
        break;

      case DEPTH_NAME.USER_CHAPTER:
        updateHasNew({ d2: true });
        break;

      case DEPTH_NAME.NEXT:
        updateHasNew({ d3: true });
        break;
    }
  }, [isLoggedIn, userId, chapterId]);

  const onPressReply = () => {
    nav.navigate(ScreenNames.MainComments, {
      chapterId,
    });
  };

  const goWriteCardDirectly = () => {
    if (!isLoggedIn) {
      Alert('Need Login to write a new card');
      return;
    }

    Alert('작업 중입니다.');

    // nav.navigate(ScreenNames.MainWriteCard, {
    //   categoryTitle,
    //   chapterId,
    //   categoryId,
    //   order: coords.d1,
    //   depth,
    // });
  };

  return (
    <View style={s.root}>
      <AddStory
        style={{
          position: 'absolute',
          right: wp('8.3%'),
          bottom: hp('4.7%'),
          zIndex: 15
        }}
        onPress={goWriteCardDirectly}
      />

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
        <View style={s.authorSection}>
          <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 100,
            }}
            source={userImg ? { uri: userImg } : dummyProfile}
          />
          <Text isBold style={s.authorNameText}>
            {authorNickName || 'Jessica Momo'}
          </Text>
        </View>

        {/* 챕터 내부 */}
        <ImageBackground
          style={{
            width: wp('75.6%'),
            height: hp('69.7%'),
            backgroundColor: colors.light.whiteTransparent,
            borderRadius: StyleDefine.borderRadiusInside,
          }}
        >
          {/* 챕터 제목 */}
          <View style={s.titleSection}>
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
              {order + 1}
            </Text>
          </View>

          {/* 챕터 내용 */}
          <View style={s.contentSection}>
            <Text style={s.contentText}>&nbsp;{content ?? ''}</Text>
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

                <Button
                  isBold
                  textStyle={s.replyPostText}
                  onPress={onPressReply}
                >
                  Post
                </Button>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
};

export default React.memo(ChapterCard);

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
    fontSize: 20,
    lineHeight: 35,
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
