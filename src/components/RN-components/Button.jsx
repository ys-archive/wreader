import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Text } from './Text';
import { StyleSheet } from './StyleSheet';

export const Button = ({ style = {}, textStyle = {}, onPress, children }) => {
  // console.log(style, textStyle, onPress, children);
  return (
    <TouchableOpacity style={{ ...s.root, ...style }} onPress={onPress}>
      <View style={s.view}>
        <Text style={{ ...s.text, ...textStyle }}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  style: PropTypes.object,
  textStyle: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

Button.defaultProps = {
  style: {},
  textStyle: {},
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
