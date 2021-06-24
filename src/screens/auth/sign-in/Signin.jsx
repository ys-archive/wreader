import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { useStoreActions } from 'easy-peasy';
import { StyleSheet } from '#components';
import { actionsLogin } from '#store/actions';

import SigninLogoTitle from './components/SigninLogoTitle';
import SigninInput from './components/SigninInput';
import SigninLogin from './components/SigninLogin';
import SigninFindPasswordSignup from './components/SigninFindPasswordSignup';

const Signin = () => {
  const [email, setEmail] = useState('');
  const onChangeEmailText = text => setEmail(text);

  const [password, setPassword] = useState('');
  const onChangePasswordText = text => setPassword(text);

  const _login = useStoreActions(actionsLogin);
  const onLogin = useCallback(
    (email, password) => {
      _login({ email, password });
    },
    [email, password],
  );

  return (
    <View style={s.root}>
      <SigninLogoTitle />
      <SigninInput
        email={email}
        password={password}
        onChangeEmailText={onChangeEmailText}
        onChangePasswordText={onChangePasswordText}
      />
      <SigninLogin onLogin={onLogin} />
      <SigninFindPasswordSignup />
    </View>
  );
};
export default Signin;

const s = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
