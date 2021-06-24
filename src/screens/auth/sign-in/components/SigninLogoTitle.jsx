import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '#components';
import { Ionicons } from '@expo/vector-icons';

const SigninLogoTitle = () => (
  <View style={s.root}>
    <Ionicons name="book-outline" size={70} color="black" />;
    <View style={s.texts}>
      <Text>내가 만드는 소설</Text>
      <Text isBold>Wreader</Text>
    </View>
  </View>
);

export default SigninLogoTitle;

const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  texts: {
    marginLeft: 20,
  },
});
