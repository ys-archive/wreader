import React from 'react';
import { View } from 'react-native';
import { StyleSheet, Text, TextInput, Button } from '#components';

const Signup2 = () => (
  <View style={s.root}>
    <Text style={s.accountInfoInstruction} isBold>
      ※ 기본정보
    </Text>
    <View style={s.inputSection}>
      <View style={s.left}>
        <Text>닉네임</Text>
        <Text>인스타그램</Text>
        <Text>페이스북</Text>
        <Text>소개</Text>
      </View>
      <View style={s.right}>
        <TextInput
          style={s.input}
          placeholder="닉네임을 입력하세요(20자 이내)"
        />
        <TextInput style={s.input} placeholder="(선택)" />
        <TextInput style={s.input} placeholder="(선택)" />
        <TextInput
          style={s.input}
          placeholder="나를 소개할 문구를 적어주세요 (50자)"
        />
      </View>
    </View>
    <Button style={s.summitButton}>완료</Button>
  </View>
);

export default Signup2;

const s = StyleSheet.create({
  root: {
    flex: 1,
    marginVertical: '25%',
    marginHorizontal: 10,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  accountInfoInstruction: {
    alignSelf: 'flex-start',
    marginBottom: 50,
  },
  inputSection: {
    flexDirection: 'row',
    // maxWidth: '90%',
  },
  left: {
    justifyContent: 'space-around',
  },
  right: {},
  input: {
    width: '92%',
  },
  summitButton: {
    marginTop: '10%',
    paddingHorizontal: '40%',
    paddingVertical: '4%',
    borderWidth: 1,
    borderRadius: 15,
  },
});
