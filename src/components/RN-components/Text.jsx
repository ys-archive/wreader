import React from 'react';
import PropTypes from 'prop-types';
import { Text as OrigText } from 'react-native';
import { StyleSheet } from './StyleSheet';

export const Text = props => {
  const { style = {}, children } = props;
  return <OrigText style={{ ...s.root, ...style }}>{children}</OrigText>;
};

Text.propTypes = {
  style: PropTypes.object,
  children: PropTypes.string.isRequired,
};

Text.defaultProps = {
  style: {},
};

export default Text;

const s = StyleSheet.create({
  root: {
    // TODO: fontFamily: ''
    fontSize: 16,
  },
});
