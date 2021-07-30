import React from 'react';
import { View, ScrollView, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet } from '#components';
import { useNavigation } from '@react-navigation/native';

import SignupPolicyTexts from './components/SignupPolicyTexts';
import SignupForms from './components/forms/SignupForms';

const Signup = () => {
  // const nav = useNavigation();

  // TODO: headerRight -> signin 으로 돌아가기
  return (
    <KeyboardAwareScrollView contentContainerStyle={s.root}>
      <View style={s.root}>
        <SignupPolicyTexts />
        <SignupForms />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;

const s = StyleSheet.create({
  root: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff',
  },
});
