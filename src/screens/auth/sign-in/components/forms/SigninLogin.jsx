import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { StyleSheet, Text, CheckBox, Button } from '#components';
import { actionsToggleAutoLogin } from '#store/actions';
import { selectIsAutoLogin } from '#store/selectors';

const SigninLogin = ({ onSubmit }) => {
  const isAutoLogin = useStoreState(selectIsAutoLogin);
  const toggleAutoLogin = useStoreActions(actionsToggleAutoLogin);

  // TODO: 로그인 로직
  // TODO: props 으로 받은 email, password 을 navigate: param 으로 전달
  return (
    <View style={s.root}>
      <View style={s.autoLogin}>
        <CheckBox
          isChecked={isAutoLogin}
          onChange={toggleAutoLogin}
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
    // width: '90%',
    marginBottom: 30,
    marginHorizontal: 15,
    justifyContent: 'space-between',
  },
  autoLogin: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  autoLoginText: {
    marginLeft: 15,
  },
});
