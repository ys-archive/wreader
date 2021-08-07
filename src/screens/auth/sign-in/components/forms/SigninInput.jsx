import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TextInput, Text, StyleSheet } from '#components';
import { Email, LockPassword } from '#components/icon';
import { colors } from '#constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SigninInput = ({ values, onChange, onBlur, errors, touched }) => {
  const { email, password } = values;
  return (
    <View style={s.root}>
      <View style={s.inputSection}>
        <Email />
        <TextInput
          value={email}
          style={{
            paddingLeft: 55,
            // width: 237.3,
            width: wp('76%'),
            borderColor: colors.light.ivory1,
          }}
          onChangeText={onChange('email')}
          onBlur={onBlur('email')}
          placeholder="EMAIL ACCOUNT"
          placeholderTextColor={colors.light.ivory1}
        />
        {touched.email && errors.email ? (
          <View>
            <Text>{errors.email}</Text>
          </View>
        ) : null}
      </View>

      <View style={s.inputSection}>
        <LockPassword />
        <TextInput
          value={password}
          style={{
            paddingLeft: 55,
            width: wp('76%'),
            borderColor: colors.light.ivory1,
          }}
          onChangeText={onChange('password')}
          onBlur={onBlur('password')}
          placeholder="PASSWORD"
          placeholderTextColor={colors.light.ivory1}
          secureTextEntry
        />
        {touched.password && errors.password ? (
          <View>
            <Text>{errors.password}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

SigninInput.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
};

export default SigninInput;

const s = StyleSheet.create({
  root: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: hp('25%'),
  },
  inputSection: {
    flexDirection: 'row',
  },
});
