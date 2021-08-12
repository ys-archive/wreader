import React, { useState, useCallback } from 'react';
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
import { Like, Reply } from '#components/icon';

import { makeCategoryBGImagePath, dummyProfile } from '#constants/images';

import { useUpdateLike } from '../../contexts/chapterDataContext';

import { useStoreState } from 'easy-peasy';
import {
  selectProfileLocalImagePath,
  selectProfileImageUrl,
  selectIsLoggedIn,
  selectUserId,
  selectCurrentChapterIdx,
  selectCurrentCandidateIdx,
} from '#store/selectors';
import CommentsModal from '#components/modals/CommentsModal';

import { ChapterService } from '#services';

const borderRadiusOutside = 20;
const borderRadiusInside = 17;

const ChapterCard = ({
  chapterIdx,
  data,
  candidateIdx,
  categoryTitle,
  isVisibleFromCategory,
}) => {
  const [isCommentsOpen, setCommentsOpen] = useState(false);
  const chapterOrder = chapterIdx + 1;

  const currentChapterIdx = useStoreState(selectCurrentChapterIdx);
  const currentCandidateIdx = useStoreState(selectCurrentCandidateIdx);
  const isMovingChapterLock = currentCandidateIdx !== 0;

  const updateLike = useUpdateLike();
  const triggerUpdatingLike = useCallback(() => updateLike(prv => !prv), []);

  const isPreviousChapter = currentChapterIdx - 1 === chapterOrder;
  const isNextChapter = currentChapterIdx + 1 === chapterOrder;

  const predicatedPositionBetweenChapters =
    !isMovingChapterLock &&
    (isNextChapter || isVisibleFromCategory
      ? {
          position: 'absolute',
          left: '-5%',
        }
      : isPreviousChapter
      ? {
          position: 'absolute',
          right: '-5%',
        }
      : {});

  const predicatedScaleBGBetweenChapters =
    isNextChapter || isPreviousChapter || isVisibleFromCategory
      ? {
          width: wp('83.3%') * 0.9,
          height: hp('81.2%') * 0.9,
        }
      : {};

  const predicatedScaleProfileBetweenChapters =
    isNextChapter || isPreviousChapter || isVisibleFromCategory
      ? {
          width: 30 * 0.9,
          height: 30 * 0.9,
        }
      : {};

  const predicatedScaleInsideBGBetweenChapters =
    isNextChapter || isPreviousChapter || isVisibleFromCategory
      ? {
          width: wp('75.6%') * 0.9,
          height: hp('69.7%') * 0.9,
        }
      : {};

  const predicatedScaleBottomSectionBetweenChapters =
    isNextChapter || isPreviousChapter || isVisibleFromCategory
      ? {
          minWidth: wp('75.6%') * 0.9,
          minHeight: 72.2 * 0.9,
        }
      : {};

  // console.log('현재 후보 챕터: ', currentCandidateIdx);

  const candidateOrder = candidateIdx + 1;
  const isPreviousCandidate = currentCandidateIdx - 1 === candidateOrder;
  const isNextCandidate = currentCandidateIdx + 1 === candidateOrder;

  const predicatedPositionBetweenCandidates = isNextCandidate
    ? {
        position: 'absolute',
        top: '-5%',
      }
    : (candidateOrder - 1 === -1 && isMovingChapterLock) || isPreviousCandidate
    ? {
        position: 'absolute',
        bottom: '-7%',
      }
    : {};

  // : isVisibleFromCategory
  // ? {
  //     position: 'absolute',
  //     left: '-5%',
  //   }
  // : {};
  // const predicatedScaleBGBetweenCandidates =
  //   isNextChapter || isPreviousChapter || isVisibleFromCategory
  //     ? {
  //         width: wp('83.3%') * 0.9,
  //         height: hp('81.2%') * 0.9,
  //       }
  //     : {};

  // const predicatedScaleProfileBetweenCandidates =
  //   isNextChapter || isPreviousChapter || isVisibleFromCategory
  //     ? {
  //         width: 30 * 0.9,
  //         height: 30 * 0.9,
  //       }
  //     : {};

  // const predicatedScaleInsideBGBetweenCandidates =
  //   isNextChapter || isPreviousChapter || isVisibleFromCategory
  //     ? {
  //         width: wp('75.6%') * 0.9,
  //         height: hp('69.7%') * 0.9,
  //       }
  //     : {};

  // const predicatedScaleBottomSectionBetweenCandidates =
  //   isNextChapter || isPreviousChapter || isVisibleFromCategory
  //     ? {
  //         minWidth: wp('75.6%') * 0.9,
  //         minHeight: 72.2 * 0.9,
  //       }
  //     : {};

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
  } = data;

  // console.log('현재 챕터의 작가 프로필 이미지 path: ', authorImageUri);

  const isLoggedIn = useStoreState(selectIsLoggedIn);
  const userId = useStoreState(selectUserId);

  const myProfileLocalImagePath = useStoreState(selectProfileLocalImagePath);
  const myProfileImageUrl = useStoreState(selectProfileImageUrl);

  const onPressLike = async () => {
    if (!isLoggedIn) {
      Alert("You can't like before logging in.");
      return;
    }

    // console.log(userId, chapterId);

    // 이미 좋아요 했음
    if (isLike === 1) {
      await ChapterService.DELETE_unlikeChapter(chapterId, userId);
      console.log('Unlike');
    } else {
      await ChapterService.POST_likeChapter(chapterId, userId);
      console.log('like');
    }

    triggerUpdatingLike();
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
        style={[
          {
            width: wp('83.3%'),
            height: hp('81.2%'),
            borderRadius: borderRadiusOutside,
            overflow: 'hidden',
            alignItems: 'center',
          },
          predicatedPositionBetweenChapters,
          predicatedPositionBetweenCandidates,
          predicatedScaleBGBetweenChapters,
        ]}
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
            style={[
              {
                width: 30,
                height: 30,
                borderRadius: 100,
              },
              predicatedScaleProfileBetweenChapters,
            ]}
            // source={authorImageUri !== '' ? { uri: authorImageUri } : dummyProfile}
            source={dummyProfile}
          />
          <Text isBold style={s.authorNameText}>
            {authorNickName || 'Jessica Momo'}
          </Text>
        </View>
        <ImageBackground
          style={[
            {
              width: wp('75.6%'),
              height: hp('69.7%'),
              backgroundColor: colors.light.chapterBGInside,
              borderRadius: borderRadiusInside,
            },
            predicatedScaleInsideBGBetweenChapters,
          ]}
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
          <View
            style={[
              s.bottomSection,
              predicatedScaleBottomSectionBetweenChapters,
            ]}
          >
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
    // maxWidth: wp('100%'),
    minHeight: hp('100%'),
    // maxHeight: hp('100%'),
    backgroundColor: colors.light.primaryTransparent,
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
    fontSize: 15,
  },
  bottomSection: {
    // flexDirection: 'row',
    position: 'absolute',
    bottom: '0%',
    minWidth: wp('75.6%'),
    minHeight: 72.2,
    borderBottomStartRadius: borderRadiusInside,
    borderBottomEndRadius: borderRadiusInside,
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
    maxWidth: wp('50%'),
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
