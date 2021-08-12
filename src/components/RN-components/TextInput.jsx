import React from 'react';
// import PropTypes from 'prop-types';
import { TextInput as OrigTextInput } from 'react-native';
import { StyleSheet } from './StyleSheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '#constants';

export const TextInput = props => {
  return (
    <OrigTextInput
      {...props}
      style={{
        ...s.root,
        ...props.style,
      }}
      placeholderTextColor={
        props.placeholderTextColor || colors.light.ivory1Transparent
      }
      autoCapitalize="none"
    />
  );
};

const s = StyleSheet.create({
  root: {
    margin: 12,
    padding: 10,
    paddingLeft: 55,
    // paddingRight: -35,
    // marginRight: 55,
    borderBottomWidth: 1,
    minWidth: wp('76%'),
    maxWidth: wp('76%'),
    color: '#fff',
    borderColor: colors.light.ivory1,
  },
});
