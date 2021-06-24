import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Text } from './Text';
import { StyleSheet } from './StyleSheet';

export const Button = ({ style = {}, textStyle, onClick, children }) => (
  <TouchableOpacity style={{ ...s.root, ...style }} onPress={onClick}>
    <View style={s.view}>
      <Text style={{ ...s.text, ...textStyle }}>{children}</Text>
    </View>
  </TouchableOpacity>
);

Button.propTypes = {
  style: PropTypes.object,
  textStyle: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.any.isRequired,
};

Button.defaultProps = {
  style: {},
  textStyle: {},
  onClick: () => {
    console.log('clicked!');
  },
};

const s = StyleSheet.create({
  root: {
    marginHorizontal: 15,
  },
  view: {},
  text: {
    color: '#555',
    textAlign: 'center',
  },
});
