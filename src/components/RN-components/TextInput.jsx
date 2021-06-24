import React from 'react';
import PropTypes from 'prop-types';
import { TextInput as OrigTextInput } from 'react-native';
import { StyleSheet } from './StyleSheet';

export const TextInput = props => {
  const { style = {}, text, onChangeText } = props;
  return (
    <OrigTextInput
      {...props}
      style={{
        ...s.root,
        ...style,
      }}
      value={text}
      onChangeText={onChangeText}
    />
  );
};

TextInput.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
  style: {},
};

const s = StyleSheet.create({
  root: {
    width: 350,
    margin: 12,
    padding: 10,
    borderBottomWidth: 1,
    // height: 40,
    // margin: 12,
    // borderWidth: 1,
  },
});
