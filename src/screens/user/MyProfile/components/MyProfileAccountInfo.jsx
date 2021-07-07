import React from 'react';
import { View } from 'react-native';
import { StyleSheet, Text } from '#components';
import MyProfilePassword from './MyProfilePassword';

const MyProfileAccountInfo = () => {
  return (
    <View style={s.root}>
      <Text isBold>⁕&nbsp;계정정보</Text>
      <View style={s.accountInfoSection}>
        <View style={s.emailView}>
          <Text>이메일:&nbsp;</Text>
          <Text style={s.emailText}>test1234@gmail.com</Text>
        </View>
        <View style={s.passwordView}>
          <MyProfilePassword />
        </View>
      </View>
    </View>
  );
};

export default MyProfileAccountInfo;

const s = StyleSheet.create({
  root: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  accountInfoSection: {
    marginTop: 25,
    marginLeft: 20,
  },
  emailView: {
    flexDirection: 'row',
  },
  emailText: {
    marginLeft: 50,
  },
  passwordView: {
    flexDirection: 'row',
  },
});
