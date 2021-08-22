import React, { useMemo } from 'react';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import { StyleSheet, Text } from '#components';
import { Cancel } from '#components/icon';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useNavigation } from '@react-navigation/native';
// import * as ScreenNames from '../../navigators/ScreenNames';
import { colors } from '../../constants';

import { useStoreState } from 'easy-peasy';
import { selectUserId } from '../../store/selectors';

import { useCommentsLogic } from './useCommentsLogic';
import CommentItem_Me from './CommentItem_Me';
import CommentItem_Other from './CommentItem_Other';

import { data } from './Comments_DummyData';

const Comments = ({ route }) => {
  const nav = useNavigation();
  const userId = useStoreState(selectUserId);
  // const data = useCommentsLogic(route, userId);

  const onCloseComment = () => {
    nav.goBack();
    console.log('댓글 닫기');
  };

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
      <KeyboardAvoidingView>
        <View style={s.topSection}>
          <Text isBold style={s.title}>
            COMMENTS
          </Text>
        </View>
        <Cancel
          onPress={onCloseComment}
          style={{ zIndex: 50, top: hp('3.6%') + 6, right: wp('5.7%') }}
          iconStyle={{ width: 12, height: 12 }}
        />
        <FlatList
          style={s.contentsSection}
          data={data}
          renderItem={renderComments}
          keyExtractor={item => item.id}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Comments;

const s = StyleSheet.create({
  root: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: colors.light.background,
  },
  topSection: {
    top: 15,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    marginTop: '3.1%',
    color: colors.light.ivory4,
  },
  contentsSection: {
    flex: 0,
    marginHorizontal: '9.7%',
    height: hp('100%'),
    marginTop: hp('4.6%'),
  },
});
