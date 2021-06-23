import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '#components';
import { StyleSheet } from './StyleSheet';

export const Button = ({ style = {}, onClick, children }) => (
  <TouchableOpacity style={{ ...s.root, ...style }} onPress={onClick}>
    <View style={s.view}>
      <Text style={s.text}>{children}</Text>
    </View>
  </TouchableOpacity>
);

Button.propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

Button.defaultProps = {
  style: {},
};

const s = StyleSheet.create({
  root: {
    marginHorizontal: 15,
  },
  view: {},
  text: {
    color: '#555',
  },
});
