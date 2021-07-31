import React from 'react';
import { View, ImageBackground } from 'react-native';
import { StyleSheet, Text, RemoteImage } from '#components';
import sharedStyle from './ShareCardStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { AntDesign, MaterialCommunityIcons } from 'react-native-vector-icons';

const { width, height } = Dimensions.get('window');

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

const ChapterCard = ({ currentCategoryId, chapterOrder, chapter: data }) => {
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
  if (currentCategoryId !== categoryId) {
    return null;
  }

  const topPartJSX = (
    <View style={s.cardTopSection}>
      TODO: 앱 로고 TODO: 정렬 기능 추가
      {/* <AppLogo /> */}
      <FontAwesome
        name="sort-amount-desc"
        size={24}
        color="black"
        onPress={() => console.log('카드 정렬')}
      />
    </View>
  );

  const profileJSX = (
    <View style={s.cardProfileSection}>
      <Image
        source={{ uri: authorImageUri }}
        style={{
          width: wp('5%'),
          height: hp('5%'),
          borderRadius: 50,
        }}
      />
      <View>
        <Text isBold>{authorNickName}</Text>
      </View>
    </View>
  );

  const titleJSX = (
    <View style={s.cardTitleSection}>
      {/* TODO: API 수정 요청 */}
      <Text>예시 제목</Text>
    </View>
  );

  const chapterOrderJSX = (
    <View style={s.cardChapterOrderSection}>
      <Text>챕터 {chapterOrder}</Text>
    </View>
  );

  const contentJSX = (
    <View style={s.cardContentSection}>
      <Text textStyle={s.cardOverlayText}>{content ?? ''}</Text>
    </View>
  );

  const likeJSX = (
    <View style={s.cardLikeSection}>
      <AntDesign name="heart" size={25} color="#000" />
      <View>
        <Text>{likeCount}</Text>
      </View>
    </View>
  );

  const replyJSX = (
    <View style={s.cardReplySection}>
      <MaterialCommunityIcons
        name="comment-text-outline"
        size={25}
        color="#000"
      />
      <View>
        <Text>{replyCount}</Text>
      </View>
    </View>
  );

  return (
    <ImageBackground
      style={sharedStyle.root}
      source={{ uri: chapterCoverImageUri }}
      resizeMode="contain"
    >
      {topPartJSX}
      {profileJSX}
      {titleJSX}
      {/* Separator */}
      <View style={s.separator}></View>
      {chapterOrderJSX}
      {contentJSX}

      <View>
        {/* TODO: 갑자기 조회수?? */}
        {likeJSX}
        {replyJSX}
      </View>
    </ImageBackground>
  );
};

export default ChapterCard;

const s = StyleSheet.create({
  cardTopSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'flex-start',
    marginTop: 40,
    marginBottom: 10,
  },
  cardProfileSection: {},
  cardTitleSection: {},
  separator: {},
  cardContentSection: {},
  cardLikeSection: {},
  carReplySection: {},

  // cardOverlay: {
  //   position: 'absolute',
  //   left: '15%',
  //   top: '25%',
  //   padding: 55,
  //   fontSize: 23,
  // },
});
