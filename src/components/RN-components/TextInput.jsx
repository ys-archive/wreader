import React from 'react';
import PropTypes from 'prop-types';
import { TextInput as OrigTextInput } from 'react-native';
import { StyleSheet } from './StyleSheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const TextInput = props => {
  return (
    <OrigTextInput
      {...props}
      style={{
        ...s.root,
        ...props.style,
      }}
      autoCapitalize="none"
    />
  );
};

TextInput.propTypes = {
  // style: PropTypes.object,
  // text: PropTypes.string.isRequired,
  // onChangeText: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
  // style: {},
};

const s = StyleSheet.create({
  root: {
    minWidth: wp('50%'),
    margin: 12,
    padding: 10,
    borderBottomWidth: 1,
    // height: 40,
  },
});
