import React from 'react';
import PropTypes from 'prop-types';
import { Text as OrigText } from 'react-native';
import { StyleSheet } from './StyleSheet';
import { regular, bold } from '#constants/fonts';

export const Text = ({ style = {}, isBold = false, children }) => {
  return (
    <OrigText
      style={{ ...s.root, ...style, fontFamily: !isBold ? regular : bold }}
    >
      {children}
    </OrigText>
  );
};

Text.propTypes = {
  style: PropTypes.object,
  isBold: PropTypes.bool,
  children: PropTypes.any.isRequired,
};

Text.defaultProps = {
  style: {},
  isBold: false,
};

const s = StyleSheet.create({
  root: {
    fontSize: 16,
  },
});
