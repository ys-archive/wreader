import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { actionsToggleIsAutoLogin } from '#store/actions';
import { selectIsAutoLogin } from '#store/selectors';
import { CheckBox } from '#components';

const SigninLogin = ({ style = {} }) => {
  const isAuthLogin = useStoreState(selectIsAutoLogin);
  const toggleIsAutoLogin = useStoreActions(actionsToggleIsAutoLogin);

  return (
    <View style={{ ...s.root, ...style }}>
      <View style={s.autoLogin}>
        <CheckBox isChecked={isAuthLogin} onChange={toggleIsAutoLogin} />
        <Text style={s.autoLoginText}>자동 로그인</Text>
      </View>
      <Button title="로그인" />
    </View>
  );
};

SigninLogin.propTypes = {
  style: PropTypes.object,
};

SigninLogin.defaultProps = {
  style: {},
};

export default SigninLogin;

const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: '70%',
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
