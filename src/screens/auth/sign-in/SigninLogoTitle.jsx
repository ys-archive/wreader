import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '#components';
import AppLogoIcon from '#components/icons/AppLogoIcon';

const SigninLogoTitle = () => (
  <View style={s.root}>
    <AppLogoIcon />
    <View style={s.texts}>
      <Text>내가 만드는 소설</Text>
      <Text>Wreader</Text>
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
