import React from 'react';
import { View } from 'react-native';
import { StyleSheet, Text, Separator } from '#components';

const SignupPolicyTexts = () => (
  <View style={s.root}>
    <Text>서비스 이용을 위해 기본정보 입력 및 약관에 동의해 주세요</Text>
    <Separator
      style={s.separator}
      direction="horizontal"
      width="100%"
      height={1}
    />
    <Text style={s.accountInfoInstruction} isBold>
      ※ 계정정보
    </Text>
  </View>
);

export default SignupPolicyTexts;

const s = StyleSheet.create({
  root: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    marginTop: 15,
    marginBottom: 40,
  },
  accountInfoInstruction: {
    alignSelf: 'flex-start',
  },
});
