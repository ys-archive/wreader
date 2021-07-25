import React from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { StyleSheet, Text } from '#components';

import Signup2Form from './components/Signup2Form';

const Signup2 = ({ route }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <KeyboardAvoidingView
        style={s.root}
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text style={s.accountInfoInstruction} isBold>
          ※ 기본정보
        </Text>
        <Signup2Form route={route} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Signup2;

const s = StyleSheet.create({
  root: {
    flex: 1,
    marginVertical: '25%',
    marginHorizontal: 10,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff',
  },
  accountInfoInstruction: {
    alignSelf: 'flex-start',
    // marginBottom: 50,
  },
});
