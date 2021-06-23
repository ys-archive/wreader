import React, { useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from '#components';

import SigninLogoTitle from './SigninLogoTitle';
import SigninEmailPassword from './SigninEmailPassword';
import SigninLogin from './SigninLogin';
import SigninFindPasswordSignup from './SigninFindPasswordSignup';

const Signin = () => {
  const [email, setEmail] = useState('');
  const onChangeEmailText = text => setEmail(text);

  const [password, setPassword] = useState('');
  const onChangePasswordText = text => setPassword(text);

  return (
    <View style={styles.root}>
      <SigninLogoTitle />
      <SigninEmailPassword
        email={email}
        password={password}
        onChangeEmailText={onChangeEmailText}
        onChangePasswordText={onChangePasswordText}
      />
      <SigninLogin />
      <SigninFindPasswordSignup />
    </View>
  );
};
export default Signin;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
