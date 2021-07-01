import React, { useLayoutEffect } from 'react';
import { View, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { StyleSheet } from '#components';
import { useNavigation } from '@react-navigation/native';

import SignupPolicyTexts from './components/SignupPolicyTexts';
import SignupForms from './components/forms/SignupForms';

const Signup = () => {
  const nav = useNavigation();

  useLayoutEffect(() => {
    nav?.setOptions(() => ({}));
  }, [nav]);

  // TODO: headerRight -> signin 으로 돌아가기
  return (
    <ScrollView
      // contentContainerStyle={s.root}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <KeyboardAvoidingView
        style={s.root}
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <SignupPolicyTexts />
        <SignupForms />
      </KeyboardAvoidingView>
    </ScrollView>
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
