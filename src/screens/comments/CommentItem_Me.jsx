import React from 'react';
import { View } from 'react-native';
import { StyleSheet, Text } from '#components';
// import { Like, Unlike } from '../../components/icon';

const CommentItem_Me = ({ contents }) => {
  return (
    <View>
      <Text>{contents}</Text>
    </View>
  );
};

export default CommentItem_Me;

const s = StyleSheet.create({});
