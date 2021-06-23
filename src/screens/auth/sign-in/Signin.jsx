import React from 'react';
import { View, Button } from 'react-native';
import { StyleSheet, Separator } from '#components';

import SigninEmailPassword from './SigninEmailPassword';
import SigninLogin from './SigninLogin';
import SigninFindPasswordSignup from './SigninFindPasswordSignup';

const Signin = () => (
  <View style={styles.root}>
    {/* TODO: App Logo */}
    <SigninEmailPassword />
    <SigninLogin />
    <SigninFindPasswordSignup />
  </View>
);

export default Signin;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  row3: {
    // flex: 1,
  
    // width: '70%',
    // flexGrow: 1,
    
  },
});
