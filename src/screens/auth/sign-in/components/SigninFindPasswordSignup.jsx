import React from 'react';
// import PropTypes from 'prop-types';
import { View } from 'react-native';
import { StyleSheet, Separator, Button } from '#components';
import { useNavigation } from '@react-navigation/native';
import * as ScreenNames from '../../../../navigators/ScreenNames';

const SigninFindPasswordSignup = () => {
  const nav = useNavigation();

  return (
    <View style={s.root}>
      {/* TODO: 비밀번호 찾기 로직 */}
      <Button onPress={() => nav?.navigate(ScreenNames.FindPassword)}>
        비밀번호찾기
      </Button>
      <Separator direction="vertical" width={2} height="60%" />
      {/* TODO: 회원가입 로직 */}
      <Button onPress={() => nav?.navigate(ScreenNames.Signup)}>
        회원가입
      </Button>
    </View>
  );
};

// SigninFindPasswordSignup.propTypes = {};

// SigninFindPasswordSignup.defaultProps = {};

export default SigninFindPasswordSignup;

const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
