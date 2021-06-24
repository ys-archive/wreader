import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { StyleSheet, Separator, Button } from '#components';

const SigninFindPasswordSignup = () => (
  // TODO: 비밀번호 찾기 로직
  // TODO: 회원가입 로직
  <View style={s.root}>
    <Button>비밀번호찾기</Button>
    <Separator direction="vertical" width={2} height="60%" />
    <Button>회원가입</Button>
  </View>
);

SigninFindPasswordSignup.propTypes = {};

SigninFindPasswordSignup.defaultProps = {};

export default SigninFindPasswordSignup;

const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
