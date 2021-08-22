import React from 'react';
import { View, Image } from 'react-native';
import { StyleSheet, Text } from '#components';
// import { Like, Unlike } from '../../components/icon';

const CommentItem_Other = ({ profileImage, userName, contents }) => {
  console.log(profileImage, userName, contents);
  return (
    <View style={s.root}>
      <Image source={{ uri: profileImage }}></Image>
      <Text>{userName}</Text>
      <Text>{contents}</Text>
    </View>
  );
};

export default CommentItem_Other;

const s = StyleSheet.create({
  root: {
    flex: 1,
  },
});
