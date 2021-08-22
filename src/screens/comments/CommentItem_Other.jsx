import React from 'react';
import { View } from 'react-native';
import { StyleSheet, Text } from '#components';
import { Like, Unlike } from '../../components/icon';

const CommentItem_Other = ({ profileImage, userName, contents }) => {
  return (
    <View>
      <Image source={{ uri: profileImage }}></Image>
      <Text>{userName}</Text>
      <Text>{contents}</Text>
    </View>
  );
};

export default CommentItem_Other;

const s = StyleSheet.create({});
