import React from 'react';
import { View, ImageBackground, Image } from 'react-native';
import { StyleSheet, Text, RemoteImage } from '#components';
import sharedStyle from './ShareCardStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { AntDesign, MaterialCommunityIcons } from 'react-native-vector-icons';
import { FontAwesome } from 'react-native-vector-icons';

// chapter example
//   {
//     "id": "43", -> 조회용으로 사용
//     "categoryId": 5, -> prop categoryId 와 비교해서 렌더 결정
//     "userId": 5, -> reply 용으로 사용
//     "updateDt": "2021-07-30 14:45:29",
//     "content": "hi3", -> render
//     "replyCount": 0, -> reply render
//     "like_count": 0, -> like count render
//     "group_index": 0, -> chaining id
//     "userImg": "https://imagePath.com/changed", -> author uri
//     "userNick": "", -> author render
//     "chapterImg": "" -> chapter uri
// }

const dummy = require('!images/dummy-image.jpg');

const ChapterCard = ({ currentCategoryId, chapterOrder, data }) => {
  const {
    id: chapterId, // 현재 챕터 Id
    categoryId,
    userId, // -> reply
    content,
    replyCount, // -> reply
    like_count: likeCount, // -> like
    group_index: groupIdx, // candiate 붙이는 용도 (검사값)
    userImg: authorImageUri, // -> author
    userNick: authorNickName, // -> author
    chapterImg: chapterCoverImageUri, // -> cover
  } = data;

  // 카테고리 Id 가 모두 같아아함
  // if (currentCategoryId !== categoryId) {
  //   return null;
  // }

  const onSortChapter = () => {
    console.log('카드 정렬');
  };

  return (
    <View
      // style={{
      //   borderWidth: 2,
      //   borderColor: '#000',
      //   minWidth: wp('100%'),
      //   minHeight: hp('100%'),
      //   backgroundColor: '#999',
      //   borderRadius: 50,
      // }}
      style={s.root}
      // source={{ uri: chapterCoverImageUri ?? "" }}
      // resizeMode="contain"
    >
      {/* 로고 및 정렬 */}
      <View style={s.cardTopSection}>
        {/* TODO: 앱 로고 */}
        {/* <AppLogo /> */}
        {/* TODO: 정렬 기능 추가 */}
        <FontAwesome
          name="sort-amount-desc"
          size={24}
          color="black"
          onPress={onSortChapter}
        />
      </View>

      {/* 프로필 및 작가 이름 */}
      <View style={s.cardProfileSection}>
        <Image
          // source={{ uri: authorImageUri }}
          source={dummy}
          style={{
            width: wp('30%'),
            height: hp('30%'),
            borderRadius: 50,
          }}
        />

        <View>
          <Text isBold>{authorNickName}</Text>
        </View>
      </View>

      {/* 챕터 제목 */}
      <View style={s.cardTitleSection}>
        {/* TODO: API 수정 요청 */}
        <Text>예시 제목</Text>
      </View>

      <View style={s.separator}></View>

      <View style={s.cardChapterOrderSection}>
        <Text>챕터 {chapterOrder}</Text>
      </View>

      {/* 챕터 내용 */}
      <View style={s.cardContentSection}>
        <Text textStyle={s.cardOverlayText}>{content ?? ''}</Text>
      </View>

      {/* 조회수 (?), 좋아요, 댓글 */}
      <View style={s.cardBottomSection}>
        {/* TODO: 갑자기 조회수?? */}
        <View style={s.cardLikeSection}>
          <AntDesign name="heart" size={45} color="#000" />
          <View>
            <Text isBold>{likeCount}</Text>
          </View>
        </View>

        {/* 댓글 구현 */}
        <View style={s.cardReplySection}>
          <MaterialCommunityIcons
            name="comment-text-outline"
            size={45}
            color="#000"
          />
          <View>
            <Text isBold>{replyCount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChapterCard;

const s = StyleSheet.create({
  root: {
    borderWidth: 2,
    borderColor: '#000',
    minWidth: wp('100%'),
    minHeight: hp('100%'),
    borderRadius: 50,
    // padding: 5,
  },
  cardTopSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cardProfileSection: {},
  cardTitleSection: {},
  separator: {},
  cardContentSection: {},
  cardBottomSection: {
    flexDirection: 'row',
  },
  cardLikeSection: {
    flexDirection: 'row',
  },
  cardReplySection: {
    flexDirection: 'row',
  },

  // cardOverlay: {
  //   position: 'absolute',
  //   left: '15%',
  //   top: '25%',
  //   padding: 55,
  //   fontSize: 23,
  // },
});
