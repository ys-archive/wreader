import React from 'react';
import PropTypes from 'prop-types';
import { Text as OrigText } from 'react-native';
import { StyleSheet } from './StyleSheet';
import { regular, bold } from '#constants';

export const Text = ({ style, isBold = false, children }) => {
  const fontFamily = !isBold ? regular : bold;
  return <OrigText style={[style, { fontFamily }]}>{children}</OrigText>;
};

Text.propTypes = {
  isBold: PropTypes.bool,
  children: PropTypes.any,
};

Text.defaultProps = {
  isBold: false,
  children: undefined,
};

const s = StyleSheet.create({
  root: {
    fontSize: 16,
  },
});
