import React, { useState } from "react";
import { View, FlatList, Image, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Alert } from "../../../components/alert";
import { StyleSheet, Text, TextInput, Button } from "#components";
import { Cancel } from "#components/icon";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useNavigation } from "@react-navigation/native";
import { delay } from "../../../utils";

import { colors } from "../../../constants";
import { dummyProfile } from "#constants/images";

import { useStoreActions, useStoreState } from "easy-peasy";
import {
  selAuth,
  selComments,
  selData,
  selImage,
  selSwiper,
} from "../../../store/selectors";
import { actComments, actData, actDataFetch } from "../../../store/actions";
import { CommentsService } from "../../../services";

import { useCommentsLogic } from "./useCommentsLogic";
import CommentItem_Me from "../comment-item/CommentItem_Me";
import CommentItem_Other from "../comment-item/CommentItem_Other";

const initStates = () => {
  const [contents, setContents] = useState("");

  // selectors
  const userId = useStoreState(selAuth.userId);
  const depth = useStoreState(selSwiper.depth);
  const profileUrl = useStoreState(selImage.profile);

  // actions
  const fetchOne = useStoreActions(actDataFetch.fetchOne);
  const commentsUpdated = useStoreState(selComments.commentsUpdated);
  const updateComments = useStoreActions(actComments.updateComments);

  return {
    userId,
    depth,
    profileUrl,
    contents,
    setContents,
    fetchOne,
    commentsUpdated,
    updateComments,
  };
};

const Comments = ({ route }) => {
  const nav = useNavigation();
  const {
    profileUrl,
    userId,
    contents,
    depth,
    setContents,
    fetchOne,
    commentsUpdated,
    updateComments,
  } = initStates();

  const { chapterId, parentId } = route.params;

  const data = useCommentsLogic(chapterId, commentsUpdated);

  if (!data) {
    return (
      <View>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  const postNewComment = async () => {
    if (contents === "") {
      Alert("Comments can not be empty!");
      return;
    }

    const status = await CommentsService.POST_createComment(
      chapterId,
      contents,
      userId,
    );

    console.log("comment fetch result: ", status);

    if (status === 200) {
      await delay(0.3);
      // 성공했으니깐 다시 fetch
      fetchOne({ curId: chapterId, parentId, depth, userId });
      updateComments();
    }

    // 새 댓글 입력 후 입력창 비우기
    setContents("");
  };

  const onCloseComment = () => nav.goBack();

  const renderComments = comments => {
    const { id, user_id: otherId, reply, userImg, usreNick } = comments.item;
    // console.log(comments.item);

    if (+otherId === userId) {
      return <CommentItem_Me key={id} contents={reply} />;
    } else {
      return (
        <CommentItem_Other
          key={id}
          userId={otherId}
          profileImage={userImg}
          userName={usreNick}
          contents={reply}
        />
      );
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={s.root}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={s.root}>
        {/* Title */}
        <View style={s.topSection}>
          <Text fontFamily='bold' style={s.title}>
            COMMENTS
          </Text>
        </View>

        {/* 뒤로 가기 */}
        <Cancel
          onPress={onCloseComment}
          style={{ zIndex: 50, top: hp("5.9%"), right: wp("5.7%") }}
          iconStyle={{ width: 12, height: 12 }}
        />

        {/* 댓글들 */}
        <FlatList
          style={s.contentsSection}
          data={data.item}
          renderItem={renderComments}
          keyExtractor={item => item.id.toString()}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          inverted
        />

        {/* 새 댓글 섹션 */}
        <View style={s.writeCommentSection}>
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
            }}
            source={profileUrl ? { uri: profileUrl } : dummyProfile}
          />

          <TextInput
            style={s.replyTextInput}
            value={contents}
            onChangeText={setContents}
            placeholder='Add a comment ...'
            placeholderTextColor={colors.light.text2}
          />

          <Button isBold textStyle={s.replyPostText} onPress={postNewComment}>
            Post
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
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
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    marginTop: hp("3.1%"),
    color: colors.light.ivory4,
  },
  //   // height: hp('100%'),
  // },
  contentsSection: {
    flex: 0,
    marginTop: hp("5.7%"),
    marginHorizontal: "9.7%",
    maxHeight: hp("81%"),
  },
  writeCommentSection: {
    flexDirection: "row",

    // position: 'absolute',
    // bottom: 0,

    backgroundColor: colors.light.ivory5,

    borderTopStartRadius: 17,
    borderTopEndRadius: 17,

    paddingLeft: wp("9.5%"),
    paddingVertical: 19.5,

    maxWidth: wp("100%"),
    height: hp("9.7%"),
  },
  replyTextInput: {
    padding: 0,
    margin: 0,
    marginLeft: 10,
    paddingLeft: 3,
    minWidth: wp("62.8%"),
    maxWidth: wp("62.8%"),
    borderColor: colors.light.ivory1,
  },
  replyPostText: {
    position: "relative",
    // right: 50,
    top: 20,
    fontSize: 12,
    color: colors.light.ivory1,
    // zIndex: 50,
  },
});
