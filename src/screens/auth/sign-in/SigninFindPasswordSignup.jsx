import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { StyleSheet, Separator, Button } from '#components';

const SigninFindPasswordSignup = ({ style = {} }) => (
  // TODO: 비밀번호 찾기 로직
  // TODO: 회원가입 로직
  <View style={{ ...s.root, ...style }}>
    <Button>비밀번호찾기</Button>
    <Separator width={2} height="60%" />
    <Button>회원가입</Button>
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
