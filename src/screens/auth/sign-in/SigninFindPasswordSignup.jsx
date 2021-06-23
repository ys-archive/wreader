import React from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import { StyleSheet, Separator } from '#components';

const SigninFindPasswordSignup = ({ style = {} }) => (
  // TODO: 비밀번호 찾기 로직
  // TODO: 회원가입 로직
  <View style={{ ...s.root, ...style }}>
    <Button title="비밀번호찾기" />
    <Separator width={2} height="60%" />
    <Button title="회원가입" />
  </View>
);

SigninFindPasswordSignup.propTypes = {
  style: PropTypes.object,
};

SigninFindPasswordSignup.defaultProps = {
  style: {},
};

export default SigninFindPasswordSignup;

const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
