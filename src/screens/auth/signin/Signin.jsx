import React from 'react';
import { StyleSheet, CheckBox, Separator } from '#components';

import { Text, View, TextInput, Button } from 'react-native';

const Signin = () => {
  return (
    <View style={styles.root}>
      {/* TODO: App Logo */}
      <View style={styles.row1}>
        {/* TODO: Email */}
        {/* <TextInput style={styles.textInput} /> */}
        {/* TODO: Password */}
        {/* <TextInput style={styles.textInput} /> */}
      </View>

      <View style={styles.row2}>
        {/* TODO: Auto Login */}
        <View style={styles.autoLogin}>
          <CheckBox />
          <Text style={styles.autoLoginText}>자동 로그인</Text>
        </View>
        {/* TODO: Login button */}
        <Button title="로그인" />
      </View>

      <View style={styles.row3}>
        {/* TODO: Find Password */}
        <Button title="비밀번호찾기" />
        <Separator width={2} height="60%" />
        {/* TODO: Sign up */}
        <Button title="회원가입" />
      </View>
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row1: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    // flexGrow: 1,
  },
  textInput: {
    width: '80%',
    height: '100%',
    borderWidth: 1,
  },
  row2: {
    flexDirection: 'row',
    // width: '70%',
    // flexGrow: 1,
    justifyContent: 'space-between',
  },
  autoLogin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  autoLoginText: {
    marginLeft: 15,
  },
  row3: {
    flexDirection: 'row',
    // width: '70%',
    // flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
