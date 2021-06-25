import React from 'react';
import { View } from 'react-native';
import { StyleSheet, Text, TextInput, Button } from '#components';
import { Ionicons } from '@expo/vector-icons';

const FindPassword = () => {
  return (
    <View style={s.root}>
      <View>
        <Text>인증메일이 발송되었습니다.</Text>
        <Text>인증메일을 확인 후 [메일 인증환료]</Text>
        <Text>버튼을 터치해 주세요.</Text>

        <Ionicons name="ios-mail-outline" size={70} color="black" />
      </View>
      <View style={s.emailSection}>
        <TextInput style={s.email} placeholder="example@gmail.com..." />
      </View>
      <View>
        <Text>인증메일이 도착하지 않았나요?</Text>
        <Text>[인증메일 재발송] 버튼을 터치해 주세요.</Text>
        <Button
          style={s.resendAuthMail}
          textStyle={s.resendAuthMailText}
          onPress={() => {}}
        >
          인증메일 재발송
        </Button>
        <Button style={s.summitButton} onPress={() => {}}>
          메일 인증완료
        </Button>
      </View>
    </View>
  );
};

export default FindPassword;

const s = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: '25%',
    width: '100%',
  },
  emailSection: {
    alignItems: 'center',
  },
  email: {},
  resendAuthMail: {
    alignSelf: 'flex-end',
  },
  resendAuthMailText: {
    color: 'blue',
  },
  summitButton: {
    marginTop: '10%',
    paddingHorizontal: '40%',
    paddingVertical: '4%',
    borderWidth: 1,
    borderRadius: 15,
  },
});
