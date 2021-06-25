import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { StyleSheet, Text, CheckBox, Button } from '#components';
import { actionsToggleIsAutoLogin } from '#store/actions';
import { selectIsAutoLogin } from '#store/selectors';

const SigninLogin = ({ onSubmit }) => {
  const isAuthLogin = useStoreState(selectIsAutoLogin);
  const toggleIsAutoLogin = useStoreActions(actionsToggleIsAutoLogin);
  // TODO: 로그인 로직
  // props 으로 받은 email, password 을 navigate: param 으로 전달
  return (
    <View style={s.root}>
      <View style={s.autoLogin}>
        <CheckBox
          isChecked={isAuthLogin}
          onChange={toggleIsAutoLogin}
          highlightColor="coral"
        />
        <Text style={s.autoLoginText}>자동 로그인</Text>
      </View>
      <Button onPress={onSubmit}>로그인</Button>
    </View>
  );
};

SigninLogin.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

SigninLogin.defaultProps = {
  //
};

export default SigninLogin;

const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: '70%',
    paddingVertical: 10,
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
});
