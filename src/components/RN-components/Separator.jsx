import React from 'react';
// import PropTypes from 'prop-types';
import { View } from 'react-native';

export const Separator = ({ width, height, color = '#000' }) => (
  <View
    style={{
      borderLeftWidth: width,
      height,
      borderLeftColor: color,
    }}
  />
);

Separator.propTypes = {
  // width: PropTypes.number.isRequired,
};
