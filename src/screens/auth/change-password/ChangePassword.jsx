import React from 'react';
import { View } from 'react-native';
import { StyleSheet, Text, Button, TextInput } from '#components';
import { Ionicons } from '@expo/vector-icons';

const ChangePassword = () => {
  return (
    <View style={s.root}>
      <View style={s.row1}>
        <Ionicons name="checkmark" size={70} color="black" />
        <Text>새로운 비밀번호를 입력 해주세요.</Text>
      </View>
      <View>
        <TextInput placeholder="비밀번호 입력 해주세요 (4 ~ 12자)" />
        <TextInput placeholder="비밀번호를 다시 입력 해주세요 (4 ~ 12자)" />
      </View>
      <Button style={s.summitButton} isBold>
        비밀번호 변경완료
      </Button>
    </View>
  );
};

export default ChangePassword;

const s = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: '25%',
    width: '100%',
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summitButton: {
    marginTop: '10%',
    paddingHorizontal: '10%',
    paddingVertical: '4%',
    borderWidth: 1,
    borderRadius: 15,
  },
});
