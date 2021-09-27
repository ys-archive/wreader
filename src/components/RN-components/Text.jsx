import React from 'react';
import PropTypes from 'prop-types';
import { Text as OrigText } from 'react-native';
import { StyleSheet } from './StyleSheet';
import { fonts } from '#constants';

export const Text = ({ style, fontFamily = 'xlight', children }) => {
  return (
    <OrigText style={[{ fontFamily: fonts[fontFamily] }, style]}>
      {children}
    </OrigText>
  );
};

Text.propTypes = {
  fontFamily: PropTypes.oneOf([
    'xlight',
    'light',
    'thin',
    'regular',
    'semibold',
    'heavy',
  ]),
  children: PropTypes.any,
};

Text.defaultProps = {
  fontSize: 'xlight',
  children: undefined,
};

const s = StyleSheet.create({
  root: {
    fontSize: 16,
    // fontWeight: 'bold'
  },
});
