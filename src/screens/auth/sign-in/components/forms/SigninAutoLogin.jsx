import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { StyleSheet, Text, CheckBox } from '#components';
import { colors } from '#constants';

import { useStoreActions, useStoreState } from 'easy-peasy';
import { actionsToggleAutoLogin } from '#store/actions';
import { selectIsAutoLogin } from '#store/selectors';

const SigninAutoLogin = () => {
  const isAutoLogin = useStoreState(selectIsAutoLogin);
  const toggleAutoLogin = useStoreActions(actionsToggleAutoLogin);

  return (
    <View style={s.root}>
      <View style={s.autoLogin}>
        <CheckBox
          isChecked={isAutoLogin}
          onChange={toggleAutoLogin}
          highlightColor={colors.light.transparent}
        />
        <Text isBold style={s.autoLoginText}>
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
