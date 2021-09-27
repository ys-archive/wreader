import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { StyleSheet, Text, CheckBox } from '#components';
import { colors } from '#constants';
import StorageService from '../../../../../services/StorageService';
import * as SecureStore from 'expo-secure-store';

const SigninAutoLogin = () => {
  const [isAutoLogin, setAutoLogin] = useState(false);

  const toggleAutoLogin = useCallback(async () => {
    await StorageService.toggleAutoLogin();
    setAutoLogin(prv => !prv);
  }, []);

  useEffect(() => {
    (async () => {
      // console.log(SecureStore);
      const isAutoLogin = await SecureStore.getItemAsync('isAutoLogin');
      console.log('isAutoLogin: ', isAutoLogin);
      setAutoLogin(isAutoLogin === 'true' ? true : false);
    })();
  }, []);

  return (
    <View style={s.root}>
      <View style={s.autoLogin}>
        <CheckBox
          isChecked={isAutoLogin}
          onChange={toggleAutoLogin}
          highlightColor={colors.light.transparent}
        />
        <Text fontFamily="heavy" style={s.autoLoginText}>
          STAY SIGNED IN
        </Text>
      </View>
    </View>
  );
};

export default SigninAutoLogin;

const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
    marginBottom: 30,
    marginTop: 10,
    marginHorizontal: 15,
    justifyContent: 'space-between',
  },
  autoLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  autoLoginText: {
    marginLeft: 10,
    color: colors.light.ivory1,
  },
});
